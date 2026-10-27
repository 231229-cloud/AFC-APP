import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Importamos el StatusBadge que ya tienes en tu proyecto
import { StatusBadge } from '../atoms/StatusBadge';

export const MembershipCard = ({ status, dueDate, lastAccess, onOpenPaymentModal }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subTitle}>MI MEMBRESÍA</Text>
          <Text style={styles.title}>Plan Mensual Musculación + Funcional</Text>
        </View>
        <StatusBadge
          label={status === 'Activa' ? '🟢 Activa' : '🟡 Por Vencer'}
          type={status === 'Activa' ? 'success' : 'warning'}
        />
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Vencimiento</Text>
          <Text style={styles.infoValue}>{dueDate}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Último Acceso (Huella)</Text>
          <Text style={styles.infoValue}>{lastAccess}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnPay} onPress={onOpenPaymentModal}>
        <Ionicons name="card-outline" size={18} color="#0A0F14" />
        <Text style={styles.btnPayText}>Renovar / Elegir Método de Pago</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  subTitle: { color: '#8E8E93', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  title: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginTop: 2 },
  infoRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  infoCol: { flex: 1 },
  infoLabel: { color: '#8E8E93', fontSize: 11, marginBottom: 2 },
  infoValue: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  btnPay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FF66',
    borderRadius: 10,
    height: 42,
    gap: 8,
  },
  btnPayText: { color: '#0A0F14', fontWeight: '700', fontSize: 13 },
});