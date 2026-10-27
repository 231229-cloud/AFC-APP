import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CapacitySummaryCard = ({ dayName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.label}>DÍA DETECTADO</Text>
          <Text style={styles.value}>Hoy es {dayName}</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="time-outline" size={14} color="#00FF66" />
          <Text style={styles.badgeText}>Semestral (180 Días)</Text>
        </View>
      </View>
      <Text style={styles.meta}>
        Recomendaciones calculadas según el historial de huella digital de los últimos 6 meses para los días {dayName}.
      </Text>
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
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#8E8E93', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  value: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginTop: 2 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 255, 102, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00FF66',
  },
  badgeText: { color: '#00FF66', fontSize: 11, fontWeight: '800' },
  meta: { color: '#8E8E93', fontSize: 11, marginTop: 10, lineHeight: 16 },
});