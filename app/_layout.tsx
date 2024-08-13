import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen options={{ headerShown: false }} name='index' />
      <Stack.Screen options={{ title: 'Map', headerShown: true }} name='map' />
      <Stack.Screen
        options={{ title: 'Details', headerShown: true }}
        name='details'
      />
    </Stack>
  );
}
