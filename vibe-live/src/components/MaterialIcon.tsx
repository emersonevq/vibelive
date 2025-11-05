import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextStyle } from 'react-native';

interface MaterialIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
}

export default function MaterialIcon({
  name,
  size = 24,
  color = '#000',
  style,
}: MaterialIconProps) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style as any}
    />
  );
}
