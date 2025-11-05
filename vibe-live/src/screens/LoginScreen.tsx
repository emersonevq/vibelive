import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../navigation/auth';

type AuthNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<AuthNavProp>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState(__DEV__ ? 'teste@mail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '123' : '');

  const handleLogin = async () => {
    try {
      await signIn(email.trim(), password);
      // navigation to Main is handled by auth state change
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível entrar');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Vibe</Text>
        <Text style={styles.subtitle}>Entre com seu e-mail e senha</Text>

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

        <PrimaryButton title="Entrar" onPress={handleLogin} />

        <View style={styles.row}>
          <Text style={styles.text}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp' as any)}>
            <Text style={styles.link}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff' },
  title: { fontSize: 36, fontWeight: '700', color: '#000', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#444', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  text: { color: '#444' },
  link: { color: '#16a34a', fontWeight: '600' },
});
