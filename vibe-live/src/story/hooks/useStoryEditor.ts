import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { StoryElement, StoryState, StoryMedia, TextElement, StickerElement, DrawingStroke } from '../types';

export default function useStoryEditor(initial?: StoryState) {
  const [state, setState] = useState<StoryState>(
    initial || { media: undefined, elements: [] }
  );

  const addMedia = useCallback((media: StoryMedia) => {
    setState((s) => ({ ...s, media }));
  }, []);

  const addText = useCallback((opts: Partial<TextElement> & { text: string }) => {
    const el: TextElement = {
      id: uuidv4(),
      type: 'text',
      text: opts.text,
      x: opts.x ?? 50,
      y: opts.y ?? 50,
      fontSize: opts.fontSize ?? 24,
      color: opts.color ?? '#ffffff',
      rotation: opts.rotation ?? 0,
      zIndex: (state.elements.length ? Math.max(...state.elements.map(e => (e as any).zIndex || 0)) + 1 : 1),
    };
    setState((s) => ({ ...s, elements: [...s.elements, el] }));
    return el.id;
  }, [state.elements]);

  const addSticker = useCallback((opts: Partial<StickerElement> & { uri: string }) => {
    const el: StickerElement = {
      id: uuidv4(),
      type: 'sticker',
      uri: opts.uri,
      x: opts.x ?? 80,
      y: opts.y ?? 80,
      scale: opts.scale ?? 1,
      rotation: opts.rotation ?? 0,
      zIndex: (state.elements.length ? Math.max(...state.elements.map(e => (e as any).zIndex || 0)) + 1 : 1),
    };
    setState((s) => ({ ...s, elements: [...s.elements, el] }));
    return el.id;
  }, [state.elements]);

  const addStroke = useCallback((stroke: Omit<DrawingStroke, 'id' | 'type' | 'zIndex'>) => {
    const el: DrawingStroke = {
      id: uuidv4(),
      type: 'stroke',
      points: stroke.points,
      color: stroke.color,
      width: stroke.width,
      zIndex: (state.elements.length ? Math.max(...state.elements.map(e => (e as any).zIndex || 0)) + 1 : 1),
    };
    setState((s) => ({ ...s, elements: [...s.elements, el] }));
    return el.id;
  }, [state.elements]);

  const updateElement = useCallback((id: string, patch: Partial<StoryElement>) => {
    setState((s) => ({
      ...s,
      elements: s.elements.map((el) => (el.id === id ? { ...el, ...(patch as any) } : el)),
    }));
  }, []);

  const removeElement = useCallback((id: string) => {
    setState((s) => ({ ...s, elements: s.elements.filter((el) => el.id !== id) }));
  }, []);

  const clearElements = useCallback(() => setState((s) => ({ ...s, elements: [] })), []);

  const bringToFront = useCallback((id: string) => {
    setState((s) => {
      const maxZ = s.elements.length ? Math.max(...s.elements.map(e => (e as any).zIndex || 0)) : 0;
      return {
        ...s,
        elements: s.elements.map(el => el.id === id ? { ...(el as any), zIndex: maxZ + 1 } : el)
      };
    });
  }, []);

  return useMemo(() => ({
    state,
    setState,
    addMedia,
    addText,
    addSticker,
    addStroke,
    updateElement,
    removeElement,
    clearElements,
    bringToFront,
  }), [state, addMedia, addText, addSticker, addStroke, updateElement, removeElement, clearElements, bringToFront]);
}
