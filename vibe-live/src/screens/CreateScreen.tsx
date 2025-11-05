import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';

export default function CreateScreen() {
  const [text, setText] = useState('');

  const handlePost = () => {
    const value = text.trim();
    if (!value) {
      Alert.alert('Campo vazio', 'Escreva algo para publicar.');
      return;
    }
    Alert.alert('Publicado', 'Seu conteúdo foi publicado!');
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="plus-circle" size={24} color="#16a34a" />
        <Text style={styles.title}>Criar</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>O que você quer compartilhar?</Text>
        <View style={styles.inputRow}>
          <MaterialCommunityIcons name="lead-pencil" size={20} color="#16a34a" style={{ marginRight: 8 }} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Escreva uma mensagem, ideia ou status..."
            style={styles.input}
            placeholderTextColor="#9ca3af"
            multiline
            maxHeight={120}
          />
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="image-plus" size={20} color="#16a34a" />
            <Text style={styles.actionText}>Imagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="camera" size={20} color="#16a34a" />
            <Text style={styles.actionText}>Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="file" size={20} color="#16a34a" />
            <Text style={styles.actionText}>Arquivo</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton title="Publicar" onPress={handlePost} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  title: { fontSize: 20, fontWeight: '700', color: '#111827', marginLeft: 10 },
  card: { backgroundColor: '#fff', margin: 12, padding: 16, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  label: { fontSize: 13, fontWeight: '600', color: '#6b7280', marginBottom: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  input: { flex: 1, fontSize: 14, color: '#111827' },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  actionText: { marginLeft: 6, color: '#374151', fontWeight: '600', fontSize: 12 },
});
