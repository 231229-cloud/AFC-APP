
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Badge = ({ label, variant = 'default' }) => {
  const isDiscount = variant === 'discount';
  return (
    <View style={[styles.container, isDiscount ? styles.discountBg : styles.defaultBg]}>
      <Text style={isDiscount ? styles.discountText : styles.defaultText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  discountBg: { backgroundColor: 'rgba(0, 255, 102, 0.15)', borderColor: '#00FF66' },
  defaultBg: { backgroundColor: '#111823', borderColor: '#161F2E' },
  discountText: { color: '#00FF66', fontSize: 10, fontWeight: '800' },
  defaultText: { color: '#8E8E93', fontSize: 10, fontWeight: '600' },
});