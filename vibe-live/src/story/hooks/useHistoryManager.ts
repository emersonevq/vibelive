import { useCallback, useRef, useState } from 'react';

export default function useHistoryManager<T>(initial: T) {
  const [present, setPresent] = useState<T>(initial);
  const pastRef = useRef<T[]>([]);
  const futureRef = useRef<T[]>([]);

  const set = useCallback((next: T) => {
    pastRef.current.push(present);
    futureRef.current = [];
    setPresent(next);
  }, [present]);

  const undo = useCallback(() => {
    if (!pastRef.current.length) return;
    const prev = pastRef.current.pop() as T;
    futureRef.current.push(present);
    setPresent(prev);
  }, [present]);

  const redo = useCallback(() => {
    if (!futureRef.current.length) return;
    const next = futureRef.current.pop() as T;
    pastRef.current.push(present);
    setPresent(next);
  }, [present]);

  const reset = useCallback((value: T) => {
    pastRef.current = [];
    futureRef.current = [];
    setPresent(value);
  }, []);

  return { present, set, undo, redo, reset, canUndo: () => pastRef.current.length > 0, canRedo: () => futureRef.current.length > 0 };
}
