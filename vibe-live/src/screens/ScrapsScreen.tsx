import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Scrap = {
  id: string;
  text: string;
  createdAt: number;
  author: string;
};

const ONE_HOUR = 60 * 60 * 1000;

const initial: Scrap[] = [
  { id: 's1', text: 'Alguém vem tomar um café? ☕', createdAt: Date.now() - 20 * 60 * 1000, author: 'Ana' },
  { id: 's2', text: 'Boa ideia: meetup hoje 18h 🚀', createdAt: Date.now() - 70 * 60 * 1000, author: 'Carlos' },
  { id: 's3', text: 'Vendas batendo meta! 🎉', createdAt: Date.now() - 5 * 60 * 1000, author: 'Pedro' },
];

export default function ScrapsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [scraps, setScraps] = useState<Scrap[]>(initial);
  const [text, setText] = useState('');

  useEffect(() => {
    const t = setInterval(() => {
      setScraps((s) => s.filter((x) => Date.now() - x.createdAt < ONE_HOUR));
    }, 30 * 1000);
    return () => clearInterval(t);
  }, []);

  const visible = useMemo(() => scraps.filter((x) => Date.now() - x.createdAt < ONE_HOUR), [scraps]);

  const add = () => {
    if (!text.trim()) {
      Alert.alert('Campo vazio', 'Escreva algo para compartilhar');
      return;
    }
    const newItem: Scrap = { id: uuidv4(), text: text.trim(), createdAt: Date.now(), author: 'Você' };
    setScraps((s) => [newItem, ...s]);
    setText('');
  };

  const getTimeRemaining = (createdAt: number) => {
    const remaining = ONE_HOUR - (Date.now() - createdAt);
    const minutes = Math.floor(remaining / (60 * 1000));
    return `${minutes}min restantes`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header moderno */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconContainer}>
            <MaterialCommunityIcons name="file-document" size={24} color="#16a34a" />
          </View>
          <View>
            <Text style={styles.title}>Scraps Rápidos</Text>
            <Text style={styles.subtitle}>Mensagens que desaparecem em 1h</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerNotifBtn} onPress={() => navigation.navigate('Notifications')}>
          <MaterialCommunityIcons name="bell-outline" size={22} color="#16a34a" />
        </TouchableOpacity>
      </View>

      {/* Composer melhorado */}
      <View style={styles.composerCard}>
        <View style={styles.composerHeader}>
          <MaterialCommunityIcons name="plus-circle" size={20} color="#16a34a" />
          <Text style={styles.composerLabel}>Compartilhar mensagem rápida</Text>
        </View>
        <View style={styles.composer}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Escreva um recado..."
            style={styles.input}
            placeholderTextColor="#9ca3af"
            multiline
            maxHeight={100}
          />
          <TouchableOpacity 
            style={[styles.sendButton, { opacity: text.trim() ? 1 : 0.5 }]} 
            onPress={add}
            disabled={!text.trim()}
          >
            <MaterialCommunityIcons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de scraps ou estado vazio */}
      {visible.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIconContainer}>
            <MaterialCommunityIcons name="inbox-multiple" size={64} color="#16a34a" />
          </View>
          <Text style={styles.emptyText}>Nenhum scrap ativo</Text>
          <Text style={styles.emptySubtext}>Scraps desaparecem após 1 hora automaticamente</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => setText('Olá pessoal! 👋')}>
            <MaterialCommunityIcons name="plus" size={16} color="#16a34a" />
            <Text style={styles.emptyButtonText}>Criar primeiro scrap</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={Array.isArray(visible) ? visible : []}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.authorInitial}>{item.author[0]}</Text>
                </View>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardAuthor}>{item.author}</Text>
                  <View style={styles.timeRow}>
                    <MaterialCommunityIcons name="clock-outline" size={12} color="#16a34a" />
                    <Text style={styles.cardTime}> {new Date(item.createdAt).toLocaleTimeString()}</Text>
                    <Text style={styles.timeRemaining}> • {getTimeRemaining(item.createdAt)}</Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="heart-outline" size={16} color="#16a34a" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="share-variant" size={16} color="#16a34a" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.cardText}>{item.text}</Text>

              {/* Barra de progresso do tempo */}
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${((ONE_HOUR - (Date.now() - item.createdAt)) / ONE_HOUR) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  
  // Header
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  headerNotifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },
  statsLabel: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '500',
  },

  // Composer
  composerCard: { 
    backgroundColor: '#fff', 
    margin: 16, 
    borderRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  composerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  composerLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#111827', 
    marginLeft: 8 
  },
  composer: { 
    flexDirection: 'row', 
    alignItems: 'flex-end',
    padding: 16,
    gap: 12,
  },
  input: { 
    flex: 1, 
    backgroundColor: '#f9fafb', 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    fontSize: 15, 
    color: '#111827', 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    maxHeight: 100,
    minHeight: 44,
  },
  sendButton: { 
    backgroundColor: '#16a34a', 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  // Empty State
  empty: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 40 
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyText: { 
    fontSize: 18, 
    color: '#111827', 
    fontWeight: '700', 
    marginBottom: 8 
  },
  emptySubtext: { 
    fontSize: 14, 
    color: '#6b7280', 
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginLeft: 6,
  },

  // List
  listContent: { 
    padding: 16,
    paddingBottom: 32,
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  authorAvatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#dcfce7', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 12 
  },
  authorInitial: { 
    color: '#16a34a', 
    fontWeight: '700', 
    fontSize: 16 
  },
  cardMeta: { 
    flex: 1 
  },
  cardAuthor: { 
    fontWeight: '700', 
    fontSize: 15, 
    color: '#111827' 
  },
  timeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 2 
  },
  cardTime: { 
    color: '#6b7280', 
    fontSize: 12 
  },
  timeRemaining: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { 
    fontSize: 15, 
    color: '#374151', 
    lineHeight: 22,
    marginBottom: 12,
  },
  
  // Progress Bar
  progressContainer: {
    height: 3,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 2,
  },
});
