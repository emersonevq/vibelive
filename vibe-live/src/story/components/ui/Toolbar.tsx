import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  tools: { id: string; label: string }[];
  active?: string;
  onSelect: (id: string) => void;
};

export default function Toolbar({ tools, active, onSelect }: Props) {
  return (
    <View style={styles.toolbar}>
      {tools.map((t) => (
        <TouchableOpacity key={t.id} style={[styles.button, active === t.id && styles.active]} onPress={() => onSelect(t.id)}>
          <Text style={[styles.label, active === t.id && styles.labelActive]}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: { flexDirection: 'row', padding: 8, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center' },
  button: { paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, borderRadius: 6 },
  active: { backgroundColor: '#16a34a' },
  label: { color: '#fff' },
  labelActive: { fontWeight: '700' },
});
