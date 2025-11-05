import React, { useState } from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

type Props = { color: string; onColorChange?: (c: string) => void; width: number; onWidthChange?: (w: number) => void };

export default function DrawingTool({ color, onColorChange, width, onWidthChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', marginBottom: 6 }}>Espessura: {Math.round(width)}</Text>
      <Slider minimumValue={1} maximumValue={30} value={width} onValueChange={onWidthChange} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8, backgroundColor: '#222' } });
