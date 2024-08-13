import * as turf from '@turf/turf';
import { Region } from 'react-native-maps';

export const isPolygonSelfIntersecting = (points: Region[]) => {
  const coordinates = points.map((point) => [point.longitude, point.latitude]);
  const polygon = turf.multiPolygon([[coordinates]]);

  return turf.kinks(polygon).features.length;
};
