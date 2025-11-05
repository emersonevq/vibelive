import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import type { Background } from './types';

interface Props {
  onSelect: (bg: Background) => void;
  onCancel: () => void;
}

const COLORS = ['#111827', '#0ea5e9', '#16a34a', '#ef4444', '#a855f7', '#f59e0b', '#0f172a'];

export default function MediaSelector({ onSelect, onCancel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity accessibilityLabel="Cancelar" onPress={onCancel} style={styles.headerBtn}>
          <MaterialCommunityIcons name="close" color="#fff" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Story</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          accessibilityLabel="Abrir galeria"
          style={styles.actionBtn}
          onPress={async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permissão necessária', 'Autorize o acesso à galeria para continuar.');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsMultipleSelection: false, quality: 0.9 });
            if (result.canceled) return;
            const asset = result.assets?.[0];
            if (!asset) return;
            const size = (asset as any).fileSize as number | undefined;
            if (asset.type === 'video') {
              if (size && size > 100 * 1024 * 1024) { Alert.alert('Arquivo muito grande', 'Vídeos até 100MB.'); return; }
              onSelect({ type: 'video', uri: asset.uri, duration: (asset as any).duration });
            } else {
              if (size && size > 50 * 1024 * 1024) { Alert.alert('Arquivo muito grande', 'Fotos até 50MB.'); return; }
              onSelect({ type: 'image', uri: asset.uri });
            }
          }}
        >
          <MaterialCommunityIcons name="image-multiple" size={28} color="#fff" />
          <Text style={styles.actionText}>Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityLabel="Abrir câmera"
          style={styles.actionBtn}
          onPress={async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permissão necessária', 'Autorize o acesso à câmera para continuar.');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 0.9 });
            if (result.canceled) return;
            const asset = result.assets?.[0];
            if (!asset) return;
            const size = (asset as any).fileSize as number | undefined;
            if (asset.type === 'video') {
              if (size && size > 100 * 1024 * 1024) { Alert.alert('Arquivo muito grande', 'Vídeos até 100MB.'); return; }
              onSelect({ type: 'video', uri: asset.uri, duration: (asset as any).duration });
            } else {
              if (size && size > 50 * 1024 * 1024) { Alert.alert('Arquivo muito grande', 'Fotos até 50MB.'); return; }
              onSelect({ type: 'image', uri: asset.uri });
            }
          }}
        >
          <MaterialCommunityIcons name="camera" size={28} color="#fff" />
          <Text style={styles.actionText}>Câmera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityLabel="Criar com texto"
          style={[styles.actionBtn, styles.accent]}
          onPress={() => onSelect({ type: 'color', color: COLORS[0] })}
        >
          <MaterialCommunityIcons name="format-text" size={28} color="#0f172a" />
          <Text style={[styles.actionText, { color: '#0f172a' }]}>Criar com texto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.palette}>
        {COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            accessibilityLabel={`Selecionar cor ${c}`}
            style={[styles.color, { backgroundColor: c }]}
            onPress={() => onSelect({ type: 'color', color: c })}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220' },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  actions: { padding: 16, gap: 12 },
  actionBtn: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionText: { color: '#fff', fontWeight: '600' },
  accent: { backgroundColor: '#e2e8f0' },
  palette: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 16 },
  color: { width: 36, height: 36, borderRadius: 18 },
});
