import React from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SAMPLE_STICKERS = [
  require('../../assets/sticker1.png'),
  require('../../assets/sticker2.png'),
  require('../../assets/sticker3.png'),
];

type Props = { onAddSticker?: (uri: string) => void };

export default function StickersTool({ onAddSticker }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_STICKERS}
        horizontal
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onAddSticker && onAddSticker(Image.resolveAssetSource(item).uri)} style={styles.item}>
            <Image source={item} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8 }, item: { marginRight: 8 }, image: { width: 64, height: 64 } });
