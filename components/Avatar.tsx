import { COLORS } from '@/constants';
import { Image, ImageProps, StyleSheet, View } from 'react-native';

type Props = {} & ImageProps;

export default function Avatar({ style, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Image style={StyleSheet.flatten([styles.image, style])} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10000,
    backgroundColor: COLORS.silver,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    width: 175,
    height: 175,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});
