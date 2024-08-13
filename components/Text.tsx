import { StyleSheet, TextProps, TextStyle, Text as RNText } from 'react-native';

import { COLORS } from '@/constants';

type Weight = 'default' | 'bold';
type Size = 'default' | 'large' | 'small';
type Type = 'default' | 'accent' | 'white' | 'danger';

type Props = { type?: Type; size?: Size; weight?: Weight } & TextProps;

const COLOR_TO_TYPE: Record<Type, TextStyle> = {
  accent: {
    color: COLORS.accent,
  },
  default: {
    color: COLORS.black,
  },
  white: {
    color: COLORS.white,
  },
  danger: {
    color: COLORS.danger,
  },
};

const SIZE_TO_TYPE: Record<Size, TextStyle> = {
  default: { fontSize: 16 },
  large: { fontSize: 20 },
  small: { fontSize: 12 },
};

const SIZE_TO_WEIGHT: Record<Weight, TextStyle> = {
  default: {},
  bold: { fontWeight: 'bold' },
};

export default function Text({
  style,
  children,
  type = 'default',
  size = 'default',
  weight = 'default',
  ...rest
}: Props) {
  return (
    <RNText
      style={StyleSheet.flatten([
        COLOR_TO_TYPE[type],
        SIZE_TO_TYPE[size],
        SIZE_TO_WEIGHT[weight],
        style,
      ])}
      {...rest}>
      {children}
    </RNText>
  );
}
