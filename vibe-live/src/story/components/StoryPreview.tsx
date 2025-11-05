import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import type { StoryState } from '../types';

type Props = { state: StoryState };

export default function StoryPreview({ state }: Props) {
  return (
    <View style={styles.container}>
      {state.media && <Image source={{ uri: state.media.uri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({ container: { width: 240, height: 420, backgroundColor: '#000', overflow: 'hidden' }, image: { width: '100%', height: '100%' } });
