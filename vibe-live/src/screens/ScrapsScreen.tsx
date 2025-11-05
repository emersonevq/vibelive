import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

type Scrap = {
  id: string;
  text: string;
  createdAt: number;
  author: string;
};

const ONE_HOUR = 60 * 60 * 1000;

const initial: Scrap[] = [
  { id: 's1', text: 'Alguém vem tomar um café?', createdAt: Date.now() - 20 * 60 * 1000, author: 'Ana' },
  { id: 's2', text: 'Boa ideia: meetup hoje 18h', createdAt: Date.now() - 70 * 60 * 1000, author: 'Carlos' }, // expired
  { id: 's3', text: 'Vendas batendo meta! 🎉', createdAt: Date.now() - 5 * 60 * 1000, author: 'Pedro' },
];

export default function ScrapsScreen() {
  const [scraps, setScraps] = useState<Scrap[]>(initial);
  const [text, setText] = useState('');

  useEffect(() => {
    const t = setInterval(() => {
      // remove expired scraps periodically
      setScraps((s) => s.filter((x) => Date.now() - x.createdAt < ONE_HOUR));
    }, 30 * 1000);
    return () => clearInterval(t);
  }, []);

  const visible = useMemo(() => scraps.filter((x) => Date.now() - x.createdAt < ONE_HOUR), [scraps]);

  const add = () => {
    if (!text.trim()) {
      Alert.alert('Escreva algo');
      return;
    }
    const newItem: Scrap = { id: uuidv4(), text: text.trim(), createdAt: Date.now(), author: 'Você' };
    setScraps((s) => [newItem, ...s]);
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scraps (temporários)</Text>
      <View style={styles.composer}>
        <TextInput value={text} onChangeText={setText} placeholder="Escreva um recado..." style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={add}>
          <Text style={styles.buttonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      {visible.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>Nenhum scrap ativo</Text></View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardAuthor}>{item.author}</Text>
              <Text style={styles.cardText}>{item.text}</Text>
              <Text style={styles.cardTime}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  composer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginRight: 8 },
  button: { backgroundColor: '#16a34a', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
  empty: { padding: 20, alignItems: 'center' },
  emptyText: { color: '#6b7280' },
  card: { padding: 12, borderRadius: 8, backgroundColor: '#f9fafb', marginBottom: 10 },
  cardAuthor: { fontWeight: '700', marginBottom: 4 },
  cardText: { marginBottom: 6 },
  cardTime: { color: '#6b7280', fontSize: 12 },
});
