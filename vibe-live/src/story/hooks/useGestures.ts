import { useRef } from 'react';
import { PanResponder } from 'react-native';

export default function useGestures(onMove: (dx: number, dy: number) => void) {
  const last = useRef({ x: 0, y: 0 });

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, g) => {
        onMove(g.dx, g.dy);
      },
      onPanResponderGrant: () => {
        last.current = { x: 0, y: 0 };
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return responder;
}
