import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Slider,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Crop as CropType } from './types';

interface CropProps {
  visible: boolean;
  imageUri: string;
  initialCrop?: CropType;
  onConfirm: (crop: CropType) => void;
  onCancel: () => void;
}

type AspectRatio = 'square' | '16:9' | '4:3' | '1:1' | 'free';

const ASPECT_RATIOS: Array<{ id: AspectRatio; label: string; icon: string }> = [
  { id: '1:1', label: 'Quadrado', icon: 'aspect-ratio' },
  { id: '16:9', label: '16:9', icon: 'aspect-ratio-wide' },
  { id: '4:3', label: '4:3', icon: 'aspect-ratio' },
  { id: 'square', label: 'Quadrado', icon: 'square' },
  { id: 'free', label: 'Livre', icon: 'crop-free' },
];

export default function Crop({
  visible,
  imageUri,
  initialCrop,
  onConfirm,
  onCancel,
}: CropProps) {
  const [ratio, setRatio] = useState<AspectRatio>(initialCrop?.ratio || 'square');
  const [zoom, setZoom] = useState(initialCrop?.zoom || 1);
  const [rotation, setRotation] = useState(initialCrop?.rotation || 0);
  const [flipHorizontal, setFlipHorizontal] = useState(
    initialCrop?.flipHorizontal || false
  );
  const [flipVertical, setFlipVertical] = useState(
    initialCrop?.flipVertical || false
  );

  const handleConfirm = () => {
    const crop: CropType = {
      ratio,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      zoom,
      rotation,
      flipHorizontal,
      flipVertical,
    };
    onConfirm(crop);
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
            <Text style={styles.title}>Cortar e Ajustar</Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Preview */}
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: imageUri }}
              style={[
                styles.previewImage,
                {
                  transform: [
                    { rotate: `${rotation}deg` },
                    { scaleX: flipHorizontal ? -1 : 1 },
                    { scaleY: flipVertical ? -1 : 1 },
                  ],
                  width: `${zoom * 100}%`,
                  height: `${zoom * 100}%`,
                },
              ]}
            />
          </View>

          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Aspect Ratio */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Proporção</Text>
              <View style={styles.ratioGrid}>
                {ASPECT_RATIOS.map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    style={[
                      styles.ratioButton,
                      ratio === r.id && styles.ratioButtonActive,
                    ]}
                    onPress={() => setRatio(r.id)}
                  >
                    <MaterialCommunityIcons
                      name={r.icon}
                      size={20}
                      color={ratio === r.id ? '#fff' : '#16a34a'}
                    />
                    <Text
                      style={[
                        styles.ratioLabel,
                        ratio === r.id && styles.ratioLabelActive,
                      ]}
                    >
                      {r.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Zoom */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Zoom</Text>
                <Text style={styles.sectionValue}>{Math.round(zoom * 100)}%</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={3}
                value={zoom}
                onValueChange={setZoom}
                step={0.1}
              />
            </View>

            {/* Rotation */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Rotação</Text>
                <Text style={styles.sectionValue}>{Math.round(rotation)}°</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={360}
                value={rotation}
                onValueChange={setRotation}
                step={5}
              />
            </View>

            {/* Flip Controls */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Espelhar</Text>
              <View style={styles.flipButtons}>
                <TouchableOpacity
                  style={[
                    styles.flipButton,
                    flipHorizontal && styles.flipButtonActive,
                  ]}
                  onPress={() => setFlipHorizontal(!flipHorizontal)}
                >
                  <MaterialCommunityIcons
                    name="flip-horizontal"
                    size={20}
                    color={flipHorizontal ? '#fff' : '#16a34a'}
                  />
                  <Text
                    style={[
                      styles.flipLabel,
                      flipHorizontal && styles.flipLabelActive,
                    ]}
                  >
                    Horizontal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.flipButton,
                    flipVertical && styles.flipButtonActive,
                  ]}
                  onPress={() => setFlipVertical(!flipVertical)}
                >
                  <MaterialCommunityIcons
                    name="flip-vertical"
                    size={20}
                    color={flipVertical ? '#fff' : '#16a34a'}
                  />
                  <Text
                    style={[
                      styles.flipLabel,
                      flipVertical && styles.flipLabelActive,
                    ]}
                  >
                    Vertical
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
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
    maxHeight: '90%',
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
  previewContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    resizeMode: 'cover',
  },
  optionsContainer: {
    marginBottom: 16,
    maxHeight: 300,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  sectionValue: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '600',
  },
  slider: {
    height: 40,
  },
  ratioGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  ratioButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  ratioButtonActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  ratioLabel: {
    fontSize: 11,
    color: '#111827',
  },
  ratioLabelActive: {
    color: '#16a34a',
    fontWeight: '600',
  },
  flipButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  flipButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  flipButtonActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  flipLabel: {
    fontSize: 11,
    color: '#111827',
  },
  flipLabelActive: {
    color: '#16a34a',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
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
  confirmButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
