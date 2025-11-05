import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Props = { onAddPoll?: (question: string, options: string[]) => void };

export default function InteractiveTool({ onAddPoll }: Props) {
  const [question, setQuestion] = useState('');
  const [optA, setOptA] = useState('Sim');
  const [optB, setOptB] = useState('Não');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enquete</Text>
      <TextInput placeholder="Pergunta" value={question} onChangeText={setQuestion} style={styles.input} />
      <TextInput placeholder="Opção A" value={optA} onChangeText={setOptA} style={styles.input} />
      <TextInput placeholder="Opção B" value={optB} onChangeText={setOptB} style={styles.input} />
      <Button title="Adicionar Enquete" onPress={() => onAddPoll && onAddPoll(question || 'Enquete', [optA, optB])} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 8, backgroundColor: '#111' }, input: { backgroundColor: '#fff', padding: 8, borderRadius: 6, marginBottom: 8 }, label: { color: '#fff', marginBottom: 8 } });
