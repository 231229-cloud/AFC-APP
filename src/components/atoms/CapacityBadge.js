import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const CapacityBadge = ({ booked, maxCapacity }) => {
  const isFull = booked >= maxCapacity;
  return (
    <Text style={[styles.badge, isFull ? styles.badgeFull : styles.badgeAvailable]}>
      {isFull ? 'Lleno' : 'Disponible'}
    </Text>
  );
};

const styles = StyleSheet.create({
  badge: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeAvailable: { color: '#00FF66', backgroundColor: 'rgba(0, 255, 102, 0.1)' },
  badgeFull: { color: '#FF3B30', backgroundColor: 'rgba(255, 59, 48, 0.1)' },
});