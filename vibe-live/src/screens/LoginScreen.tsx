import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import MaterialIcon from '../components/MaterialIcon';
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
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signIn(email.trim(), password);
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível entrar');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.headerSection}>
        <View style={styles.iconCircle}>
          <MaterialIcon name="chat" size={48} color="#fff" />
        </View>
        <Text style={styles.title}>Vibe</Text>
        <Text style={styles.subtitle}>Live Messenger</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entre com seu e-mail e senha</Text>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <MaterialIcon name="email" size={20} color="#16a34a" style={styles.inputIcon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <MaterialIcon name="lock" size={20} color="#16a34a" style={styles.inputIcon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcon 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={20} 
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
        </View>

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
  container: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', padding: 20 },
  headerSection: { alignItems: 'center', marginBottom: 32 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 36, fontWeight: '700', color: '#000', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 24, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#374151', textAlign: 'center', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9fafb' },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#111827' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  text: { color: '#6b7280', fontSize: 13 },
  link: { color: '#16a34a', fontWeight: '600' },
});
