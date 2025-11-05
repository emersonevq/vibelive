import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StoryCreator from '../story/components/StoryCreator';

export default function StoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StoryCreator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
