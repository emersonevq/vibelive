import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcon from '../components/MaterialIcon';
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
            <MaterialIcon name="arrow-left" size={24} color="#111827" />
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
            <Text style={styles.headerSubtitle}>Estudando para as provas!</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialIcon name="phone" size={22} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialIcon name="video" size={22} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialIcon name="information" size={22} color="#6b7280" />
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
          contentContainerStyle={{ padding: 12, paddingBottom: 90 }}
          style={styles.messagesList}
        />

        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn}>
              <MaterialIcon name="paperclip" size={22} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachBtn}>
              <MaterialIcon name="image-plus" size={22} color="#2563EB" />
            </TouchableOpacity>
            <TextInput
              value={text}
              onChangeText={setText}
              style={styles.textInput}
              placeholder="Digite uma mensagem..."
              placeholderTextColor="#9ca3af"
              multiline
              maxHeight={100}
            />
            <TouchableOpacity style={styles.emojiBtn}>
              <MaterialIcon name="emoticon-happy-outline" size={22} color="#f97316" />
            </TouchableOpacity>
            <TouchableOpacity onPress={send} style={styles.sendBtn}>
              <MaterialIcon name="send" size={20} color="#fff" />
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
  backBtn: { padding: 8, marginRight: 8 },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  headerAvatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  headerAvatarText: { fontWeight: '700', fontSize: 12, color: '#111827' },
  headerInfo: { flex: 1 },
  headerTitle: { fontWeight: '700', fontSize: 15, color: '#111827' },
  headerSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 1 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { marginLeft: 12, padding: 4 },

  messagesList: { flex: 1 },
  messageRow: { marginVertical: 4, alignItems: 'flex-start' },
  messageRowRight: { alignItems: 'flex-end' },
  bubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubbleOther: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: '#16a34a', borderBottomRightRadius: 4 },
  messageText: { fontSize: 14, color: '#111827', lineHeight: 20 },
  messageTextMe: { color: '#fff' },
  messageTime: { fontSize: 11, color: '#9ca3af', marginTop: 4, textAlign: 'right' },

  inputContainer: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingHorizontal: 8, paddingTop: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end' },
  attachBtn: { padding: 8 },
  textInput: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, marginHorizontal: 4, maxHeight: 100 },
  emojiBtn: { padding: 8 },
  sendBtn: { backgroundColor: '#16a34a', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginRight: 4 },
});
