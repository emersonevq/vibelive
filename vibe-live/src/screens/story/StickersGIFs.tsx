import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StickerElement } from './types';

interface StickersGIFsProps {
  visible: boolean;
  onSelect: (sticker: StickerElement) => void;
  onCancel: () => void;
}

// Mock sticker/GIF data - in production, you'd fetch from Giphy or similar
const STICKERS = [
  { id: 'emoji-smile', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/1f60a.png', label: 'Sorriso' },
  { id: 'emoji-laugh', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/1f923.png', label: 'Riso' },
  { id: 'emoji-heart', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/2764.png', label: 'Coração' },
  { id: 'emoji-fire', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/1f525.png', label: 'Fogo' },
  { id: 'emoji-star', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/2b50.png', label: 'Estrela' },
  { id: 'emoji-party', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/1f389.png', label: 'Festa' },
  { id: 'emoji-cool', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/1f60e.png', label: 'Legal' },
  { id: 'emoji-wow', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource@14.0.0/img/apple/64/1f62e.png', label: 'Uau' },
];

export default function StickersGIFs({
  visible,
  onSelect,
  onCancel,
}: StickersGIFsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'stickers' | 'gifs'>('stickers');
  const [loading, setLoading] = useState(false);

  const filteredStickers = STICKERS.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSticker = (sticker: typeof STICKERS[0]) => {
    const stickerElement: StickerElement = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      stickerUrl: sticker.url,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
    };
    onSelect(stickerElement);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Adesivos & GIFs</Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'stickers' && styles.tabActive]}
              onPress={() => setActiveTab('stickers')}
            >
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={20}
                color={activeTab === 'stickers' ? '#fff' : '#16a34a'}
              />
              <Text style={[styles.tabLabel, activeTab === 'stickers' && styles.tabLabelActive]}>
                Adesivos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'gifs' && styles.tabActive]}
              onPress={() => setActiveTab('gifs')}
            >
              <MaterialCommunityIcons
                name="file-gif-box"
                size={20}
                color={activeTab === 'gifs' ? '#fff' : '#16a34a'}
              />
              <Text style={[styles.tabLabel, activeTab === 'gifs' && styles.tabLabelActive]}>
                GIFs
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar adesivos..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Stickers/GIFs Grid */}
          {activeTab === 'stickers' ? (
            <FlatList
              data={filteredStickers}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stickerItem}
                  onPress={() => handleSelectSticker(item)}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={styles.stickerImage}
                  />
                  <Text style={styles.stickerLabel}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              numColumns={4}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridRow}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons name="magnify" size={48} color="#9ca3af" />
                  <Text style={styles.emptyText}>Nenhum adesivo encontrado</Text>
                </View>
              }
            />
          ) : (
            <View style={styles.gifsContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#16a34a" />
              ) : (
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons name="file-gif-box" size={48} color="#9ca3af" />
                  <Text style={styles.emptyText}>GIFs em breve</Text>
                  <Text style={styles.emptySubtext}>Busca por GIFs do Giphy em desenvolvimento</Text>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 10,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#16a34a',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  tabLabelActive: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  gridRow: {
    gap: 8,
  },
  stickerItem: {
    flex: 1 / 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  stickerImage: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  stickerLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  gifsContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
});
