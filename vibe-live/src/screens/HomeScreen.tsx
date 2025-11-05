import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const GROUPS = [
  {
    title: 'Amigos',
    data: [
      { id: '1', name: 'Ana Silva', last: 'Estudando para as provas!', online: true, unread: 2, avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg' },
      { id: '2', name: 'Julia Oliveira', last: 'Feliz! 🎉', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg' },
    ],
  },
  {
    title: 'Família',
    data: [
      { id: '3', name: 'Mariana Costa', last: 'Ouvindo música 🎵', online: true, unread: 1, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: '4', name: 'Roberto Silva', last: 'Última vez online: ontem 22:30', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg' },
    ],
  },
  {
    title: 'Trabalho',
    data: [
      { id: '5', name: 'Carlos Santos', last: 'Voltei em 10 min', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg' },
      { id: '6', name: 'Fernanda Costa', last: 'Almoçando...', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { id: '7', name: 'Pedro Lima', last: 'Em reunião até 16h', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/men/52.jpg' },
    ],
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Text style={styles.appTitle}>Live Messenger</Text>
          <Text style={styles.appSubtitle}>Disponível para conversar!</Text>
        </View>
        <View style={styles.appBarRight}>
          <Text style={styles.appIcon}>⚙️</Text>
        </View>
      </View>

      <View style={styles.profileRow}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.profileAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>Usuário Visitante</Text>
          <Text style={styles.profileStatus}>Disponível para conversar!</Text>
        </View>
        <Text style={styles.profileOnline}>Online</Text>
      </View>

      <TextInput placeholder="Pesquisar contatos..." style={styles.search} />

      <SectionList
        sections={GROUPS}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Chat', { chatId: item.id, name: item.name, avatarUrl: item.avatarUrl })}>
            {item.avatarUrl ? (
              <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n: string) => n[0]).slice(0,2).join('')}</Text>
              </View>
            )}

            <View style={styles.meta}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.last}>{item.last}</Text>
            </View>
            {item.unread ? <View style={styles.badge}><Text style={styles.badgeText}>{item.unread}</Text></View> : null}
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 8 },
  appBar: { height: 62, backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderRadius: 8, marginBottom: 12 },
  appBarLeft: { flex: 1 },
  appTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  appSubtitle: { color: '#fff', fontSize: 12, opacity: 0.9 },
  appBarRight: { paddingLeft: 8 },
  appIcon: { color: '#fff', fontSize: 18 },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  profileAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 10 },
  profileName: { fontWeight: '700' },
  profileStatus: { color: '#6b7280', fontSize: 12 },
  profileOnline: { color: '#16a34a', fontWeight: '600' },
  search: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
  sectionHeader: { paddingVertical: 8 },
  sectionTitle: { fontWeight: '700', color: '#374151' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f3f4f6' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  avatarText: { fontWeight: '700', color: '#111827' },
  meta: { flex: 1 },
  name: { fontWeight: '600' },
  last: { color: '#6b7280', marginTop: 2 },
  badge: { backgroundColor: '#f97316', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 8 },
  badgeText: { color: '#fff', fontWeight: '700' },
  avatarImage: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
});
