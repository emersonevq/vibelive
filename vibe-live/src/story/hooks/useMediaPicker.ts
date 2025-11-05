import * as ImagePicker from 'expo-image-picker';
import { useCallback } from 'react';

export async function requestImageLibraryPermissions() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
}

export default function useMediaPicker() {
  const pickImage = useCallback(async () => {
    const granted = await requestImageLibraryPermissions();
    if (!granted) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false,
      base64: false,
    });

    if (result.canceled) return null;
    // result.assets is array in SDK 45+
    const asset = result.assets && result.assets[0];
    if (!asset) return null;

    return { uri: asset.uri, width: asset.width, height: asset.height };
  }, []);

  return { pickImage };
}
