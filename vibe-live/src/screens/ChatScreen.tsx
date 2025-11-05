import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route, navigation }: Props) {
  const chatId = route.params?.chatId ?? 'unknown';
  const chatName = route.params?.name ?? 'Contato';
  const avatarUrl = route.params?.avatarUrl;
  const [messages, setMessages] = useState<{ id: string; text: string; fromMe?: boolean; time?: string }[]>([
    { id: 'm1', text: 'Oi! Como você está?', fromMe: false, time: '14:30' },
    { id: 'm2', text: 'Oi! Tudo bem sim, e você?', fromMe: true, time: '14:32' },
    { id: 'm3', text: 'Tudo ótimo! Que bom te ver online 😊', fromMe: false, time: '14:33' },
  ]);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages((s) => [...s, { id: String(Date.now()), text: text.trim(), fromMe: true, time: new Date().toLocaleTimeString().slice(0,5) }]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={styles.headerWrap}>
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={{fontSize:18}}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerMeta}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}><Text style={styles.avatarText}>{'AS'}</Text></View>
            )}
            <View>
              <Text style={styles.headerTitle}>{chatName}</Text>
              <Text style={styles.headerStatus}>Estudando para as provas! • Online</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <Text style={styles.icon}>📞</Text>
            <Text style={[styles.icon, {marginLeft:10}]}>🎥</Text>
            <Text style={[styles.icon, {marginLeft:10}]}>⋮</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={[styles.bubbleWrap, item.fromMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
            <View style={[styles.bubble, item.fromMe ? styles.bubbleRight : styles.bubbleLeft]}>
              <Text style={styles.bubbleText}>{item.text}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
      />

      <View style={styles.composer}>
        <TouchableOpacity style={styles.iconBtn}><Text>📎</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}><Text>📷</Text></TouchableOpacity>
        <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="Digite uma mensagem..." />
        <TouchableOpacity onPress={send} style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerWrap: { padding: 12, backgroundColor: '#f8fafc' },
  headerCard: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#fff', borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  back: { padding: 6 },
  headerMeta: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 6 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  avatarText: { fontWeight: '700' },
  avatarImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerTitle: { fontWeight: '700', fontSize: 16 },
  headerStatus: { fontSize: 12, color: '#6b7280' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 18, color: '#111827' },

  bubbleWrap: { paddingHorizontal: 12, marginVertical: 6 },
  bubble: { padding: 12, borderRadius: 18, maxWidth: '80%' },
  bubbleLeft: { backgroundColor: '#f3f4f6', borderTopLeftRadius: 6, borderBottomLeftRadius: 6 },
  bubbleRight: { backgroundColor: '#2563EB', borderTopRightRadius: 6, borderBottomRightRadius: 6 },
  bubbleText: { color: '#000' },
  time: { fontSize: 11, color: '#6b7280', marginTop: 6, textAlign: 'right' },

  composer: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff' },
  iconBtn: { padding: 8 },
  input: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 24, marginHorizontal: 8 },
  sendButton: { backgroundColor: '#16a34a', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontWeight: '700' },
});
