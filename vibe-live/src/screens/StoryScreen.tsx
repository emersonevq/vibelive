import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from '../components/MaterialIcon';

const STORIES = [
  { id: '1', name: 'Ana Silva', avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', hasStory: true },
  { id: '2', name: 'Julia Oliveira', avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg', hasStory: true },
  { id: '3', name: 'Mariana Costa', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', hasStory: true },
  { id: '4', name: 'Roberto Silva', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', hasStory: false },
  { id: '5', name: 'Carlos Santos', avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg', hasStory: true },
];

export default function StoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcon name="image" size={24} color="#2563EB" />
        <Text style={styles.title}>Stories</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.storiesRow} 
        contentContainerStyle={styles.storiesContent}
      >
        <TouchableOpacity style={styles.addStoryCard}>
          <View style={styles.addStoryCircle}>
            <MaterialIcon name="plus" size={32} color="#2563EB" />
          </View>
          <Text style={styles.storyName}>Seu Story</Text>
        </TouchableOpacity>

        {STORIES.map((story) => (
          <TouchableOpacity key={story.id} style={styles.storyCard}>
            <View style={[styles.storyCircle, story.hasStory && styles.storyCircleActive]}>
              <Image source={{ uri: story.avatarUrl }} style={styles.storyAvatar} />
              {story.hasStory && <View style={styles.storyBadge} />}
            </View>
            <Text style={styles.storyName} numberOfLines={1}>{story.name.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.content}>
        {false ? (
          <View style={styles.emptyState}>
            <MaterialIcon name="star" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>Nenhum story recente</Text>
            <Text style={styles.emptySubtitle}>Compartilhe momentos com seus amigos</Text>
          </View>
        ) : (
          <View style={styles.storiesFeed}>
            <View style={styles.storyItem}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }} 
                style={styles.storyImage} 
              />
              <View style={styles.storyOverlay}>
                <View style={styles.storyHeader}>
                  <View style={styles.storyHeaderLeft}>
                    <Image 
                      source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }} 
                      style={styles.storySmallAvatar} 
                    />
                    <View>
                      <Text style={styles.storyAuthor}>Ana Silva</Text>
                      <Text style={styles.storyTimestamp}>há 2 horas</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <MaterialIcon name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
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
  addStoryCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#2563EB', marginBottom: 8 },
  storyCard: { alignItems: 'center', marginRight: 16, width: 80 },
  storyCircle: { width: 72, height: 72, borderRadius: 36, padding: 2, marginBottom: 8, position: 'relative' },
  storyCircleActive: { borderWidth: 3, borderColor: '#f97316' },
  storyAvatar: { width: '100%', height: '100%', borderRadius: 33 },
  storyBadge: { position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderRadius: 8, backgroundColor: '#f97316', borderWidth: 2, borderColor: '#fff' },
  storyName: { fontSize: 12, color: '#374151', textAlign: 'center', fontWeight: '500' },
  content: { flex: 1 },
  storiesFeed: { flex: 1 },
  storyItem: { flex: 1, position: 'relative', overflow: 'hidden' },
  storyImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  storyOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)' },
  storyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.3)' },
  storyHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  storySmallAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  storyAuthor: { fontSize: 14, fontWeight: '700', color: '#fff' },
  storyTimestamp: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 12, marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
});
