export type Background =
  | { type: 'color'; color: string }
  | { type: 'image'; uri: string }
  | { type: 'video'; uri: string; duration?: number };

export type TextAlign = 'left' | 'center' | 'right';
export type TextBgStyle = 'none' | 'solid' | 'semi';

export type TextItem = {
  id: string;
  text: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  align: TextAlign;
  bgStyle: TextBgStyle;
  strokeColor?: string;
  x: number; // 0..1 relative
  y: number; // 0..1 relative
  rotation: number; // degrees
  scale: number; // 0.5..3
};

export type Point = { x: number; y: number };

export type Stroke = {
  id: string;
  color: string;
  width: number;
  opacity: number; // 0..1
  points: Point[]; // relative coordinates 0..1
};

export type Privacy =
  | 'todos'
  | 'amigos'
  | 'amigos_proximos'
  | 'amigos_exceto'
  | 'apenas';

export type StoryComposition = {
  background: Background;
  texts: TextItem[];
  strokes: Stroke[];
  privacy: Privacy;
  allowShare: boolean;
  allowReplies: boolean;
};
