import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

type Props = {
  chatId: string;
  onNavigate: (to: 'Login' | 'SignUp' | 'Home' | 'Chat', params?: { chatId?: string }) => void;
};

export default function ChatScreen({ chatId, onNavigate }: Props) {
  const [messages, setMessages] = useState<{ id: string; text: string; fromMe?: boolean }[]>([
    { id: 'm1', text: 'Mensagem de exemplo', fromMe: false },
  ]);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages((s) => [...s, { id: String(Date.now()), text: text.trim(), fromMe: true }]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <Text style={styles.title}>Chat {chatId}</Text>
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.fromMe ? styles.bubbleRight : styles.bubbleLeft]}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      <View style={styles.composer}>
        <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="Mensagem" />
        <TouchableOpacity onPress={send} style={styles.sendButton}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  bubble: { padding: 10, borderRadius: 8, marginVertical: 6, maxWidth: '80%' },
  bubbleLeft: { backgroundColor: '#f3f4f6', alignSelf: 'flex-start' },
  bubbleRight: { backgroundColor: '#dcfce7', alignSelf: 'flex-end' },
  bubbleText: { fontSize: 14 },
  composer: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 8 },
  input: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginRight: 8 },
  sendButton: { backgroundColor: '#16a34a', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  sendText: { color: '#fff', fontWeight: '600' },
});
