import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = { value?: 'public'|'private'; onChange?: (v: 'public'|'private') => void };

export default function PrivacySelector({ value='public', onChange }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onChange && onChange('public')} style={[styles.btn, value === 'public' && styles.active]}>
        <Text style={styles.txt}>Público</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onChange && onChange('private')} style={[styles.btn, value === 'private' && styles.active]}>
        <Text style={styles.txt}>Privado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flexDirection: 'row' }, btn: { padding: 8, marginRight: 8, borderRadius: 6, backgroundColor: '#222' }, active: { backgroundColor: '#16a34a' }, txt: { color: '#fff' } });
