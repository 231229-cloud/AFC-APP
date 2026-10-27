import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CoachBadge } from '../atoms/CoachBadge';

export const RoutineInfoCard = ({ title, coach, level, duration, exerciseCount }) => {
  return (
    <View style={styles.card}>
      <View style={styles.badgeRow}>
        <CoachBadge coachName={coach} />
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color="#8E8E93" />
          <Text style={styles.metaText}>{duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="barbell-outline" size={14} color="#8E8E93" />
          <Text style={styles.metaText}>{exerciseCount} Ejercicios</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  levelBadge: {
    backgroundColor: '#111823',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#161F2E',
  },
  levelText: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#8E8E93', fontSize: 12 },
});