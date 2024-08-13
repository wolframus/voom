import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import Text from './Text';
import { COLORS } from '@/constants';

type Props = {
  label?: string;
  errorMessage?: string;
} & TextInputProps;

export default function Input({ errorMessage, label, style, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text size='small'>{label}</Text> : undefined}

      <TextInput
        placeholderTextColor={COLORS.silver}
        style={StyleSheet.flatten([styles.input, style])}
        {...rest}
      />

      {errorMessage ? (
        <Text size='small' type='danger'>
          {errorMessage}
        </Text>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  input: {
    color: COLORS.black,
    backgroundColor: COLORS.white,

    paddingVertical: 6,
    paddingHorizontal: 15,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: `${COLORS.silver}`,
  },
});
