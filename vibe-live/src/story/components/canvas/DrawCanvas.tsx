import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import type { DrawingStroke } from '../../types';

type Props = {
  strokes: DrawingStroke[];
  color?: string;
  strokeWidth?: number;
  onAddStroke?: (stroke: { points: { x: number; y: number }[]; color: string; width: number }) => void;
};

export default function DrawCanvas({ strokes, color = '#ffffff', strokeWidth = 4, onAddStroke }: Props) {
  const [current, setCurrent] = useState<{ x: number; y: number }[]>([]);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        const { locationX, locationY } = e.nativeEvent;
        pointsRef.current = [{ x: locationX, y: locationY }];
        setCurrent([...pointsRef.current]);
      },
      onPanResponderMove: (e: GestureResponderEvent, g: PanResponderGestureState) => {
        const { locationX, locationY } = e.nativeEvent;
        pointsRef.current.push({ x: locationX, y: locationY });
        setCurrent([...pointsRef.current]);
      },
      onPanResponderRelease: () => {
        if (pointsRef.current.length && onAddStroke) {
          onAddStroke({ points: pointsRef.current, color, width: strokeWidth });
        }
        pointsRef.current = [];
        setCurrent([]);
      },
    })
  ).current;

  return (
    <View style={styles.container} {...pan.panHandlers}>
      {/* Existing strokes rendered as simple Views for compatibility: render small circles along points */}
      {strokes.map((s) => (
        <View key={s.id} pointerEvents="none">
          {s.points.map((p, i) => (
            <View
              key={i}
              style={[
                styles.point,
                {
                  left: p.x - s.width / 2,
                  top: p.y - s.width / 2,
                  backgroundColor: s.color,
                  width: s.width,
                  height: s.width,
                  borderRadius: s.width / 2,
                },
              ]}
            />
          ))}
        </View>
      ))}

      {/* current stroke */}
      {current.map((p, i) => (
        <View
          key={`cur-${i}`}
          pointerEvents="none"
          style={[
            styles.point,
            { left: p.x - strokeWidth / 2, top: p.y - strokeWidth / 2, backgroundColor: color, width: strokeWidth, height: strokeWidth, borderRadius: strokeWidth / 2 },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  point: {
    position: 'absolute',
  },
});
