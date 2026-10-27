import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../atoms/Badge';
import { ProgressBar } from '../atoms/ProgressBar';

export const StreakCard = ({ streakDays, discountPercent }) => (
  <View style={styles.card}>
    <View style={styles.rowBetween}>
      <View style={styles.headerGroup}>
        <Ionicons name="flame" size={18} color="#FF9500" />
        <Text style={styles.title}>Racha Huella: {streakDays} Días</Text>
      </View>

      {discountPercent > 0 ? (
        <Badge label={`-${discountPercent}% Descuento`} variant="discount" />
      ) : (
        <Badge label="Meta: 80 Días (10%)" />
      )}
    </View>

    <Text style={styles.desc}>
      {discountPercent > 0
        ? `¡Increíble constancia! Tienes un ${discountPercent}% de descuento asegurado para tu siguiente mensualidad.`
        : 'Valida tu huella de Lunes a Viernes. A los 80 días obtienes 10% y a los 150 días el 20% de descuento.'}
    </Text>

    <ProgressBar progress={(streakDays / 150) * 100} />

    <Text style={styles.footerText}>
      {streakDays < 80
        ? `Faltan ${80 - streakDays} días seguidos para tu primer 10% de descuento.`
        : streakDays < 150
        ? `Faltan ${150 - streakDays} días seguidos para alcanzar el 20% de descuento.`
        : '¡Felicidades! Has alcanzado el beneficio máximo del 20% de descuento.'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#0B0F17', borderRadius: 14, borderWidth: 1, borderColor: '#161F2E', padding: 14, marginTop: 12, marginBottom: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  desc: { color: '#D1D5DB', fontSize: 11, marginTop: 6, marginBottom: 10, lineHeight: 16 },
  footerText: { color: '#8E8E93', fontSize: 10, fontWeight: '600', marginTop: 6 },
});