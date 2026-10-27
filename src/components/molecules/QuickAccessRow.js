import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const QuickAccessRow = ({ onNavigate, onOpenPayment, onOpenSchedule }) => {
  const items = [
    { id: 'pagos', label: 'Pagos', icon: 'card-outline', action: onOpenPayment },
    { id: 'rutinas', label: 'Rutinas', icon: 'heart-outline', action: () => onNavigate && onNavigate('MemberRoutines') },
    { id: 'clases', label: 'Clases', icon: 'time-outline', action: onOpenSchedule },
    { id: 'aforo', label: 'Aforo 35%', icon: 'people-outline', action: () => onNavigate && onNavigate('Capacity') },
    { id: 'perfil', label: 'Perfil', icon: 'person-outline', action: onOpenPayment },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => {
            if (item.action) item.action();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle} pointerEvents="none">
            <Ionicons name={item.icon} size={20} color="#00FF66" />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  item: {
    alignItems: 'center',
    gap: 6,
    padding: 4,
    cursor: 'pointer',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#161F2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '600',
  },
});