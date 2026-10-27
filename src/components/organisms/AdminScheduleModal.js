import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AdminScheduleModal = ({ visible, itemToEdit, onClose, onSave }) => {
  const [shift, setShift] = useState('Matutino');
  const [time, setTime] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('20');

  useEffect(() => {
    if (itemToEdit) {
      setShift(itemToEdit.shift);
      setTime(itemToEdit.time);
      setMaxCapacity(String(itemToEdit.maxCapacity));
    } else {
      setShift('Matutino');
      setTime('');
      setMaxCapacity('20');
    }
  }, [itemToEdit, visible]);

  const handleSave = () => {
    if (!time.trim()) {
      Alert.alert('Error', 'Ingresa un rango de horario válido.');
      return;
    }
    const capNum = parseInt(maxCapacity, 10) || 10;
    onSave({ id: itemToEdit?.id, shift, time, maxCapacity: capNum });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {itemToEdit ? 'Editar Horario' : 'Nuevo Horario'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Turno</Text>
          <View style={styles.shiftSelector}>
            {['Matutino', 'Vespertino'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.shiftBtn, shift === t && styles.shiftBtnActive]}
                onPress={() => setShift(t)}
              >
                <Text style={[styles.shiftText, shift === t && styles.shiftTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Horario (Ej. 07:00 AM - 08:00 AM)</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="07:00 AM - 08:00 AM"
            placeholderTextColor="#8E8E93"
          />

          <Text style={styles.inputLabel}>Cupo Máximo de Personas</Text>
          <TextInput
            style={styles.input}
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            keyboardType="numeric"
            placeholder="20"
            placeholderTextColor="#8E8E93"
          />

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 11, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 20,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  inputLabel: { color: '#8E8E93', fontSize: 11, fontWeight: '700', marginBottom: 6, marginTop: 10 },
  shiftSelector: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  shiftBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 8,
    alignItems: 'center',
  },
  shiftBtnActive: { borderColor: '#00FF66', backgroundColor: 'rgba(0, 255, 102, 0.12)' },
  shiftText: { color: '#8E8E93', fontSize: 12, fontWeight: '600' },
  shiftTextActive: { color: '#FFFFFF', fontWeight: '800' },
  input: {
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 20 },
  btnCancel: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#161F2E' },
  btnCancelText: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 },
  btnSave: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, backgroundColor: '#00FF66' },
  btnSaveText: { color: '#0A0F14', fontWeight: '800', fontSize: 12 },
});