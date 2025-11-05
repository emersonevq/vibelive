import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StoryCreator from '../story/StoryCreator';
import type { StoryComposition } from '../story/types';

type StoryItem = { id: string; name: string; avatarUrl?: string; hasStory: boolean; time: string; composition?: StoryComposition };

const STORIES: StoryItem[] = [
  { id: '1', name: 'Ana Silva', avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', hasStory: true, time: 'há 2 horas' },
  { id: '2', name: 'Julia Oliveira', avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg', hasStory: true, time: 'há 1 hora' },
  { id: '3', name: 'Mariana Costa', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', hasStory: true, time: 'há 3 horas' },
  { id: '4', name: 'Roberto Silva', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', hasStory: false, time: '' },
  { id: '5', name: 'Carlos Santos', avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg', hasStory: true, time: 'há 4 horas' },
];

export default function StoryScreen() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [creatorOpen, setCreatorOpen] = useState(false);

  const [stories, setStories] = useState<StoryItem[]>(STORIES);
  const currentStory = selectedStory ? stories.find(s => s.id === selectedStory) : null;
  const activeStories = useMemo(() => stories.filter(s => s.hasStory), [stories]);

  const handleNextStory = () => {
    const idx = stories.findIndex(s => s.id === selectedStory);
    if (idx < stories.length - 1) {
      setSelectedStory(stories[idx + 1].id);
    } else {
      setSelectedStory(null);
    }
  };

  const handlePrevStory = () => {
    const idx = stories.findIndex(s => s.id === selectedStory);
    if (idx > 0) {
      setSelectedStory(stories[idx - 1].id);
    }
  };

  const handleAddStory = () => {
    setCreatorOpen(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header moderno */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconContainer}>
            <MaterialCommunityIcons name="image" size={24} color="#16a34a" />
          </View>
          <View>
            <Text style={styles.title}>Stories</Text>
            <Text style={styles.subtitle}>Compartilhe momentos especiais</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddStory}>
          <MaterialCommunityIcons name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stories horizontais */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesRow}
        contentContainerStyle={styles.storiesContent}
      >
        {/* Seu story */}
        <TouchableOpacity style={styles.addStoryCard} onPress={handleAddStory}>
          <View style={styles.addStoryCircle}>
            <MaterialCommunityIcons name="plus" size={28} color="#16a34a" />
          </View>
          <Text style={styles.storyName}>Seu Story</Text>
          <Text style={styles.storyTimeSmall}>Toque para adicionar</Text>
        </TouchableOpacity>

        {/* Stories dos contatos */}
        {Array.isArray(stories) && stories.map((story) => (
          <TouchableOpacity 
            key={story.id} 
            style={styles.storyCard}
            onPress={() => story.hasStory && setSelectedStory(story.id)}
          >
            <View style={[styles.storyCircle, story.hasStory && styles.storyCircleActive]}>
              <Image source={{ uri: story.avatarUrl }} style={styles.storyAvatar} />
              {story.hasStory && <View style={styles.storyBadge} />}
              {!story.hasStory && <View style={styles.storyInactive} />}
            </View>
            <Text style={styles.storyName} numberOfLines={1}>{story.name.split(' ')[0]}</Text>
            {story.hasStory ? (
              <Text style={styles.storyTimeSmall}>{story.time}</Text>
            ) : (
              <Text style={styles.storyOffline}>Offline</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {!selectedStory ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons name="image-plus" size={64} color="#16a34a" />
            </View>
            <Text style={styles.emptyTitle}>Veja os stories dos seus amigos</Text>
            <Text style={styles.emptySubtitle}>Toque em um story ativo para assistir ou crie o seu próprio story</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleAddStory}>
              <MaterialCommunityIcons name="camera" size={16} color="#16a34a" />
              <Text style={styles.emptyButtonText}>Criar meu primeiro story</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Modal
            transparent={true}
            visible={!!selectedStory}
            onRequestClose={() => setSelectedStory(null)}
          >
            <View style={styles.storyModal}>
              {/* Barra de progresso */}
              <View style={styles.storyProgressBar}>
                {Array.isArray(stories) && stories.map((story, idx) => (
                  <View
                    key={story.id}
                    style={[
                      styles.progressSegment,
                      idx < stories.findIndex(s => s.id === selectedStory)
                        ? styles.progressSegmentFilled
                        : idx === stories.findIndex(s => s.id === selectedStory)
                        ? styles.progressSegmentActive
                        : styles.progressSegmentEmpty,
                      idx < stories.length - 1 && { marginRight: 4 },
                    ]}
                  />
                ))}
              </View>

              {/* Header do visualizador */}
              <View style={styles.storyViewerHeader}>
                <View style={styles.storyViewerHeaderLeft}>
                  <Image 
                    source={{ uri: currentStory?.avatarUrl }} 
                    style={styles.storySmallAvatar} 
                  />
                  <View>
                    <Text style={styles.storyAuthor}>{currentStory?.name}</Text>
                    <Text style={styles.storyTimestamp}>{currentStory?.time}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedStory(null)} style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Conteúdo do story */}
              {currentStory?.composition ? (
                <View style={[styles.storyFullImage, { backgroundColor: currentStory.composition.background.type === 'color' ? currentStory.composition.background.color : '#000' }]}>
                  {currentStory.composition.texts.map((t) => (
                    <Text key={t.id} style={{ position: 'absolute', left: `${t.x * 100}%`, top: `${t.y * 100}%`, color: t.color, fontSize: t.fontSize, fontFamily: t.fontFamily, transform: [{ rotate: `${t.rotation}deg` }, { scale: t.scale }] }}>
                      {t.text}
                    </Text>
                  ))}
                </View>
              ) : (
                <Image
                  source={{ uri: currentStory?.avatarUrl }}
                  style={styles.storyFullImage}
                />
              )}

              {/* Footer do visualizador */}
              <View style={styles.storyViewerFooter}>
                <TouchableOpacity style={styles.storyActionButton} onPress={handlePrevStory}>
                  <MaterialCommunityIcons name="chevron-left" size={28} color="#fff" />
                </TouchableOpacity>

                <View style={styles.storyActions}>
                  <TouchableOpacity style={styles.storyFooterButton}>
                    <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.storyFooterButton}>
                    <MaterialCommunityIcons name="send" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.storyFooterButton}>
                    <MaterialCommunityIcons name="share-variant" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.storyActionButton} onPress={handleNextStory}>
                  <MaterialCommunityIcons name="chevron-right" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>

      {/* Seção de estatísticas */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <MaterialCommunityIcons name="image-multiple" size={24} color="#16a34a" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statCount}>{activeStories.length}</Text>
            <Text style={styles.statLabel}>Stories Ativos</Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>Novo</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <MaterialCommunityIcons name="eye" size={24} color="#16a34a" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statCount}>143</Text>
            <Text style={styles.statLabel}>Visualizações</Text>
          </View>
          <View style={styles.statTrend}>
            <MaterialCommunityIcons name="trending-up" size={16} color="#16a34a" />
            <Text style={styles.statTrendText}>+12%</Text>
          </View>
        </View>
      </View>
      <StoryCreator
        visible={creatorOpen}
        onClose={() => setCreatorOpen(false)}
        onPublish={(comp) => {
          const me: StoryItem = { id: 'me', name: 'Você', avatarUrl: undefined, hasStory: true, time: 'agora', composition: comp };
          setStories((s) => [me, ...s]);
          setSelectedStory('me');
        }}
      />
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  // Stories Row
  storiesRow: { 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e5e7eb' 
  },
  storiesContent: { 
    paddingHorizontal: 16, 
    paddingVertical: 20,
    gap: 16,
  },
  addStoryCard: { 
    alignItems: 'center', 
    width: 80 
  },
  addStoryCircle: { 
    width: 72, 
    height: 72, 
    borderRadius: 36, 
    backgroundColor: '#dcfce7', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 2, 
    borderColor: '#16a34a', 
    marginBottom: 8,
    borderStyle: 'dashed',
  },
  storyCard: { 
    alignItems: 'center', 
    width: 80 
  },
  storyCircle: { 
    width: 72, 
    height: 72, 
    borderRadius: 36, 
    padding: 3, 
    marginBottom: 8, 
    position: 'relative' 
  },
  storyCircleActive: { 
    borderWidth: 3, 
    borderColor: '#16a34a',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  storyAvatar: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 33 
  },
  storyBadge: { 
    position: 'absolute', 
    bottom: 2, 
    right: 2, 
    width: 16, 
    height: 16, 
    borderRadius: 8, 
    backgroundColor: '#16a34a', 
    borderWidth: 2, 
    borderColor: '#fff' 
  },
  storyInactive: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#9ca3af',
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyName: { 
    fontSize: 12, 
    color: '#374151', 
    textAlign: 'center', 
    fontWeight: '600' 
  },
  storyTimeSmall: { 
    fontSize: 10, 
    color: '#16a34a', 
    marginTop: 2, 
    textAlign: 'center',
    fontWeight: '500',
  },
  storyOffline: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
    textAlign: 'center',
  },

  // Content
  content: { flex: 1 },
  emptyState: { 
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
  emptyTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#111827', 
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: { 
    fontSize: 15, 
    color: '#6b7280', 
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
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

  // Story Modal
  storyModal: { flex: 1, backgroundColor: '#000' },
  storyProgressBar: { 
    flexDirection: 'row', 
    paddingHorizontal: 8, 
    paddingVertical: 12,
    gap: 4,
  },
  progressSegment: { flex: 1, height: 3, borderRadius: 2 },
  progressSegmentFilled: { backgroundColor: '#16a34a' },
  progressSegmentActive: { backgroundColor: '#22c55e' },
  progressSegmentEmpty: { backgroundColor: 'rgba(255,255,255,0.3)' },

  storyViewerHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: 'rgba(0,0,0,0.4)' 
  },
  storyViewerHeaderLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  storySmallAvatar: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    marginRight: 12 
  },
  storyAuthor: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#fff' 
  },
  storyTimestamp: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.8)' 
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storyFullImage: { 
    flex: 1, 
    width: '100%', 
    resizeMode: 'cover' 
  },

  storyViewerFooter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 20, 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  storyActionButton: { 
    width: 44, 
    height: 44, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  storyActions: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12,
  },
  storyFooterButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(22,163,74,0.8)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  // Stats Section
  statsSection: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  statCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    padding: 16, 
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statInfo: { 
    flex: 1 
  },
  statCount: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#111827' 
  },
  statLabel: { 
    fontSize: 13, 
    color: '#6b7280', 
    marginTop: 2,
    fontWeight: '500',
  },
  statBadge: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statTrendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
    marginLeft: 4,
  },
});
