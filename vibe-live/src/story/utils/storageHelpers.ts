import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveDraft(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) { return false; }
}

export async function loadDraft(key: string) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}
