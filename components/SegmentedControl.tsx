import { StyleSheet, View } from 'react-native';
import RNSegmentedControl from '@react-native-segmented-control/segmented-control';

import Text from './Text';

type Props = {
  label?: string;
  errorMessage?: string;

  values: Array<string>;
  selectedIndex: number;
  onChange: (_: number) => void;
};

export default function SegmentedControl({
  label,
  values,
  onChange,
  errorMessage,
  selectedIndex,
}: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text size='small'>{label}</Text> : undefined}

      <RNSegmentedControl
        values={values}
        selectedIndex={selectedIndex}
        onChange={({ nativeEvent: { selectedSegmentIndex } }) => {
          onChange(selectedSegmentIndex);
        }}
      />

      {errorMessage ? (
        <Text type='danger' size='small'>
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
});
