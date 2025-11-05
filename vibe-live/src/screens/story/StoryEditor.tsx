import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrivacySettings, StoryElement, StoryDraft, TextElement } from './types';
import PrivacySelector from './PrivacySelector';
import TextEditor from './TextEditor';

interface StoryEditorProps {
  imageUri: string;
  onPublish: (draft: StoryDraft) => void;
  onCancel: () => void;
}

export default function StoryEditor({
  imageUri,
  onPublish,
  onCancel,
}: StoryEditorProps) {
  const [elements, setElements] = useState<StoryElement[]>([]);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    audience: 'amigos',
    allowReplies: true,
    allowSharing: true,
  });
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [duration, setDuration] = useState(5);
  const [textEditorVisible, setTextEditorVisible] = useState(false);
  const [selectedText, setSelectedText] = useState<TextElement | null>(null);

  const handleAddText = () => {
    if (textInput.trim()) {
      const newElement: TextElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        text: textInput,
        x: 0,
        y: 0,
        rotation: 0,
        fontSize: 32,
        fontFamily: 'default',
        color: '#ffffff',
        hasOutline: false,
        align: 'center',
      };
      setSelectedText(newElement);
      setTextInput('');
      setTextModalVisible(false);
      setTextEditorVisible(true);
    }
  };

  const handleEditText = (textElement: TextElement) => {
    setSelectedText(textElement);
    setTextEditorVisible(true);
  };

  const handleConfirmTextEdit = (editedText: TextElement) => {
    const updatedElements = elements.map((el) =>
      el.id === editedText.id ? editedText : el
    );
    if (!elements.some((el) => el.id === editedText.id)) {
      updatedElements.push(editedText);
    }
    setElements(updatedElements);
    setTextEditorVisible(false);
    setSelectedText(null);
  };

  const handleDeleteText = (textId: string) => {
    setElements(elements.filter((el) => el.id !== textId));
  };

  const handlePublish = () => {
    const draft: StoryDraft = {
      id: `story-${Date.now()}`,
      imageUri,
      elements,
      privacy,
      duration,
      createdAt: new Date(),
      lastModified: new Date(),
    };
    onPublish(draft);
  };

  return (
    <View style={styles.container}>
      {/* Preview da imagem com elementos */}
      <View style={styles.previewContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        {elements.length > 0 && (
          <View style={styles.elementsOverlay}>
            {elements.map((element) => {
              if (element.type === 'text') {
                const textEl = element as TextElement;
                return (
                  <TouchableOpacity
                    key={element.id}
                    style={[
                      styles.textElementPreview,
                      {
                        transform: [{ rotate: `${textEl.rotation}deg` }],
                        left: textEl.x,
                        top: textEl.y,
                        backgroundColor: textEl.backgroundColor || 'transparent',
                      },
                    ]}
                    onPress={() => handleEditText(textEl)}
                    onLongPress={() => handleDeleteText(textEl.id)}
                  >
                    <Text
                      style={{
                        fontSize: textEl.fontSize,
                        color: textEl.color,
                        fontWeight:
                          textEl.fontFamily === 'bold'
                            ? '700'
                            : textEl.fontFamily === 'italic'
                            ? '400'
                            : '400',
                        fontStyle:
                          textEl.fontFamily === 'italic' ? 'italic' : 'normal',
                        textAlign: textEl.align,
                      }}
                    >
                      {textEl.text}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>
        )}
      </View>

      {/* Toolbar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolbar}
        contentContainerStyle={styles.toolbarContent}
      >
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => setTextModalVisible(true)}
        >
          <MaterialCommunityIcons name="format-text" size={24} color="#16a34a" />
          <Text style={styles.toolButtonLabel}>Texto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          disabled
        >
          <MaterialCommunityIcons name="pencil" size={24} color="#ccc" />
          <Text style={styles.toolButtonLabel}>Desenhar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          disabled
        >
          <MaterialCommunityIcons name="sticker-emoji" size={24} color="#ccc" />
          <Text style={styles.toolButtonLabel}>Adesivos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          disabled
        >
          <MaterialCommunityIcons name="palette" size={24} color="#ccc" />
          <Text style={styles.toolButtonLabel}>Filtros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          disabled
        >
          <MaterialCommunityIcons name="crop" size={24} color="#ccc" />
          <Text style={styles.toolButtonLabel}>Cortar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Duração: {duration}s</Text>
          <View style={styles.durationButtons}>
            <TouchableOpacity
              onPress={() => setDuration(Math.max(1, duration - 1))}
              style={styles.durationButton}
            >
              <MaterialCommunityIcons name="minus" size={16} color="#16a34a" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDuration(Math.min(60, duration + 1))}
              style={styles.durationButton}
            >
              <MaterialCommunityIcons name="plus" size={16} color="#16a34a" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.privacyButton}
          onPress={() => setPrivacyVisible(true)}
        >
          <MaterialCommunityIcons name="lock" size={16} color="#fff" />
          <Text style={styles.privacyButtonText}>Privacidade</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <MaterialCommunityIcons name="send" size={18} color="#fff" />
          <Text style={styles.publishButtonText}>Adicionar ao story</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Selector Modal */}
      <PrivacySelector
        visible={privacyVisible}
        onConfirm={(newPrivacy) => {
          setPrivacy(newPrivacy);
          setPrivacyVisible(false);
        }}
        onCancel={() => setPrivacyVisible(false)}
        initialSettings={privacy}
      />

      {/* Text Input Modal */}
      <Modal
        visible={textModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTextModalVisible(false)}
      >
        <View style={styles.textModalContainer}>
          <View style={styles.textModalOverlay} />
          <View style={styles.textModalContent}>
            <View style={styles.textModalHeader}>
              <Text style={styles.textModalTitle}>Adicionar Texto</Text>
              <TouchableOpacity
                onPress={() => setTextModalVisible(false)}
              >
                <MaterialCommunityIcons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.textModalInput}
              placeholder="Digite seu texto"
              placeholderTextColor="#9ca3af"
              value={textInput}
              onChangeText={setTextInput}
              multiline
              maxLength={100}
            />

            <View style={styles.textModalFooter}>
              <TouchableOpacity
                style={styles.textModalCancelButton}
                onPress={() => setTextModalVisible(false)}
              >
                <Text style={styles.textModalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textModalAddButton}
                onPress={handleAddText}
              >
                <Text style={styles.textModalAddButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Text Editor Modal */}
      {selectedText && (
        <TextEditor
          visible={textEditorVisible}
          text={selectedText}
          onConfirm={handleConfirmTextEdit}
          onCancel={() => {
            setTextEditorVisible(false);
            setSelectedText(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  elementsOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textElementPreview: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  toolbar: {
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  toolbarContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  toolButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#374151',
    opacity: 1,
  },
  toolButtonLabel: {
    fontSize: 11,
    color: '#d1d5db',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    alignItems: 'center',
  },
  durationLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  durationButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  privacyButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  publishButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  publishButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  textModalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  textModalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  textModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  textModalInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    maxHeight: 120,
    marginBottom: 16,
  },
  textModalFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  textModalCancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  textModalCancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  textModalAddButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  textModalAddButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
