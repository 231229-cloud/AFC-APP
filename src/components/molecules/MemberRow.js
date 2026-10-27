import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../atoms/StatusBadge';

export const MemberRow = ({ item, statusObj, daysOverdue, onOpenMenu }) => {
  return (
    <View style={styles.tableBodyRow}>
      <View style={[styles.td, { flex: 2, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.tdTextBold}>{item.name}</Text>
          {daysOverdue > 60 && (
            <Text style={styles.warningText}>MÁS DE 2 MESES VENCIDO</Text>
          )}
        </View>
      </View>

      <Text style={[styles.td, { flex: 1.5 }]}>{item.code}</Text>
      <Text style={[styles.td, { flex: 1.5 }]}>{item.phone || 'N/A'}</Text>

      <View style={[styles.td, { flex: 1.2 }]}>
        <StatusBadge label={statusObj.label} />
      </View>

      <Text style={[styles.td, { flex: 1.2 }]}>{item.dueDate}</Text>

      <TouchableOpacity style={styles.btnOptions} onPress={() => onOpenMenu(item)}>
        <Ionicons name="ellipsis-horizontal" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBodyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#161F2E' },
  td: { color: '#8E8E93', fontSize: 14 },
  tdTextBold: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#161F2E', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#00FF66', fontWeight: 'bold', fontSize: 14 },
  warningText: { color: '#FF453A', fontSize: 10, fontWeight: '700', marginTop: 2 },
  btnOptions: { padding: 8, borderRadius: 8, backgroundColor: '#161F2E' },
});