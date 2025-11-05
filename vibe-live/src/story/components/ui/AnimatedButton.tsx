import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Animated, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = { title: string; onPress?: () => void; style?: ViewStyle };

export default function AnimatedButton({ title, onPress, style }: Props) {
  const anim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(anim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[styles.btn, style, { transform: [{ scale: anim }] }] }>
        <Text style={styles.txt}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({ btn: { padding: 12, backgroundColor: '#16a34a', borderRadius: 8, alignItems: 'center' }, txt: { color: '#fff', fontWeight: '700' } });
