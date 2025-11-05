export type PrivacyAudience = 'todos' | 'amigos' | 'amigos_proximos' | 'amigos_exceto' | 'apenas';

export interface PrivacySettings {
  audience: PrivacyAudience;
  allowReplies: boolean;
  allowSharing: boolean;
  excludedUsers?: string[];
}

export interface TextElement {
  id: string;
  type: 'text';
  text: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
  fontFamily: 'default' | 'bold' | 'italic' | 'serif';
  color: string;
  backgroundColor?: string;
  hasOutline: boolean;
  outlineColor?: string;
  align: 'left' | 'center' | 'right';
}

export interface DrawElement {
  id: string;
  type: 'draw';
  points: Array<{ x: number; y: number }>;
  color: string;
  brushType: 'normal' | 'marcador' | 'neon' | 'caneta';
  width: number;
  opacity: number;
}

export interface StickerElement {
  id: string;
  type: 'sticker';
  stickerUrl: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface MentionElement {
  id: string;
  type: 'mention';
  userId: string;
  userName: string;
  x: number;
  y: number;
}

export interface LocationElement {
  id: string;
  type: 'location';
  name: string;
  latitude: number;
  longitude: number;
  x: number;
  y: number;
}

export interface PollElement {
  id: string;
  type: 'poll';
  question: string;
  options: string[];
  x: number;
  y: number;
}

export interface QuestionElement {
  id: string;
  type: 'question';
  question: string;
  x: number;
  y: number;
}

export interface CountdownElement {
  id: string;
  type: 'countdown';
  targetDate: string;
  x: number;
  y: number;
}

export interface MusicElement {
  id: string;
  type: 'music';
  songName: string;
  artistName: string;
  songUrl: string;
  x: number;
  y: number;
}

export interface DateTimeElement {
  id: string;
  type: 'datetime';
  format: 'date' | 'time' | 'datetime';
  x: number;
  y: number;
}

export type StoryElement = 
  | TextElement 
  | DrawElement 
  | StickerElement 
  | MentionElement 
  | LocationElement 
  | PollElement 
  | QuestionElement 
  | CountdownElement 
  | MusicElement 
  | DateTimeElement;

export type FilterType = 
  | 'original'
  | 'vintage'
  | 'pb'
  | 'sepia'
  | 'vibrante'
  | 'frio'
  | 'quente'
  | 'desbotado'
  | 'dramatico'
  | 'retro';

export interface FilterConfig {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  hue?: number;
  sepia?: number;
  grayscale?: number;
  blur?: number;
}

export interface Crop {
  ratio: 'square' | '16:9' | '4:3' | '1:1' | 'free';
  x: number;
  y: number;
  width: number;
  height: number;
  zoom: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface StoryDraft {
  id: string;
  imageUri: string;
  filter?: FilterType;
  crop?: Crop;
  elements: StoryElement[];
  privacy: PrivacySettings;
  duration: number;
  createdAt: Date;
  lastModified: Date;
}

export interface Story extends StoryDraft {
  userId: string;
  publishedAt: Date;
  viewCount: number;
  reactions: Array<{ userId: string; reaction: string }>;
  expiresAt: Date;
}

export interface StoryEditorState {
  selectedElement: string | null;
  undoStack: StoryElement[][];
  redoStack: StoryElement[][];
  currentElements: StoryElement[];
  zoom: number;
  panX: number;
  panY: number;
}
