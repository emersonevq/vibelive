export function applyFiltersToManipulateOptions(opts: { brightness?: number; contrast?: number; saturation?: number }) {
  // This util maps slider values to image-manipulator parameters (for future integration)
  return {
    brightness: opts.brightness ?? 1,
    contrast: opts.contrast ?? 1,
    saturation: opts.saturation ?? 1,
  };
}
