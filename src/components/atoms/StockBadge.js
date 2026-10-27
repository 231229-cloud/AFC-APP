import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StockBadge = ({ stock, minStock = 5 }) => {
  const isLow = stock <= minStock;

  return (
    <View style={[styles.badge, isLow && styles.badgeLow]}>
      <Ionicons
        name="cube-outline"
        size={14}
        color={isLow ? '#FF9F0A' : '#00FF66'}
      />
      <Text style={[styles.text, isLow && styles.textLow]}>
        Stock: {stock}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 255, 102, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeLow: {
    backgroundColor: 'rgba(255, 159, 10, 0.15)',
  },
  text: {
    color: '#00FF66',
    fontSize: 12,
    fontWeight: '700',
  },
  textLow: {
    color: '#FF9F0A',
  },
});