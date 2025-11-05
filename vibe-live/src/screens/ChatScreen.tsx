import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const chatId = route.params?.chatId ?? 'unknown';
  const chatName = route.params?.name ?? 'Ana Silva';
  const avatarUrl = route.params?.avatarUrl;
  const [messages, setMessages] = useState<{ id: string; text: string; fromMe?: boolean; time?: string }[]>([
    { id: 'm1', text: 'Oi! Como você está?', fromMe: false, time: '14:30' },
    { id: 'm2', text: 'Oi! Tudo bem sim, e você?!', fromMe: true, time: '14:32' },
    { id: 'm3', text: 'Tudo ótimo! Que bom te ver online 😊', fromMe: false, time: '14:33' },
  ]);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages((s) => [...s, { id: String(Date.now()), text: text.trim(), fromMe: true, time: new Date().toLocaleTimeString().slice(0,5) }]);
    setText('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={26} color="#000" />
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
            <Text style={styles.headerSubtitle}>Estudando para as provas! 📚</Text>
          </View>

          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="phone-outline" size={24} color="#0084ff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="video-outline" size={24} color="#0084ff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.fromMe && styles.messageRowMe]}>
              <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleOther]}>
                <Text style={[styles.messageText, item.fromMe && styles.messageTextMe]}>
                  {item.text}
                </Text>
                <Text style={[styles.messageTime, item.fromMe && styles.messageTimeMy]}>
                  {item.time}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.messagesList}
          style={{ flex: 1 }}
        />

        {/* Input */}
        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputIcon}>
              <MaterialCommunityIcons name="paperclip" size={24} color="#0084ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon}>
              <MaterialCommunityIcons name="camera" size={24} color="#0084ff" />
            </TouchableOpacity>
            <TextInput
              value={text}
              onChangeText={setText}
              style={styles.textInput}
              placeholder="Digite uma mensagem..."
              placeholderTextColor="#65676b"
              multiline
              maxHeight={100}
            />
            <TouchableOpacity style={styles.inputIcon}>
              <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#0084ff" />
            </TouchableOpacity>
            {text.trim() ? (
              <TouchableOpacity onPress={send} style={styles.sendBtn}>
                <MaterialCommunityIcons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.inputIcon}>
                <MaterialCommunityIcons name="thumb-up" size={24} color="#0084ff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6eb',
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0084ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#050505',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#65676b',
    marginTop: 2,
  },
  iconBtn: {
    padding: 8,
    marginLeft: 4,
  },
  
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  messageRow: {
    marginVertical: 2,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  messageRowMe: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginVertical: 2,
  },
  bubbleOther: {
    backgroundColor: '#e4e6eb',
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: '#0084ff',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#050505',
    lineHeight: 20,
  },
  messageTextMe: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 11,
    color: '#65676b',
    marginTop: 2,
  },
  messageTimeMy: {
    color: '#d0e4ff',
  },
  
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e4e6eb',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  inputIcon: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    color: '#050505',
    marginHorizontal: 4,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: '#0084ff',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});
