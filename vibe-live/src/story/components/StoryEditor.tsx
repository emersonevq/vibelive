import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text as RNText } from 'react-native';
import type { StoryState } from '../types';
import DrawCanvas from './canvas/DrawCanvas';
import Toolbar from './ui/Toolbar';
import TextTool from './tools/TextTool';
import StickersTool from './tools/StickersTool';
import FiltersTool from './tools/FiltersTool';
import CropTool from './tools/CropTool';
import InteractiveTool from './tools/InteractiveTool';
import TextElementView from './canvas/TextElement';
import StickerElementView from './canvas/StickerElement';

type Props = {
  value?: StoryState;
  onChange?: (s: StoryState) => void;
  onExport?: (s: StoryState) => void;
};

export default function StoryEditor({ value, onChange }: Props) {
  const [local, setLocal] = useState<StoryState>(value || { media: undefined, elements: [] });
  const [activeTool, setActiveTool] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (value) setLocal(value);
  }, [value]);

  const flushChange = (next: StoryState) => {
    setLocal(next);
    onChange && onChange(next);
  };

  const handleAddText = (text: string) => {
    const id = `text-${Date.now()}`;
    const el = { id, type: 'text', text, x: 40, y: 40, fontSize: 28, color: '#fff' } as any;
    flushChange({ ...local, elements: [...local.elements, el] });
  };

  const handleAddSticker = (uri: string) => {
    const id = `sticker-${Date.now()}`;
    const el = { id, type: 'sticker', uri, x: 80, y: 80, scale: 1 } as any;
    flushChange({ ...local, elements: [...local.elements, el] });
  };

  const handleAddStroke = (s: any) => {
    const id = `stroke-${Date.now()}`;
    const el = { id, type: 'stroke', points: s.points, color: s.color, width: s.width } as any;
    flushChange({ ...local, elements: [...local.elements, el] });
  };

  const handleMoveElement = (id: string, x: number, y: number) => {
    flushChange({ ...local, elements: local.elements.map(el => el.id === id ? { ...el, x, y } : el) });
  };

  return (
    <View style={styles.container}>
      {local.media ? (
        <Image source={{ uri: local.media.uri }} style={styles.media} resizeMode="cover" />
      ) : (
        <View style={styles.empty}><RNText style={{ color: '#999' }}>Sem mídia selecionada</RNText></View>
      )}

      {/* Render elements */}
      {local.elements.map(el => {
        if (el.type === 'text') return <TextElementView key={el.id} element={el as any} onMove={handleMoveElement} />;
        if (el.type === 'sticker') return <StickerElementView key={el.id} element={el as any} onMove={handleMoveElement} />;
        return null;
      })}

      <DrawCanvas strokes={local.elements.filter(e => e.type === 'stroke') as any} onAddStroke={handleAddStroke} />

      {/* Active tool panel */}
      {activeTool === 'text' && <TextTool onAddText={handleAddText} />}
      {activeTool === 'stickers' && <StickersTool onAddSticker={handleAddSticker} />}
      {activeTool === 'filters' && <FiltersTool onApply={(f) => console.log('apply filters', f)} />}
      {activeTool === 'crop' && <CropTool onApply={(c) => console.log('apply crop', c)} />}
      {activeTool === 'interactive' && <InteractiveTool onAddPoll={(q, o) => console.log('add poll', q, o)} />}

      <Toolbar
        tools={[{ id: 'draw', label: 'Desenhar' }, { id: 'text', label: 'Texto' }, { id: 'stickers', label: 'Stickers' }, { id: 'filters', label: 'Filtros' }, { id: 'crop', label: 'Cortar' }, { id: 'interactive', label: 'Interativo' }]}
        active={activeTool}
        onSelect={(id) => setActiveTool(id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  media: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
