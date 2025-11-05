import React, { useRef } from 'react';
import { Text, StyleSheet, PanResponder, View } from 'react-native';
import type { TextElement as T } from '../../types';

type Props = { element: T; onMove?: (id: string, x: number, y: number) => void };

export default function TextElement({ element, onMove }: Props) {
  const pos = useRef({ x: element.x, y: element.y }).current;

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, g) => {
        const nx = pos.x + g.dx;
        const ny = pos.y + g.dy;
        onMove && onMove(element.id, nx, ny);
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View style={[styles.wrapper, { left: element.x, top: element.y }]} {...pan.panHandlers}>
      <Text style={[styles.text, { fontSize: element.fontSize, color: element.color, transform: [{ rotate: `${element.rotation || 0}deg` }] }]}>{element.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ wrapper: { position: 'absolute' }, text: { color: '#fff' } });
