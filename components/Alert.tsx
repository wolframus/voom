import { TextStyle, View, ViewStyle, StyleSheet } from 'react-native';

import Text from './Text';

type Type = 'info';

type Props = {
  type: Type;
  title: string;
  label: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  labelStyle?: TextStyle;
};

const CONTAINER_STYLE_TO_TYPE: Record<Type, ViewStyle> = {
  info: {
    backgroundColor: '#BEE2FF',
  },
};

export default function Alert({
  type,
  title,
  label,
  style,
  titleStyle,
  labelStyle,
}: Props) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        style,
        CONTAINER_STYLE_TO_TYPE[type],
      ])}>
      <Text style={StyleSheet.flatten([styles.text, titleStyle])}>{title}</Text>
      <Text style={StyleSheet.flatten([styles.label, labelStyle])}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
  },
});
