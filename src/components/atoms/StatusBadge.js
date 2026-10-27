import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatusBadge = ({ label }) => {
  let badgeStyle = styles.badgeActive;
  let textStyle = styles.badgeTextActive;

  if (label === 'Vencido') {
    badgeStyle = styles.badgeExpired;
    textStyle = styles.badgeTextExpired;
  } else if (label === 'Por Depurar') {
    badgeStyle = styles.badgePurge;
    textStyle = styles.badgeTextPurge;
  }

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start' },
  badgeActive: { backgroundColor: 'rgba(0, 255, 102, 0.15)' },
  badgeExpired: { backgroundColor: 'rgba(255, 159, 10, 0.15)' },
  badgePurge: { backgroundColor: 'rgba(255, 69, 58, 0.2)' },
  badgeTextActive: { fontSize: 12, fontWeight: '700', color: '#00FF66' },
  badgeTextExpired: { fontSize: 12, fontWeight: '700', color: '#FF9F0A' },
  badgeTextPurge: { fontSize: 12, fontWeight: '700', color: '#FF453A' },
});