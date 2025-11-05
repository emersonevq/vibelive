export function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }

export function translateToCanvas(x: number, y: number, width: number, height: number) {
  return { x: (x / width) * 100, y: (y / height) * 100 };
}
