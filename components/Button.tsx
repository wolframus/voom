import {
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

import Text from './Text';
import { COLORS } from '@/constants';

type Type = 'default' | 'danger' | 'info' | 'success';

type Props = {
  type?: Type;
  title: string;
  loading?: boolean;
} & TouchableOpacityProps;

const BACKGROUND_TO_TYPE: Record<Type, ViewStyle> = {
  danger: {
    backgroundColor: COLORS.danger,
  },
  default: {
    backgroundColor: COLORS.black,
  },
  info: {
    backgroundColor: COLORS.info,
  },
  success: {
    backgroundColor: COLORS.accent,
  },
};

export default function Button({
  type = 'default',
  title,
  style,
  loading,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      style={StyleSheet.flatten([
        (props.disabled || loading) && styles.disabled,
        styles.container,
        BACKGROUND_TO_TYPE[type],
        style,
      ])}>
      <Text style={styles.title}>{title}</Text>
      {loading ? (
        <ActivityIndicator color={COLORS.white} size={18} />
      ) : undefined}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#1F1F1F',

    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.75,
  },
});
