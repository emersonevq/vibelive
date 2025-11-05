import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcon from '../components/MaterialIcon';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const GROUPS = [
  {
    title: 'Amigos (2/2)',
    data: [
      { id: '1', name: 'Ana Silva', last: 'Estudando para as provas! 📚', online: true, unread: 2, avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg' },
      { id: '2', name: 'Julia Oliveira', last: 'Feliz! 🎉', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg' },
    ],
  },
  {
    title: 'Família (1/2)',
    data: [
      { id: '3', name: 'Mariana Costa', last: 'Ouvindo música 🎵', online: true, unread: 1, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: '4', name: 'Roberto Silva', last: 'Última vez online: ontem 22:30', online: false, unread: 0, avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg' },
    ],
  },
  {
    title: 'Trabalho (3/3)',
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
  const [expandedSections, setExpandedSections] = useState<string[]>(['Amigos (2/2)', 'Família (1/2)', 'Trabalho (3/3)']);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialIcon name="chat-bubble" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.appTitle}>Live Messenger</Text>
            </View>
          </View>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <MaterialIcon name="cog" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <MaterialIcon name="folder" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileRow}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.profileAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>Usuário Visitante</Text>
          <Text style={styles.profileStatus}>Disponível para conversar!</Text>
        </View>
        <View style={styles.onlineBadge}>
          <Text style={styles.profileOnline}>Online</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcon name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcon name="magnify" size={18} color="#6b7280" />
        <TextInput placeholder="Pesquisar contatos..." style={styles.search} placeholderTextColor="#9ca3af" />
      </View>

      <SectionList
        sections={Array.isArray(GROUPS) ? GROUPS : []}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(title)}
          >
            <MaterialIcon 
              name={expandedSections.includes(title) ? 'chevron-down' : 'chevron-right'} 
              size={18} 
              color="#6b7280"
            />
            <Text style={styles.sectionTitle}>{title}</Text>
          </TouchableOpacity>
        )}
        renderItem={({ item, section }) =>
          !expandedSections.includes(section.title) ? null : (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Chat', { chatId: item.id, name: item.name, avatarUrl: item.avatarUrl })}>
              <View style={styles.avatarContainer}>
                {item.avatarUrl ? (
                  <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name.split(' ').map((n: string) => n[0]).slice(0,2).join('')}</Text>
                  </View>
                )}
                {item.online && <View style={styles.onlineDot} />}
              </View>

              <View style={styles.meta}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.last} numberOfLines={1}>{item.last}</Text>
              </View>
              {item.unread ? <View style={styles.badge}><Text style={styles.badgeText}>{item.unread}</Text></View> : null}
            </TouchableOpacity>
          )
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  appBar: { height: 56, backgroundColor: '#16a34a', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  appBarLeft: { flex: 1 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  appTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  headerIconBtn: { marginLeft: 12 },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  profileAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  profileName: { fontWeight: '700', fontSize: 14 },
  profileStatus: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  onlineBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginRight: 8 },
  profileOnline: { color: '#16a34a', fontWeight: '600', fontSize: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  search: { flex: 1, fontSize: 14, color: '#111827', marginLeft: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#f9fafb' },
  sectionTitle: { fontWeight: '700', color: '#374151', fontSize: 13, marginLeft: 4 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  avatarContainer: { position: 'relative', marginRight: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', color: '#111827', fontSize: 14 },
  avatarImage: { width: 40, height: 40, borderRadius: 20 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#16a34a', borderWidth: 2, borderColor: '#fff' },
  meta: { flex: 1 },
  name: { fontWeight: '600', fontSize: 14, color: '#111827' },
  last: { color: '#6b7280', marginTop: 2, fontSize: 13 },
  badge: { backgroundColor: '#f97316', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10, marginLeft: 8, minWidth: 22, alignItems: 'center' },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
