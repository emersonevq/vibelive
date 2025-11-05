import React from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SAMPLE_STICKERS = [
  'https://cdn-icons-png.flaticon.com/512/2917/2917242.png',
  'https://cdn-icons-png.flaticon.com/512/2907/2907264.png',
  'https://cdn-icons-png.flaticon.com/512/197/197564.png',
];

type Props = { onAddSticker?: (uri: string) => void };

export default function StickersTool({ onAddSticker }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_STICKERS}
        horizontal
        keyExtractor={(item, i) => String(i)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onAddSticker && onAddSticker(item)} style={styles.item}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8 }, item: { marginRight: 8 }, image: { width: 64, height: 64 } });
