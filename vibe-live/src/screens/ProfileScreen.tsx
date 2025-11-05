import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from '../components/MaterialIcon';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.coverImage} />
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.avatar} />
            <View style={styles.editBadge}>
              <MaterialIcon name="pencil" size={16} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Usuário Visitante</Text>
          <View style={styles.statusRow}>
            <MaterialIcon name="music" size={14} color="#f97316" />
            <Text style={styles.status}> Ouvindo: Nothing for now</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Mensagens</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Contatos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Stories</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcon name="information" size={22} color="#2563EB" />
            <Text style={styles.sectionTitle}>Sobre</Text>
          </View>
          <Text style={styles.sectionText}>Perfil mockado para demonstração do aplicativo Live Messenger.</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcon name="cog" size={22} color="#2563EB" />
            <Text style={styles.sectionTitle}>Configurações</Text>
          </View>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="account-edit" size={20} color="#2563EB" style={styles.optionIcon} />
              <Text style={styles.optionText}>Editar perfil</Text>
            </View>
            <MaterialIcon name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="shield-account" size={20} color="#2563EB" style={styles.optionIcon} />
              <Text style={styles.optionText}>Privacidade</Text>
            </View>
            <MaterialIcon name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="bell" size={20} color="#2563EB" style={styles.optionIcon} />
              <Text style={styles.optionText}>Notificações</Text>
            </View>
            <MaterialIcon name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="palette" size={20} color="#2563EB" style={styles.optionIcon} />
              <Text style={styles.optionText}>Tema</Text>
            </View>
            <MaterialIcon name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcon name="help-circle" size={22} color="#2563EB" />
            <Text style={styles.sectionTitle}>Suporte</Text>
          </View>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="frequently-asked-questions" size={20} color="#f97316" style={styles.optionIcon} />
              <Text style={styles.optionText}>Ajuda e FAQ</Text>
            </View>
            <MaterialIcon name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="bug" size={20} color="#f97316" style={styles.optionIcon} />
              <Text style={styles.optionText}>Reportar problema</Text>
            </View>
            <MaterialIcon name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcon name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { height: 160, backgroundColor: '#2563EB', position: 'relative', marginBottom: 50 },
  coverImage: { width: '100%', height: 160, resizeMode: 'cover', opacity: 0.2 },
  avatarContainer: { position: 'absolute', bottom: -40, left: '50%', marginLeft: -50 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#fff' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  profileInfo: { alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff' },
  name: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  status: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  statsRow: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 12, borderRadius: 12, overflow: 'hidden', elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statNumber: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6b7280' },
  statDivider: { width: 1, backgroundColor: '#e5e7eb' },
  section: { backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 12, padding: 16, borderRadius: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginLeft: 10 },
  sectionText: { color: '#6b7280', fontSize: 14, lineHeight: 20 },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  optionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  optionIcon: { marginRight: 12 },
  optionText: { fontSize: 15, color: '#111827', fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fecaca', marginHorizontal: 12, marginVertical: 24, paddingVertical: 14, borderRadius: 12 },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#ef4444', marginLeft: 8 },
});
