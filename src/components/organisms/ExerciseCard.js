import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ExerciseCard = ({ index, exercise }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: exercise.mediaUrl }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Text style={styles.number}>#0{index + 1}</Text>
          <Text style={styles.muscle}>{exercise.muscle}</Text>
        </View>

        <Text style={styles.name}>{exercise.name}</Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Series</Text>
            <Text style={styles.statValue}>{exercise.sets}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Repeticiones</Text>
            <Text style={styles.statValue}>{exercise.reps}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Descanso</Text>
            <Text style={styles.statValue}>{exercise.rest}</Text>
          </View>
        </View>

        {/* Indicaciones del Coach */}
        <View style={styles.notesBox}>
          <Ionicons name="information-circle-outline" size={16} color="#00FF66" />
          <Text style={styles.notesText}>{exercise.notes}</Text>
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
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: { width: '100%', height: 160 },
  body: { padding: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  number: { color: '#00FF66', fontSize: 12, fontWeight: '800' },
  muscle: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },
  name: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statBox: {
    flex: 1,
    backgroundColor: '#111823',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#161F2E',
  },
  statLabel: { color: '#8E8E93', fontSize: 10, marginBottom: 2 },
  statValue: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  notesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 255, 102, 0.05)',
    padding: 10,
    borderRadius: 8,
  },
  notesText: { color: '#8E8E93', fontSize: 11, flex: 1, lineHeight: 15 },
});