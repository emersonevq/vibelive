import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FilterType, FilterConfig } from './types';

interface FiltersProps {
  visible: boolean;
  imageUri: string;
  currentFilter: FilterType;
  onConfirm: (filter: FilterType, config: FilterConfig) => void;
  onCancel: () => void;
}

const FILTERS: Array<{ id: FilterType; label: string; icon: string; config: FilterConfig }> = [
  { 
    id: 'original', 
    label: 'Original', 
    icon: 'image',
    config: {},
  },
  {
    id: 'vintage',
    label: 'Vintage',
    icon: 'image-filter-vintage',
    config: { sepia: 0.4, saturation: 0.7, brightness: 0.9 },
  },
  {
    id: 'pb',
    label: 'P&B',
    icon: 'image-filter-black-white',
    config: { grayscale: 1 },
  },
  {
    id: 'sepia',
    label: 'Sépia',
    icon: 'image-filter-sepia',
    config: { sepia: 1, saturation: 0.8 },
  },
  {
    id: 'vibrante',
    label: 'Vibrante',
    icon: 'brightness-7',
    config: { saturation: 1.5, contrast: 1.2 },
  },
  {
    id: 'frio',
    label: 'Frio',
    icon: 'snowflake',
    config: { hue: -30, saturation: 0.9, brightness: 1.1 },
  },
  {
    id: 'quente',
    label: 'Quente',
    icon: 'fire',
    config: { hue: 30, saturation: 0.8, brightness: 1.15 },
  },
  {
    id: 'desbotado',
    label: 'Desbotado',
    icon: 'image-filter-hdr-off',
    config: { saturation: 0.5, contrast: 0.8, brightness: 1.05 },
  },
  {
    id: 'dramatico',
    label: 'Dramático',
    icon: 'theater',
    config: { contrast: 1.5, saturation: 0.9, brightness: 0.9 },
  },
  {
    id: 'retro',
    label: 'Retrô',
    icon: 'image-filter-vintage',
    config: { sepia: 0.7, saturation: 0.6, contrast: 1.1, brightness: 0.95 },
  },
];

export default function Filters({
  visible,
  imageUri,
  currentFilter,
  onConfirm,
  onCancel,
}: FiltersProps) {
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
            <Text style={styles.title}>Filtros</Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.filterGrid}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.filterGridContent}
          >
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterCard,
                  currentFilter === filter.id && styles.filterCardActive,
                ]}
                onPress={() => onConfirm(filter.id, filter.config)}
              >
                <View style={styles.filterPreview}>
                  <Image
                    source={{ uri: imageUri }}
                    style={[
                      styles.filterImage,
                      {
                        opacity: filter.config.opacity ?? 1,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.filterOverlay,
                      {
                        backgroundColor: `rgba(0, 0, 0, ${(1 - (filter.config.brightness ?? 1)) * 0.3})`,
                      },
                    ]}
                  />
                </View>
                <View style={styles.filterInfo}>
                  <MaterialCommunityIcons
                    name={filter.icon}
                    size={20}
                    color={currentFilter === filter.id ? '#fff' : '#16a34a'}
                  />
                  <Text
                    style={[
                      styles.filterLabel,
                      currentFilter === filter.id && styles.filterLabelActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
  filterGrid: {
    marginBottom: 16,
  },
  filterGridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  filterCardActive: {
    borderColor: '#16a34a',
    borderWidth: 2,
  },
  filterPreview: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    backgroundColor: '#e5e7eb',
  },
  filterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  filterInfo: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 6,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  filterLabelActive: {
    color: '#16a34a',
  },
  footer: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
});
