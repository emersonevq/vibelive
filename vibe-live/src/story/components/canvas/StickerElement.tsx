import React, { useRef } from 'react';
import { Image, StyleSheet, PanResponder, View } from 'react-native';
import type { StickerElement as S } from '../../types';

type Props = { element: S; onMove?: (id: string, x: number, y: number) => void };

export default function StickerElement({ element, onMove }: Props) {
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
    <View style={[styles.wrapper, { left: element.x, top: element.y, transform: [{ rotate: `${element.rotation || 0}deg` }] }]} {...pan.panHandlers}>
      <Image source={{ uri: element.uri }} style={[styles.image, { width: 80 * (element.scale || 1), height: 80 * (element.scale || 1) }]} />
    </View>
  );
}

const styles = StyleSheet.create({ wrapper: { position: 'absolute' }, image: { resizeMode: 'contain' } });
