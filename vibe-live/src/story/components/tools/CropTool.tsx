import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = { initial?: { zoom?: number; rotation?: number }; onApply?: (opts: { zoom: number; rotation: number }) => void };

export default function CropTool({ initial, onApply }: Props) {
  const [zoom, setZoom] = useState(initial?.zoom ?? 1);
  const [rotation, setRotation] = useState(initial?.rotation ?? 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Zoom: {zoom.toFixed(2)}</Text>
      <View style={styles.row}>
        <Button title="-" onPress={() => setZoom(Math.max(0.5, zoom - 0.1))} />
        <Button title="+" onPress={() => setZoom(Math.min(3, zoom + 0.1))} />
      </View>

      <Text style={styles.label}>Rotação: {Math.round(rotation)}°</Text>
      <View style={styles.row}>
        <Button title="-" onPress={() => setRotation((rotation - 5 + 360) % 360)} />
        <Button title="+" onPress={() => setRotation((rotation + 5) % 360)} />
      </View>

      <Button title="Aplicar" onPress={() => onApply && onApply({ zoom, rotation })} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8, backgroundColor: '#111' }, label: { color: '#fff', marginVertical: 8 }, row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 } });
