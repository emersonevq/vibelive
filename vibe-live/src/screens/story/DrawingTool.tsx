import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  PanResponder,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawElement } from './types';

interface DrawingToolProps {
  visible: boolean;
  onConfirm: (elements: DrawElement[]) => void;
  onCancel: () => void;
}

type BrushType = 'normal' | 'marcador' | 'neon' | 'caneta';

interface DrawState {
  drawing: false;
  elements: DrawElement[];
  currentElement: DrawElement | null;
  history: DrawElement[][];
  historyIndex: number;
}

const COLORS = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff6b6b',
  '#ffd93d',
];

const BRUSH_TYPES: Array<{ id: BrushType; label: string; icon: string }> = [
  { id: 'normal', label: 'Normal', icon: 'pencil' },
  { id: 'marcador', label: 'Marcador', icon: 'marker' },
  { id: 'neon', label: 'Neon', icon: 'lightbulb' },
  { id: 'caneta', label: 'Caneta', icon: 'pen' },
];

export default function DrawingTool({
  visible,
  onConfirm,
  onCancel,
}: DrawingToolProps) {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(3);
  const [brushType, setBrushType] = useState<BrushType>('normal');
  const [opacity, setOpacity] = useState(1);
  const [elements, setElements] = useState<DrawElement[]>([]);
  const [history, setHistory] = useState<DrawElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<View>(null);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  const handleClear = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setElements([]);
  };

  const handleStartDrawing = () => {
    setIsDrawing(true);
  };

  const handleEndDrawing = () => {
    setIsDrawing(false);
    if (elements.length > 0) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push([...elements]);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleConfirm = () => {
    onConfirm(elements);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Desenhar</Text>
          <TouchableOpacity onPress={onCancel}>
            <MaterialCommunityIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Canvas Area */}
        <View
          style={styles.canvas}
          ref={canvasRef}
          onTouchStart={handleStartDrawing}
          onTouchEnd={handleEndDrawing}
        />

        {/* Drawing Tools */}
        <View style={styles.toolsPanel}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.toolsScroll}
          >
            {/* Brush Type Selector */}
            <View style={styles.toolSection}>
              <Text style={styles.toolSectionLabel}>Pincel</Text>
              <View style={styles.buttonRow}>
                {BRUSH_TYPES.map((brush) => (
                  <TouchableOpacity
                    key={brush.id}
                    style={[
                      styles.toolButton,
                      brushType === brush.id && styles.toolButtonActive,
                    ]}
                    onPress={() => setBrushType(brush.id)}
                  >
                    <MaterialCommunityIcons
                      name={brush.icon}
                      size={20}
                      color={brushType === brush.id ? '#fff' : '#16a34a'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Color Selector */}
            <View style={styles.toolSection}>
              <Text style={styles.toolSectionLabel}>Cor</Text>
              <View style={styles.colorRow}>
                {COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color },
                      brushColor === color && styles.colorButtonActive,
                    ]}
                    onPress={() => setBrushColor(color)}
                  />
                ))}
              </View>
            </View>

            {/* Brush Width */}
            <View style={styles.toolSection}>
              <Text style={styles.toolSectionLabel}>Tamanho: {brushWidth}px</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => setBrushWidth(Math.max(1, brushWidth - 1))}
                >
                  <MaterialCommunityIcons name="minus" size={20} color="#16a34a" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => setBrushWidth(Math.min(20, brushWidth + 1))}
                >
                  <MaterialCommunityIcons name="plus" size={20} color="#16a34a" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Opacity */}
            <View style={styles.toolSection}>
              <Text style={styles.toolSectionLabel}>Opacidade: {Math.round(opacity * 100)}%</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => setOpacity(Math.max(0.1, opacity - 0.1))}
                >
                  <MaterialCommunityIcons name="minus" size={20} color="#16a34a" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => setOpacity(Math.min(1, opacity + 0.1))}
                >
                  <MaterialCommunityIcons name="plus" size={20} color="#16a34a" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.toolSection}>
              <Text style={styles.toolSectionLabel}>Ações</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={handleUndo}
                  disabled={historyIndex === 0}
                >
                  <MaterialCommunityIcons
                    name="undo"
                    size={20}
                    color={historyIndex === 0 ? '#ccc' : '#16a34a'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={handleRedo}
                  disabled={historyIndex === history.length - 1}
                >
                  <MaterialCommunityIcons
                    name="redo"
                    size={20}
                    color={historyIndex === history.length - 1 ? '#ccc' : '#16a34a'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={handleClear}
                >
                  <MaterialCommunityIcons name="trash-can" size={20} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Footer Buttons */}
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  toolsPanel: {
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingVertical: 12,
  },
  toolsScroll: {
    paddingHorizontal: 12,
  },
  toolSection: {
    marginRight: 24,
    paddingHorizontal: 8,
  },
  toolSectionLabel: {
    color: '#d1d5db',
    fontSize: 11,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 6,
  },
  toolButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonActive: {
    backgroundColor: '#16a34a',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
