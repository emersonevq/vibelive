import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  onNavigate: (to: 'Login' | 'SignUp' | 'Home' | 'Chat', params?: { chatId?: string }) => void;
};

const MOCK_CHATS = [
  { id: '1', name: 'Amigos' },
  { id: '2', name: 'Família' },
  { id: '3', name: 'Trabalho' },
];

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversas</Text>
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onNavigate('Chat', { chatId: item.id })}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  item: { padding: 14, borderRadius: 8, backgroundColor: '#f9fafb', marginBottom: 10 },
  itemText: { fontSize: 16 },
});
