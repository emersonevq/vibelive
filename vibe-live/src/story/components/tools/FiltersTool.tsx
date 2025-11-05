import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

type Props = {
  initial?: { brightness?: number; contrast?: number; saturation?: number };
  onApply?: (opts: { brightness: number; contrast: number; saturation: number }) => void;
};

export default function FiltersTool({ initial, onApply }: Props) {
  const [brightness, setBrightness] = useState(initial?.brightness ?? 1);
  const [contrast, setContrast] = useState(initial?.contrast ?? 1);
  const [saturation, setSaturation] = useState(initial?.saturation ?? 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Brilho: {brightness.toFixed(2)}</Text>
      <Slider minimumValue={0} maximumValue={2} value={brightness} onValueChange={setBrightness} />

      <Text style={styles.label}>Contraste: {contrast.toFixed(2)}</Text>
      <Slider minimumValue={0} maximumValue={2} value={contrast} onValueChange={setContrast} />

      <Text style={styles.label}>Saturação: {saturation.toFixed(2)}</Text>
      <Slider minimumValue={0} maximumValue={2} value={saturation} onValueChange={setSaturation} />

      <Button title="Aplicar" onPress={() => onApply && onApply({ brightness, contrast, saturation })} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8, backgroundColor: '#111' }, label: { color: '#fff', marginTop: 8 } });
