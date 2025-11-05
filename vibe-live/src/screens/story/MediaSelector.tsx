import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MediaSelectorProps {
  visible: boolean;
  onMediaSelected: (uri: string) => void;
  onCancel: () => void;
  mediaType?: 'photo' | 'video' | 'all';
}

export default function MediaSelector({
  visible,
  onMediaSelected,
  onCancel,
  mediaType = 'photo',
}: MediaSelectorProps) {
  const [loading, setLoading] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Negada',
          'Você precisa conceder permissão de câmera para usar essa funcionalidade.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissão de câmera:', error);
      return false;
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Negada',
          'Você precisa conceder permissão de acesso à galeria.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissão de galeria:', error);
      return false;
    }
  };

  const handleCameraPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes:
          mediaType === 'all'
            ? ImagePicker.MediaTypeOptions.All
            : mediaType === 'video'
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        onMediaSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao capturar mídia:', error);
      Alert.alert('Erro', 'Não foi possível capturar a mídia');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryPress = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          mediaType === 'all'
            ? ImagePicker.MediaTypeOptions.All
            : mediaType === 'video'
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        onMediaSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar mídia:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a mídia');
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.title}>Selecionar Mídia</Text>
            <TouchableOpacity onPress={onCancel} disabled={loading}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={handleCameraPress}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="#16a34a" />
                ) : (
                  <MaterialCommunityIcons name="camera" size={48} color="#16a34a" />
                )}
              </View>
              <Text style={styles.optionText}>Câmera</Text>
              <Text style={styles.optionSubtext}>Tirar uma foto ou vídeo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={handleGalleryPress}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="#16a34a" />
                ) : (
                  <MaterialCommunityIcons name="image-multiple" size={48} color="#16a34a" />
                )}
              </View>
              <Text style={styles.optionText}>Galeria</Text>
              <Text style={styles.optionSubtext}>Selecionar da galeria</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  optionsContainer: {
    marginBottom: 24,
    gap: 16,
  },
  option: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  cancelButton: {
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
