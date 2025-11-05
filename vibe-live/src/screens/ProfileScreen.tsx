import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.cover} />
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.avatar} />
      </View>
      <Text style={styles.name}>Usuário Visitante</Text>
      <Text style={styles.status}>Ouvindo: Nothing for now</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.sectionText}>Perfil mockado para demonstração.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 140, backgroundColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center' },
  cover: { position: 'absolute', left: 0, right: 0, top: 0, height: 140, resizeMode: 'cover', opacity: 0.6 },
  avatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 3, borderColor: '#fff' },
  name: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  status: { textAlign: 'center', color: '#6b7280', marginBottom: 12 },
  section: { padding: 12 },
  sectionTitle: { fontWeight: '700', marginBottom: 6 },
  sectionText: { color: '#374151' },
});
