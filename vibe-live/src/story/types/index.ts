import { ImageSourcePropType } from 'react-native';

export type ElementId = string;

export type StoryMedia = {
  id: ElementId;
  uri: string;
  width?: number;
  height?: number;
};

export type TextElement = {
  id: ElementId;
  type: 'text';
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  rotation?: number;
  zIndex?: number;
};

export type StickerElement = {
  id: ElementId;
  type: 'sticker';
  uri: string;
  x: number;
  y: number;
  scale: number;
  rotation?: number;
  zIndex?: number;
};

export type DrawingStroke = {
  id: ElementId;
  type: 'stroke';
  points: { x: number; y: number }[];
  color: string;
  width: number;
  zIndex?: number;
};

export type StoryElement = TextElement | StickerElement | DrawingStroke;

export type StoryState = {
  media?: StoryMedia;
  elements: StoryElement[];
};
