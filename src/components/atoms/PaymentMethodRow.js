import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const PaymentMethodRow = ({ icon, label, percentage, amount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.labelGroup}>
          <View style={styles.iconCircle}>
            <Ionicons name={icon} size={16} color="#00FF66" />
          </View>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={styles.valueGroup}>
          {percentage ? <Text style={styles.percentageText}>{percentage}%</Text> : null}
          <Text style={styles.amountText}>${amount.toLocaleString()}</Text>
        </View>
      </View>

      {/* Barra de Progreso Neón */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 255, 102, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 102, 0.3)',
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  valueGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  percentageText: {
    color: '#8E8E93',
    fontSize: 13,
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#111823',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00FF66',
    borderRadius: 3,
  },
});