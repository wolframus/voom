import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker, Polygon, Polyline, Region } from 'react-native-maps';

import Utils from '@/utils';
import { COLORS } from '@/constants';
import Button from '@/components/Button';

const INITIAL_REGION: Region = {
  latitude: 31.771959,
  longitude: 35.217018,
  latitudeDelta: 0.125,
  longitudeDelta: 0.125,
};

export default function Map() {
  const [currRegion, setCurrRegion] = useState<Region>();
  const [polygon, setPolygon] = useState<Array<Region>>([]);

  const handleAddGeoPoint = () => {
    if (!currRegion) return;

    const newPolygon = [...polygon, currRegion];
    const isSelfIntersecting =
      newPolygon.length > 2 && Utils.Geo.isPolygonSelfIntersecting(newPolygon);
    if (isSelfIntersecting) {
      Alert.alert('Invalid Polygon', 'The polygon cannot intersect itself.');
      return;
    }

    setPolygon(newPolygon);
    setCurrRegion(undefined);
  };

  const handleClearPolygon = () => setPolygon([]);

  const handleConfirm = () => {
    if (polygon.length < 3) return;

    const closedPolygon = [...polygon, polygon[0]];
    setPolygon(closedPolygon);
  };

  const isClosing = useMemo(() => {
    const first = polygon[0];
    const last = polygon[polygon.length - 1];
    return (
      polygon.length > 2 &&
      first &&
      last &&
      first.latitude === last.latitude &&
      first.longitude === last.longitude
    );
  }, [polygon]);

  const handleSubmit = () => {
    router.push({
      pathname: '/details',
      params: { polygon: JSON.stringify(polygon) },
    });
    setCurrRegion(undefined);
    setPolygon([]);
  };

  const Component = isClosing ? Polygon : Polyline;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={setCurrRegion}>
        {polygon.map((region, index) => (
          <Marker
            coordinate={region}
            key={`${region.latitude}-${region.longitude}-${index}`}
          />
        ))}
        {currRegion && !isClosing ? (
          <Marker coordinate={currRegion} />
        ) : undefined}
        {polygon.length ? (
          <Component
            strokeWidth={3}
            coordinates={polygon}
            strokeColor={COLORS.accent}
            fillColor={`${COLORS.accent}40`}
          />
        ) : undefined}
      </MapView>

      <View style={styles.bottom}>
        <View style={styles.actionButtonsWrapper}>
          <Button
            title='Clear'
            type='danger'
            disabled={!polygon.length}
            style={styles.actionButton}
            onPress={handleClearPolygon}
          />
          {isClosing ? undefined : (
            <Button
              type='info'
              title='Place'
              disabled={!currRegion}
              onPress={handleAddGeoPoint}
              style={styles.actionButton}
            />
          )}
        </View>

        <Button
          disabled={polygon.length < 3}
          onPress={isClosing ? handleSubmit : handleConfirm}
          title={isClosing ? 'Submit' : 'Confirm Flight Location'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  actionButtonsWrapper: {
    gap: 5,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
  },
  bottom: {
    gap: 5,
    left: 10,
    right: 10,
    bottom: 10,
    position: 'absolute',
  },
});
