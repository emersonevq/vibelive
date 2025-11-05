import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrivacySettings, PrivacyAudience } from './types';

interface PrivacySelectorProps {
  visible: boolean;
  onConfirm: (settings: PrivacySettings) => void;
  onCancel: () => void;
  initialSettings?: PrivacySettings;
}

const AUDIENCE_OPTIONS: Array<{ id: PrivacyAudience; label: string; icon: string; description: string }> = [
  { id: 'todos', label: 'Todos', icon: 'globe', description: 'Público para todos' },
  { id: 'amigos', label: 'Amigos', icon: 'account-multiple', description: 'Apenas seus amigos' },
  { id: 'amigos_proximos', label: 'Amigos próximos', icon: 'heart-multiple', description: 'Seu círculo íntimo' },
  { id: 'amigos_exceto', label: 'Amigos exceto...', icon: 'account-remove', description: 'Todos exceto alguns' },
  { id: 'apenas', label: 'Apenas...', icon: 'account', description: 'Pessoas específicas' },
];

export default function PrivacySelector({
  visible,
  onConfirm,
  onCancel,
  initialSettings,
}: PrivacySelectorProps) {
  const [selectedAudience, setSelectedAudience] = useState<PrivacyAudience>(
    initialSettings?.audience || 'amigos'
  );
  const [allowReplies, setAllowReplies] = useState(
    initialSettings?.allowReplies ?? true
  );
  const [allowSharing, setAllowSharing] = useState(
    initialSettings?.allowSharing ?? true
  );

  const handleConfirm = () => {
    onConfirm({
      audience: selectedAudience,
      allowReplies,
      allowSharing,
    });
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
            <Text style={styles.title}>Quem pode ver</Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {AUDIENCE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.audienceOption,
                  selectedAudience === option.id && styles.audienceOptionActive,
                ]}
                onPress={() => setSelectedAudience(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.optionIcon,
                      selectedAudience === option.id && styles.optionIconActive,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={option.icon}
                      size={24}
                      color={selectedAudience === option.id ? '#fff' : '#16a34a'}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedAudience === option.id && styles.radioButtonActive,
                  ]}
                >
                  {selectedAudience === option.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons name="reply" size={20} color="#16a34a" />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Permitir respostas</Text>
                  <Text style={styles.settingDescription}>
                    Deixar que outros respondam ao seu story
                  </Text>
                </View>
              </View>
              <Switch
                value={allowReplies}
                onValueChange={setAllowReplies}
                trackColor={{ false: '#e5e7eb', true: '#a8e6c9' }}
                thumbColor={allowReplies ? '#16a34a' : '#9ca3af'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons name="share-variant" size={20} color="#16a34a" />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Permitir compartilhamento</Text>
                  <Text style={styles.settingDescription}>
                    Deixar que compartilhem seu story
                  </Text>
                </View>
              </View>
              <Switch
                value={allowSharing}
                onValueChange={setAllowSharing}
                trackColor={{ false: '#e5e7eb', true: '#a8e6c9' }}
                thumbColor={allowSharing ? '#16a34a' : '#9ca3af'}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.7}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  audienceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  audienceOptionActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionIconActive: {
    backgroundColor: '#16a34a',
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  optionDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioButtonActive: {
    borderColor: '#16a34a',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#16a34a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
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
