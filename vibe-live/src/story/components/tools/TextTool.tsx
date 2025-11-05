import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = { onAddText: (text: string) => void };

export default function TextTool({ onAddText }: Props) {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput value={text} onChangeText={setText} placeholder="Digite o texto" style={styles.input} />
      <Button title="Adicionar" onPress={() => { if (text.trim()) { onAddText(text.trim()); setText(''); } }} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8, backgroundColor: '#222' }, input: { backgroundColor: '#fff', padding: 8, borderRadius: 6, marginBottom: 8 } });
