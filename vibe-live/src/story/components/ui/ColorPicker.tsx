import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = ['#ffffff','#000000','#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff','#ff6b6b','#ffd93d'];

type Props = { value?: string; onChange?: (c: string) => void };

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {COLORS.map(c => (
        <TouchableOpacity key={c} onPress={() => onChange && onChange(c)} style={[styles.swatch, { backgroundColor: c, borderColor: value === c ? '#16a34a' : 'transparent' }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flexDirection: 'row' }, swatch: { width: 32, height: 32, borderRadius: 16, marginRight: 8, borderWidth: 2 } });
