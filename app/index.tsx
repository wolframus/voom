import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';

export default function Index() {
  const handleGetStartedPress = () => router.replace('/map');

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Avatar source={require('@/assets/images/drone.png')} />

        <View style={styles.heroTextWrapper}>
          <Alert
            type='info'
            title='Welcome!'
            label='Your trusted partner for drone surveillance and security services. We offer real-time flight tracking, advanced mapping, and comprehensive user details for all your drone operations.'
          />
        </View>
      </View>

      <Button
        title='Get started'
        style={styles.button}
        onPress={handleGetStartedPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  topContainer: {
    flex: 1,
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    marginHorizontal: 'auto',
  },
  heroTextWrapper: {
    width: '100%',
  },
});
