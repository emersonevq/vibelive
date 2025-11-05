import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../navigation/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type AuthNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignUpScreen() {
  const navigation = useNavigation<AuthNavProp>();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email.trim(), password);
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível criar conta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />

      <PrimaryButton title="Criar conta" onPress={handleSignUp} />

      <Text style={styles.note} onPress={() => navigation.navigate('Login' as any)}>Já tem conta? Entrar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  note: { color: '#16a34a', textAlign: 'center', marginTop: 12, fontWeight: '600' },
});
