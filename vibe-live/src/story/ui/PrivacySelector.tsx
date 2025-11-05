import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Privacy } from '../../story/types';

interface Props {
  privacy: Privacy;
  onChangePrivacy: (p: Privacy) => void;
  allowShare: boolean;
  onChangeShare: (v: boolean) => void;
  allowReplies: boolean;
  onChangeReplies: (v: boolean) => void;
}

const OPTIONS: { key: Privacy; label: string; icon: any }[] = [
  { key: 'todos', label: 'Todos', icon: 'earth' },
  { key: 'amigos', label: 'Amigos', icon: 'account-multiple' },
  { key: 'amigos_proximos', label: 'Amigos próximos', icon: 'account-heart' },
  { key: 'amigos_exceto', label: 'Amigos exceto...', icon: 'account-cancel' },
  { key: 'apenas', label: 'Apenas...', icon: 'account-lock' },
] as any;

export default function PrivacySelector({ privacy, onChangePrivacy, allowShare, onChangeShare, allowReplies, onChangeReplies }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quem pode ver</Text>
      <View style={styles.row}>
        {OPTIONS.map((o) => (
          <TouchableOpacity
            key={o.key}
            accessibilityLabel={`Privacidade ${o.label}`}
            style={[styles.option, privacy === o.key && styles.optionActive]}
            onPress={() => onChangePrivacy(o.key)}
          >
            <MaterialCommunityIcons name={o.icon as any} size={18} color={privacy === o.key ? '#0f172a' : '#e5e7eb'} />
            <Text style={[styles.optionText, privacy === o.key && styles.optionTextActive]}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.toggles}>
        <View style={styles.toggleRow}>
          <MaterialCommunityIcons name="share-variant" size={18} color="#e5e7eb" />
          <Text style={styles.toggleLabel}>Permitir compartilhamento</Text>
          <Switch value={allowShare} onValueChange={onChangeShare} />
        </View>
        <View style={styles.toggleRow}>
          <MaterialCommunityIcons name="message-text-outline" size={18} color="#e5e7eb" />
          <Text style={styles.toggleLabel}>Permitir respostas</Text>
          <Switch value={allowReplies} onValueChange={onChangeReplies} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'rgba(2,6,23,0.9)', padding: 12, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  title: { color: '#fff', fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)' },
  optionActive: { backgroundColor: '#e2e8f0' },
  optionText: { color: '#e5e7eb', fontWeight: '600' },
  optionTextActive: { color: '#0f172a' },
  toggles: { marginTop: 10, gap: 8 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  toggleLabel: { color: '#e5e7eb', fontWeight: '600', flex: 1, marginLeft: 8 },
});
