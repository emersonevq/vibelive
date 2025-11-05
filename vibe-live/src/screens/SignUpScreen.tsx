import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import MaterialIcon from '../components/MaterialIcon';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    try {
      await signUp(email.trim(), password);
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível criar conta');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.headerSection}>
        <View style={styles.iconCircle}>
          <MaterialIcon name="account-plus" size={48} color="#fff" />
        </View>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se ao Live Messenger</Text>
      </View>

      <View style={styles.card}>
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

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <MaterialIcon name="lock-check" size={20} color="#16a34a" style={styles.inputIcon} />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmar Senha"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcon 
                name={showConfirmPassword ? 'eye' : 'eye-off'} 
                size={20} 
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton title="Criar Conta" onPress={handleSignUp} />

        <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.navigate('Login' as any)}>
          <Text style={styles.note}>Já tem conta? Entrar</Text>
        </TouchableOpacity>
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
  inputGroup: { marginBottom: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9fafb' },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#111827' },
  note: { color: '#16a34a', textAlign: 'center', fontWeight: '600', fontSize: 14 },
});
