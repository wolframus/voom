import { useState } from 'react';
import { Region } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, useLocalSearchParams } from 'expo-router';

import API from '@/api';
import Utils from '@/utils';
import Text from '@/components/Text';
import Input from '@/components/Input';
import Validations from '@/validations';
import Button from '@/components/Button';
import SegmentedControl from '@/components/SegmentedControl';

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  subscription: '0',
};

export default function Details() {
  const { polygon } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(Validations.profileDetails),
  });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      setLoading(true);
      const parsedPolygon = JSON.parse(polygon as any) as Array<Region>;

      // SIMULATION PURPOSE OF API CALL
      // this call is going to fail anyway since we don't have any API service
      try {
        const response = await API.Backend.Geo.createRegion({
          ...data,
          polygon: parsedPolygon,
        });

        if (response.isOk) {
          router.back();
        }
      } catch (err: any) {}

      await Utils.Debug.simulateAPICall();
      router.back();
    } catch (err: any) {
      console.error(err); // for debugging purposes in case we plan to connect some debugging tools in production
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text size='large' weight='bold'>
        Personal Details
      </Text>

      <Controller
        name='name'
        control={control}
        render={({
          fieldState: { error },
          field: { ref, onChange, ...field },
        }) => (
          <Input
            label='Name'
            onChangeText={onChange}
            placeholder='e.g., John Smith'
            errorMessage={error?.message}
            {...field}
          />
        )}
      />

      <Text size='large' weight='bold'>
        Contact Information
      </Text>

      <Controller
        name='email'
        control={control}
        render={({
          fieldState: { error },
          field: { ref, onChange, ...field },
        }) => (
          <Input
            label='Email'
            onChangeText={onChange}
            errorMessage={error?.message}
            placeholder='e.g., john.smith@example.com'
            {...field}
          />
        )}
      />

      <Controller
        name='phone'
        control={control}
        render={({
          fieldState: { error },
          field: { ref, onChange, ...field },
        }) => (
          <Input
            label='Phone Number'
            onChangeText={onChange}
            keyboardType='number-pad'
            placeholder='123 456 7890'
            errorMessage={error?.message}
            {...field}
          />
        )}
      />

      <Text size='large' weight='bold'>
        Insurance Preferences
      </Text>

      <Controller
        name='subscription'
        control={control}
        render={({ field: { ref, value, onChange, ...field } }) => (
          <SegmentedControl
            onChange={onChange}
            values={['Basic', 'Premium']}
            selectedIndex={Number(value)}
            {...field}
          />
        )}
      />

      <Button
        title='Submit'
        loading={loading}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
    padding: 20,
  },
});
