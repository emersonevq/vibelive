import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Slider,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextElement } from './types';

interface TextEditorProps {
  visible: boolean;
  text: TextElement;
  onConfirm: (text: TextElement) => void;
  onCancel: () => void;
}

const FONTS: Array<{ id: string; label: string; family: 'default' | 'bold' | 'italic' | 'serif' }> = [
  { id: 'default', label: 'Padrão', family: 'default' },
  { id: 'bold', label: 'Negrito', family: 'bold' },
  { id: 'italic', label: 'Itálico', family: 'italic' },
  { id: 'serif', label: 'Serif', family: 'serif' },
];

const COLORS = [
  '#ffffff',
  '#000000',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff6b6b',
  '#ffd93d',
  '#6bcf7f',
  '#4d96ff',
];

const ALIGNMENTS: Array<{ id: 'left' | 'center' | 'right'; icon: string; label: string }> = [
  { id: 'left', icon: 'format-align-left', label: 'Esquerda' },
  { id: 'center', icon: 'format-align-center', label: 'Centro' },
  { id: 'right', icon: 'format-align-right', label: 'Direita' },
];

export default function TextEditor({
  visible,
  text,
  onConfirm,
  onCancel,
}: TextEditorProps) {
  const [editedText, setEditedText] = useState(text.text);
  const [fontSize, setFontSize] = useState(text.fontSize);
  const [fontFamily, setFontFamily] = useState(text.fontFamily);
  const [color, setColor] = useState(text.color);
  const [backgroundColor, setBackgroundColor] = useState(text.backgroundColor || 'transparent');
  const [hasOutline, setHasOutline] = useState(text.hasOutline);
  const [outlineColor, setOutlineColor] = useState(text.outlineColor || '#000000');
  const [align, setAlign] = useState(text.align);
  const [rotation, setRotation] = useState(text.rotation);

  const handleConfirm = () => {
    const updatedText: TextElement = {
      ...text,
      text: editedText,
      fontSize,
      fontFamily,
      color,
      backgroundColor: backgroundColor === 'transparent' ? undefined : backgroundColor,
      hasOutline,
      outlineColor: hasOutline ? outlineColor : undefined,
      align,
      rotation,
    };
    onConfirm(updatedText);
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
            <Text style={styles.title}>Editar Texto</Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Text Input */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Texto</Text>
              <TextInput
                style={styles.textInput}
                value={editedText}
                onChangeText={setEditedText}
                multiline
                maxLength={100}
                placeholder="Digite seu texto"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Font Size */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Tamanho da Fonte</Text>
                <Text style={styles.sectionValue}>{Math.round(fontSize)}px</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={72}
                value={fontSize}
                onValueChange={setFontSize}
                step={1}
              />
            </View>

            {/* Font Family */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Fonte</Text>
              <View style={styles.fontGrid}>
                {FONTS.map((font) => (
                  <TouchableOpacity
                    key={font.id}
                    style={[
                      styles.fontButton,
                      fontFamily === font.family && styles.fontButtonActive,
                    ]}
                    onPress={() => setFontFamily(font.family)}
                  >
                    <Text
                      style={[
                        styles.fontButtonText,
                        {
                          fontWeight: font.family === 'bold' ? '700' : '400',
                          fontStyle: font.family === 'italic' ? 'italic' : 'normal',
                        },
                      ]}
                    >
                      {font.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Text Color */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Cor do Texto</Text>
              <View style={styles.colorGrid}>
                {COLORS.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.colorButton,
                      { backgroundColor: c },
                      color === c && styles.colorButtonActive,
                    ]}
                    onPress={() => setColor(c)}
                  >
                    {color === c && (
                      <MaterialCommunityIcons name="check" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Text Alignment */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Alinhamento</Text>
              <View style={styles.alignmentGrid}>
                {ALIGNMENTS.map((a) => (
                  <TouchableOpacity
                    key={a.id}
                    style={[
                      styles.alignmentButton,
                      align === a.id && styles.alignmentButtonActive,
                    ]}
                    onPress={() => setAlign(a.id)}
                  >
                    <MaterialCommunityIcons
                      name={a.icon}
                      size={20}
                      color={align === a.id ? '#fff' : '#16a34a'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
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

            {/* Background */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Fundo</Text>
              <View style={styles.colorGrid}>
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#d1d5db' },
                    backgroundColor === 'transparent' && styles.colorButtonActive,
                  ]}
                  onPress={() => setBackgroundColor('transparent')}
                >
                  {backgroundColor === 'transparent' && (
                    <MaterialCommunityIcons name="check" size={16} color="#111827" />
                  )}
                </TouchableOpacity>
                {COLORS.map((c) => (
                  <TouchableOpacity
                    key={`bg-${c}`}
                    style={[
                      styles.colorButton,
                      { backgroundColor: c },
                      backgroundColor === c && styles.colorButtonActive,
                    ]}
                    onPress={() => setBackgroundColor(c)}
                  >
                    {backgroundColor === c && (
                      <MaterialCommunityIcons name="check" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Outline */}
            <View style={styles.section}>
              <View style={styles.outlineHeader}>
                <Text style={styles.sectionLabel}>Contorno</Text>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    hasOutline && styles.toggleButtonActive,
                  ]}
                  onPress={() => setHasOutline(!hasOutline)}
                >
                  <MaterialCommunityIcons
                    name={hasOutline ? 'check' : 'plus'}
                    size={16}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              {hasOutline && (
                <View style={styles.colorGrid}>
                  {COLORS.map((c) => (
                    <TouchableOpacity
                      key={`outline-${c}`}
                      style={[
                        styles.colorButton,
                        { backgroundColor: c },
                        outlineColor === c && styles.colorButtonActive,
                      ]}
                      onPress={() => setOutlineColor(c)}
                    >
                      {outlineColor === c && (
                        <MaterialCommunityIcons name="check" size={16} color="#fff" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Preview */}
            <View style={styles.previewSection}>
              <Text style={styles.sectionLabel}>Prévia</Text>
              <View style={[
                styles.previewBox,
                {
                  backgroundColor: backgroundColor === 'transparent' ? '#f3f4f6' : backgroundColor,
                }
              ]}>
                <Text
                  style={{
                    fontSize,
                    color,
                    fontWeight: fontFamily === 'bold' ? '700' : '400',
                    fontStyle: fontFamily === 'italic' ? 'italic' : 'normal',
                    textAlign: align,
                    transform: [{ rotate: `${rotation}deg` }],
                  }}
                >
                  {editedText || 'Seu texto aqui'}
                </Text>
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
  section: {
    marginBottom: 20,
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
  textInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    maxHeight: 100,
  },
  slider: {
    height: 40,
  },
  fontGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  fontButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  fontButtonActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  fontButtonText: {
    fontSize: 13,
    color: '#111827',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: '#111827',
  },
  alignmentGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  alignmentButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  alignmentButtonActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  outlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#16a34a',
  },
  previewSection: {
    marginBottom: 20,
  },
  previewBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 20,
    minHeight: 100,
    justifyContent: 'center',
    marginTop: 8,
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
