import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from '../components/MaterialIcon';

const STORIES = [
  { id: '1', name: 'Ana Silva', avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', hasStory: true, time: 'há 2 horas' },
  { id: '2', name: 'Julia Oliveira', avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg', hasStory: true, time: 'há 1 hora' },
  { id: '3', name: 'Mariana Costa', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', hasStory: true, time: 'há 3 horas' },
  { id: '4', name: 'Roberto Silva', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', hasStory: false, time: '' },
  { id: '5', name: 'Carlos Santos', avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg', hasStory: true, time: 'há 4 horas' },
];

export default function StoryScreen() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const currentStory = selectedStory ? STORIES.find(s => s.id === selectedStory) : null;

  const handleNextStory = () => {
    const currentIdx = STORIES.findIndex(s => s.id === selectedStory);
    if (currentIdx < STORIES.length - 1) {
      setSelectedStory(STORIES[currentIdx + 1].id);
    } else {
      setSelectedStory(null);
    }
  };

  const handlePrevStory = () => {
    const currentIdx = STORIES.findIndex(s => s.id === selectedStory);
    if (currentIdx > 0) {
      setSelectedStory(STORIES[currentIdx - 1].id);
    }
  };

  const handleAddStory = () => {
    Alert.alert('Adicionar Story', 'Selecione uma opção para criar seu story', [
      { text: 'Câmera', onPress: () => Alert.alert('Câmera', 'Abrir câmera') },
      { text: 'Galeria', onPress: () => Alert.alert('Galeria', 'Abrir galeria') },
      { text: 'Cancelar', onPress: () => {} },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcon name="image" size={24} color="#16a34a" />
        <Text style={styles.title}>Stories</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.storiesRow} 
        contentContainerStyle={styles.storiesContent}
      >
        <TouchableOpacity style={styles.addStoryCard} onPress={handleAddStory}>
          <View style={styles.addStoryCircle}>
            <MaterialIcon name="plus" size={32} color="#16a34a" />
          </View>
          <Text style={styles.storyName}>Seu Story</Text>
          <Text style={styles.storyTimeSmall}>Agora</Text>
        </TouchableOpacity>

        {STORIES.map((story) => (
          <TouchableOpacity 
            key={story.id} 
            style={styles.storyCard}
            onPress={() => story.hasStory && setSelectedStory(story.id)}
          >
            <View style={[styles.storyCircle, story.hasStory && styles.storyCircleActive]}>
              <Image source={{ uri: story.avatarUrl }} style={styles.storyAvatar} />
              {story.hasStory && <View style={styles.storyBadge} />}
            </View>
            <Text style={styles.storyName} numberOfLines={1}>{story.name.split(' ')[0]}</Text>
            {story.hasStory && <Text style={styles.storyTimeSmall}>{story.time}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.content}>
        {!selectedStory ? (
          <View style={styles.emptyState}>
            <MaterialIcon name="image-plus" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>Veja os stories dos seus amigos</Text>
            <Text style={styles.emptySubtitle}>Toque em um story para assistir</Text>
          </View>
        ) : (
          <Modal
            transparent={true}
            visible={!!selectedStory}
            onRequestClose={() => setSelectedStory(null)}
          >
            <View style={styles.storyModal}>
              <View style={styles.storyProgressBar}>
                {STORIES.map((story, idx) => (
                  <View
                    key={story.id}
                    style={[
                      styles.progressSegment,
                      idx < STORIES.findIndex(s => s.id === selectedStory)
                        ? styles.progressSegmentFilled
                        : idx === STORIES.findIndex(s => s.id === selectedStory)
                        ? styles.progressSegmentActive
                        : styles.progressSegmentEmpty,
                    ]}
                  />
                ))}
              </View>

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
                <TouchableOpacity onPress={() => setSelectedStory(null)}>
                  <MaterialIcon name="close" size={26} color="#fff" />
                </TouchableOpacity>
              </View>

              <Image 
                source={{ uri: currentStory?.avatarUrl }} 
                style={styles.storyFullImage} 
              />

              <View style={styles.storyViewerFooter}>
                <TouchableOpacity style={styles.storyActionButton} onPress={handlePrevStory}>
                  <MaterialIcon name="chevron-left" size={32} color="#fff" />
                </TouchableOpacity>

                <View style={styles.storyActions}>
                  <TouchableOpacity style={styles.storyFooterButton}>
                    <MaterialIcon name="heart-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.storyFooterButton}>
                    <MaterialIcon name="send" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.storyFooterButton}>
                    <MaterialIcon name="share-variant" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.storyActionButton} onPress={handleNextStory}>
                  <MaterialIcon name="chevron-right" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <MaterialIcon name="image-multiple" size={28} color="#16a34a" />
          <View style={styles.statInfo}>
            <Text style={styles.statCount}>{STORIES.filter(s => s.hasStory).length}</Text>
            <Text style={styles.statLabel}>Stories Ativos</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <MaterialIcon name="eye" size={28} color="#16a34a" />
          <View style={styles.statInfo}>
            <Text style={styles.statCount}>143</Text>
            <Text style={styles.statLabel}>Visualizações</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  title: { fontSize: 20, fontWeight: '700', color: '#111827', marginLeft: 10 },
  storiesRow: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  storiesContent: { paddingHorizontal: 12, paddingVertical: 16 },
  addStoryCard: { alignItems: 'center', marginRight: 16, width: 80 },
  addStoryCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#16a34a', marginBottom: 8 },
  storyCard: { alignItems: 'center', marginRight: 16, width: 80 },
  storyCircle: { width: 72, height: 72, borderRadius: 36, padding: 2, marginBottom: 8, position: 'relative' },
  storyCircleActive: { borderWidth: 3, borderColor: '#16a34a' },
  storyAvatar: { width: '100%', height: '100%', borderRadius: 33 },
  storyBadge: { position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderRadius: 8, backgroundColor: '#16a34a', borderWidth: 2, borderColor: '#fff' },
  storyName: { fontSize: 12, color: '#374151', textAlign: 'center', fontWeight: '500' },
  storyTimeSmall: { fontSize: 10, color: '#9ca3af', marginTop: 2, textAlign: 'center' },
  content: { flex: 1 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 12, marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  storyModal: { flex: 1, backgroundColor: '#000' },
  storyProgressBar: { flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 8, gap: 4 },
  progressSegment: { flex: 1, height: 3, borderRadius: 1.5 },
  progressSegmentFilled: { backgroundColor: '#16a34a' },
  progressSegmentActive: { backgroundColor: '#22c55e' },
  progressSegmentEmpty: { backgroundColor: 'rgba(255,255,255,0.3)' },

  storyViewerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.3)' },
  storyViewerHeaderLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  storySmallAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  storyAuthor: { fontSize: 15, fontWeight: '700', color: '#fff' },
  storyTimestamp: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },

  storyFullImage: { flex: 1, width: '100%', resizeMode: 'cover' },

  storyViewerFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'rgba(0,0,0,0.4)' },
  storyActionButton: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center' },
  storyActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  storyFooterButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(22,163,74,0.6)', alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 },

  statsSection: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb', gap: 10 },
  statCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', padding: 12, borderRadius: 10 },
  statInfo: { marginLeft: 12, flex: 1 },
  statCount: { fontSize: 16, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});
