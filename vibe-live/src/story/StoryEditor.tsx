import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, PanResponder, GestureResponderEvent, PanResponderGestureState, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { captureRef } from 'react-native-view-shot';
import type { Background, StoryComposition, TextItem, Stroke, Privacy } from './types';
import PrivacySelector from './ui/PrivacySelector';
import { v4 as uuidv4 } from 'uuid';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface Props {
  initialBackground: Background;
  onClose: () => void;
  onPublish: (story: StoryComposition) => void;
}

type Tool = 'text' | 'draw' | 'none';

const FONT_OPTIONS = [
  // Cross-platform safe-ish fonts
  'System',
  'sans-serif',
  'serif',
  'monospace',
  'Helvetica',
];

const COLORS = ['#ffffff', '#e2e8f0', '#fca5a5', '#fcd34d', '#86efac', '#93c5fd', '#c4b5fd', '#f9fafb', '#111827'];

export default function StoryEditor({ initialBackground, onClose, onPublish }: Props) {
  const [background, setBackground] = useState<Background>(initialBackground);
  const [activeTool, setActiveTool] = useState<Tool>('text');
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [undone, setUndone] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0]);
  const [fontSize, setFontSize] = useState(28);
  const [textColor, setTextColor] = useState('#ffffff');
  const [align, setAlign] = useState<'left'|'center'|'right'>('center');
  const [bgStyle, setBgStyle] = useState<'none'|'solid'|'semi'>('none');
  const [strokeColor, setStrokeColor] = useState<string | undefined>(undefined);

  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushWidth, setBrushWidth] = useState(4);
  const [brushOpacity, setBrushOpacity] = useState(1);

  const [privacy, setPrivacy] = useState<Privacy>('todos');
  const [allowShare, setAllowShare] = useState(true);
  const [allowReplies, setAllowReplies] = useState(true);

  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  const captureViewRef = useRef<View>(null);

  const addTextBox = () => {
    const newItem: TextItem = {
      id: uuidv4(),
      text: 'Seu texto',
      color: textColor,
      fontFamily,
      fontSize,
      align,
      bgStyle,
      strokeColor,
      x: 0.5,
      y: 0.5,
      rotation: 0,
      scale: 1,
    };
    setTexts((t) => [...t, newItem]);
  };

  const updateText = (id: string, patch: Partial<TextItem>) => {
    setTexts((t) => t.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const removeText = (id: string) => setTexts((t) => t.filter((x) => x.id !== id));

  const panHandlersById = useMemo(() => {
    const handlers: Record<string, any> = {};
    texts.forEach((it) => {
      let last = { x: 0, y: 0 };
      handlers[it.id] = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (_e, _g) => {
          last = { x: it.x, y: it.y };
        },
        onPanResponderMove: (e: GestureResponderEvent, g: PanResponderGestureState) => {
          const nx = last.x + g.dx / SCREEN_W;
          const ny = last.y + g.dy / SCREEN_H;
          updateText(it.id, { x: Math.min(1, Math.max(0, nx)), y: Math.min(1, Math.max(0, ny)) });
        },
      });
    });
    return handlers;
  }, [texts]);

  const drawResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => activeTool === 'draw',
      onMoveShouldSetPanResponder: () => activeTool === 'draw',
      onPanResponderGrant: (e) => {
        if (activeTool !== 'draw') return;
        const { locationX, locationY } = e.nativeEvent;
        const stroke: Stroke = {
          id: uuidv4(),
          color: brushColor,
          width: brushWidth,
          opacity: brushOpacity,
          points: [{ x: locationX / SCREEN_W, y: locationY / SCREEN_H }],
        };
        setCurrentStroke(stroke);
        setStrokes((s) => [...s, stroke]);
        setUndone([]);
      },
      onPanResponderMove: (e) => {
        if (!currentStroke) return;
        const { locationX, locationY } = e.nativeEvent;
        setStrokes((s) =>
          s.map((st) =>
            st.id === currentStroke.id
              ? { ...st, points: [...st.points, { x: locationX / SCREEN_W, y: locationY / SCREEN_H }] }
              : st
          )
        );
      },
      onPanResponderRelease: () => setCurrentStroke(null),
    })
  ).current;

  const publish = async () => {
    const composition: StoryComposition = {
      background,
      texts,
      strokes,
      privacy,
      allowShare,
      allowReplies,
    } as StoryComposition & { exportUri?: string };
    try {
      if (captureViewRef.current) {
        const uri = await captureRef(captureViewRef, { format: 'png', quality: 1 });
        (composition as any).exportUri = uri;
      }
    } catch {}
    onPublish(composition);
  };

  return (
    <View style={styles.container}>
      <View style={styles.captureArea} ref={captureViewRef}>
        {/* Background */}
        {background.type === 'color' && (
          <View style={[styles.bgFill, { backgroundColor: background.color }]} />
        )}
        {background.type === 'image' && (
          <Image source={{ uri: background.uri }} style={[styles.bgFill as any]} resizeMode="cover" />
        )}
        {background.type === 'video' && (
          <Video source={{ uri: background.uri }} style={[styles.bgFill as any]} resizeMode="cover" shouldPlay isMuted />
        )}

        {/* Draw layer */}
        <View style={styles.drawLayer} {...drawResponder.panHandlers}>
          {strokes.map((st) => (
            <View key={st.id} style={StyleSheet.absoluteFill} pointerEvents="none">
              {st.points.map((p, idx) => (
                <View
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: p.x * SCREEN_W - st.width / 2,
                    top: p.y * SCREEN_H - st.width / 2,
                    width: st.width,
                    height: st.width,
                    borderRadius: st.width / 2,
                    backgroundColor: st.color,
                    opacity: st.opacity,
                  }}
                />
              ))}
            </View>
          ))}
        </View>

        {/* Text items */}
        {texts.map((it) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={it.id}
            onLongPress={() => setSelectedTextId(it.id)}
            style={{ position: 'absolute', left: it.x * SCREEN_W, top: it.y * SCREEN_H }}
            {...panHandlersById[it.id]?.panHandlers}
          >
            <Text
              style={{
                color: it.color,
                fontSize: it.fontSize,
                textAlign: it.align as any,
                fontFamily: it.fontFamily,
                transform: [{ rotate: `${it.rotation}deg` }, { scale: it.scale }],
                backgroundColor: it.bgStyle === 'solid' ? 'rgba(0,0,0,0.7)' : it.bgStyle === 'semi' ? 'rgba(0,0,0,0.3)' : 'transparent',
                paddingHorizontal: it.bgStyle === 'none' ? 0 : 6,
                paddingVertical: it.bgStyle === 'none' ? 0 : 2,
                includeFontPadding: false,
                borderWidth: selectedTextId === it.id ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.8)'
              }}
            >
              {it.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity accessibilityLabel="Fechar" onPress={onClose} style={styles.topBtn}>
          <MaterialCommunityIcons name="close" color="#fff" size={22} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity accessibilityLabel="Configurações" style={styles.topBtn}>
            <MaterialCommunityIcons name="cog" color="#fff" size={22} />
          </TouchableOpacity>
          <TouchableOpacity accessibilityLabel="Salvar rascunho" style={styles.topBtn}>
            <MaterialCommunityIcons name="content-save" color="#fff" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tools */}
      <View style={styles.toolBar}>
        <TouchableOpacity accessibilityLabel="Texto" onPress={() => setActiveTool('text')} style={[styles.toolBtn, activeTool === 'text' && styles.toolActive]}>
          <Text style={styles.toolLabel}>Aa</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="Desenhar" onPress={() => setActiveTool('draw')} style={[styles.toolBtn, activeTool === 'draw' && styles.toolActive]}>
          <MaterialCommunityIcons name="brush" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {/* Controls panel */}
      {activeTool === 'text' && (
        <View style={styles.controls}>
          <View style={styles.row}>
            {FONT_OPTIONS.map((f) => (
              <TouchableOpacity key={f} accessibilityLabel={`Fonte ${f}`} style={[styles.pill, fontFamily === f && styles.pillActive]} onPress={() => setFontFamily(f)}>
                <Text style={[styles.pillText, fontFamily === f && styles.pillTextActive, { fontFamily: f }]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {COLORS.map((c) => (
              <TouchableOpacity key={c} accessibilityLabel={`Cor ${c}`} onPress={() => setTextColor(c)} style={[styles.colorDot, { backgroundColor: c }, textColor === c && styles.colorDotActive]} />
            ))}
          </View>
          <View style={styles.row}>
            {(['left','center','right'] as const).map((a) => (
              <TouchableOpacity key={a} accessibilityLabel={`Alinhamento ${a}`} style={[styles.pill, align === a && styles.pillActive]} onPress={() => setAlign(a)}>
                <Text style={[styles.pillText, align === a && styles.pillTextActive]}>{a}</Text>
              </TouchableOpacity>
            ))}
            {(['none','solid','semi'] as const).map((b) => (
              <TouchableOpacity key={b} accessibilityLabel={`Fundo ${b}`} style={[styles.pill, bgStyle === b && styles.pillActive]} onPress={() => setBgStyle(b)}>
                <Text style={[styles.pillText, bgStyle === b && styles.pillTextActive]}>{b}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity accessibilityLabel="Adicionar Texto" style={[styles.actionPrimary]} onPress={addTextBox}>
              <MaterialCommunityIcons name="plus" color="#0f172a" size={18} />
              <Text style={styles.actionPrimaryText}>Adicionar Texto</Text>
            </TouchableOpacity>
          </View>
          {selectedTextId && (
            <View style={styles.row}>
              <TextInput
                accessibilityLabel="Editar texto"
                placeholder="Digite o texto"
                placeholderTextColor="#94a3b8"
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', color: '#e5e7eb', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 }}
                value={texts.find(t => t.id === selectedTextId)?.text || ''}
                onChangeText={(v) => updateText(selectedTextId, { text: v })}
              />
              <TouchableOpacity accessibilityLabel="Remover texto" onPress={() => { removeText(selectedTextId); setSelectedTextId(null); }} style={[styles.pill, { backgroundColor: '#ef4444' }]}>
                <MaterialCommunityIcons name="delete" color="#fff" size={18} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {activeTool === 'draw' && (
        <View style={styles.controls}>
          <View style={styles.row}>
            {COLORS.map((c) => (
              <TouchableOpacity key={c} accessibilityLabel={`Cor pincel ${c}`} onPress={() => setBrushColor(c)} style={[styles.colorDot, { backgroundColor: c }, brushColor === c && styles.colorDotActive]} />
            ))}
          </View>
          <View style={styles.row}>
            {[2,4,8,12].map((w) => (
              <TouchableOpacity key={w} accessibilityLabel={`Espessura ${w}`} onPress={() => setBrushWidth(w)} style={[styles.pill, brushWidth === w && styles.pillActive]}>
                <Text style={[styles.pillText, brushWidth === w && styles.pillTextActive]}>{w}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity accessibilityLabel="Desfazer" onPress={() => { setUndone((u)=>[...(strokes.slice(-1)), ...u]); setStrokes((s)=>s.slice(0, -1)); }} style={[styles.pill]}>
              <MaterialCommunityIcons name="undo" color="#e5e7eb" size={18} />
            </TouchableOpacity>
            <TouchableOpacity accessibilityLabel="Refazer" onPress={() => { const next = undone[0]; if (next) { setStrokes((s)=>[...s, next]); setUndone((u)=>u.slice(1)); } }} style={[styles.pill]}>
              <MaterialCommunityIcons name="redo" color="#e5e7eb" size={18} />
            </TouchableOpacity>
            <TouchableOpacity accessibilityLabel="Limpar tudo" onPress={() => { setStrokes([]); setUndone([]); }} style={[styles.pill, { backgroundColor: '#ef4444' }]}>
              <MaterialCommunityIcons name="broom" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Privacy & Publish */}
      <View style={styles.bottom}>
        <PrivacySelector
          privacy={privacy}
          onChangePrivacy={setPrivacy}
          allowShare={allowShare}
          onChangeShare={setAllowShare}
          allowReplies={allowReplies}
          onChangeReplies={setAllowReplies}
        />
        <View style={styles.publishRow}>
          <TouchableOpacity accessibilityLabel="Adicionar ao story" onPress={publish} style={styles.publishBtn}>
            <MaterialCommunityIcons name="send" color="#fff" size={18} />
            <Text style={styles.publishText}>Adicionar ao story</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  captureArea: { flex: 1 },
  bgFill: { ...StyleSheet.absoluteFillObject },
  drawLayer: { ...StyleSheet.absoluteFillObject },
  topBar: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  toolBar: { position: 'absolute', right: 12, top: 70, gap: 10 },
  toolBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  toolActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  controls: { position: 'absolute', left: 0, right: 0, bottom: 140, padding: 12, backgroundColor: 'rgba(2,6,23,0.8)' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8, alignItems: 'center' },
  pill: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)' },
  pillActive: { backgroundColor: '#e2e8f0' },
  pillText: { color: '#e5e7eb', fontWeight: '700' },
  pillTextActive: { color: '#0f172a' },
  colorDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'transparent' },
  colorDotActive: { borderColor: '#e2e8f0' },
  actionPrimary: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  actionPrimaryText: { color: '#0f172a', fontWeight: '700' },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  publishRow: { backgroundColor: 'rgba(2,6,23,0.9)', padding: 12 },
  publishBtn: { backgroundColor: '#16a34a', paddingVertical: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  publishText: { color: '#fff', fontWeight: '800' },
});
