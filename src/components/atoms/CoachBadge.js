import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CoachBadge = ({ coachName }) => {
  return (
    <View style={styles.badge}>
      <Ionicons name="person-circle-outline" size={14} color="#00FF66" />
      <Text style={styles.text}>{coachName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 255, 102, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00FF66',
  },
  text: { color: '#00FF66', fontSize: 11, fontWeight: '700' },
}); 