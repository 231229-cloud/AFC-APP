import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CapacityBadge } from '../atoms/CapacityBadge';
import { ProgressBar } from '../atoms/ProgressBar';

export const AdminScheduleCard = ({ item, onToggleActive, onEdit, onDelete }) => {
  const progress = Math.min((item.booked / item.maxCapacity) * 100, 100);

  return (
    <View style={[styles.card, !item.active && styles.disabledCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.timeGroup}>
          <Ionicons name="time-outline" size={18} color="#00FF66" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        <View style={styles.actionsGroup}>
          <Switch
            value={item.active}
            onValueChange={() => onToggleActive(item.id)}
            trackColor={{ false: '#161F2E', true: '#00FF66' }}
            thumbColor={item.active ? '#0A0F14' : '#8E8E93'}
          />
          <TouchableOpacity onPress={() => onEdit(item)} style={styles.iconBtn}>
            <Ionicons name="pencil-outline" size={16} color="#00FF66" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconBtn}>
            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.capacityRow}>
        <Text style={styles.capacityText}>
          Cupo: <Text style={styles.boldText}>{item.booked}</Text> / {item.maxCapacity} socios
        </Text>
        <CapacityBadge booked={item.booked} maxCapacity={item.maxCapacity} />
      </View>

      <ProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  disabledCard: { opacity: 0.4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionsGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#111823',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capacityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  capacityText: { color: '#8E8E93', fontSize: 12 },
  boldText: { color: '#FFFFFF', fontWeight: '800' },
});