import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import useMediaPicker from '../hooks/useMediaPicker';

type Props = { onPick?: (m: { id: string; uri: string; width?: number; height?: number } | null) => void };

export default function MediaSelector({ onPick }: Props) {
  const { pickImage } = useMediaPicker();

  const handlePick = async () => {
    const result = await pickImage();
    if (!result) return onPick && onPick(null);
    onPick && onPick({ id: `media-${Date.now()}`, uri: result.uri, width: result.width, height: result.height });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePick} style={styles.button}>
        <Text style={styles.buttonText}>Selecionar Mídia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: '#111' },
  button: { padding: 12, backgroundColor: '#16a34a', borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
