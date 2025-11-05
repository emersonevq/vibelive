import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView style={[styles.container]} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Text style={styles.headerAvatarText}>AS</Text>
            </View>
          )}

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{chatName}</Text>
            <Text style={styles.headerSubtitle}>Disponível para conversar!</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>📞</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.fromMe && styles.messageRowRight]}>
              <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleOther]}>
                <Text style={[styles.messageText, item.fromMe && styles.messageTextMe]}>{item.text}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
          style={styles.messagesList}
        />

        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn}>
              <Text style={styles.attachIcon}>📎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachBtn}>
              <Text style={styles.attachIcon}>📷</Text>
            </TouchableOpacity>
            <TextInput
              value={text}
              onChangeText={setText}
              style={styles.textInput}
              placeholder="Digite uma mensagem..."
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.emojiBtn}>
              <Text style={styles.emojiIcon}>😊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={send} style={styles.sendBtn}>
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backBtn: { padding: 4, marginRight: 8 },
  backIcon: { fontSize: 20, color: '#111827' },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  headerAvatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  headerAvatarText: { fontWeight: '700', fontSize: 12, color: '#111827' },
  headerInfo: { flex: 1 },
  headerTitle: { fontWeight: '700', fontSize: 15, color: '#111827' },
  headerSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 1 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { marginLeft: 8, padding: 4 },
  actionIcon: { fontSize: 18, color: '#6b7280' },

  messagesList: { flex: 1 },
  messageRow: { marginVertical: 4, alignItems: 'flex-start' },
  messageRowRight: { alignItems: 'flex-end' },
  bubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubbleOther: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: '#2563EB', borderBottomRightRadius: 4 },
  messageText: { fontSize: 14, color: '#111827', lineHeight: 20 },
  messageTextMe: { color: '#fff' },
  messageTime: { fontSize: 11, color: '#9ca3af', marginTop: 4, textAlign: 'right' },

  inputContainer: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingHorizontal: 12, paddingTop: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  attachBtn: { padding: 8 },
  attachIcon: { fontSize: 20 },
  textInput: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, marginHorizontal: 8 },
  emojiBtn: { padding: 4 },
  emojiIcon: { fontSize: 20 },
  sendBtn: { backgroundColor: '#2563EB', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
  sendIcon: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
