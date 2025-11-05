import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FONTS = ['System','Helvetica','Times New Roman','Courier New','Georgia'];

type Props = { value?: string; onChange?: (f: string) => void };

export default function FontSelector({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {FONTS.map(f => (
        <TouchableOpacity key={f} onPress={() => onChange && onChange(f)} style={[styles.item, value === f && styles.active]}>
          <Text style={{ color: value === f ? '#fff' : '#ddd' }}>{f}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flexDirection: 'row', padding: 8 }, item: { marginRight: 8, padding: 6, borderRadius: 6 }, active: { backgroundColor: '#16a34a' } });
