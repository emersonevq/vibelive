import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextStyle, View, Text } from 'react-native';

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
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        style={style as any}
      />
      {__DEV__ && (
        <Text style={{ position: 'absolute', bottom: -10, fontSize: 8, color: '#999' }}>{name}</Text>
      )}
    </View>
  );
}
