import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const CustomButton = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity
    style={[styles.button, variant === 'secondary' ? styles.secondary : styles.primary]}
    onPress={onPress}
  >
    <Text style={[styles.text, variant === 'secondary' ? styles.textSecondary : styles.textPrimary]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
  primary: { backgroundColor: '#00FF66' },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1C252E' },
  text: { fontSize: 16, fontWeight: '700' },
  textPrimary: { color: '#0A0F14' },
  textSecondary: { color: '#8E8E93' },
});