import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AddSupplierModal = ({ visible, onClose, onSaveSupplier }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Suplementos');

  const handleSave = () => {
    if (!name.trim() || !contact.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa el nombre y contacto del proveedor.');
      return;
    }

    const newSupplier = {
      id: `S-${Date.now()}`,
      name: name.trim(),
      contact: contact.trim(),
      phone: phone.trim() || 'Sin teléfono',
      category: category.trim() || 'General',
    };

    onSaveSupplier(newSupplier);
    setName('');
    setContact('');
    setPhone('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>Nuevo Proveedor</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nombre de la empresa / proveedor *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Optimum Nutrition"
            placeholderTextColor="#8E8E93"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Correo / Persona de contacto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. ventas@on.com"
            placeholderTextColor="#8E8E93"
            value={contact}
            onChangeText={setContact}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 555-0192"
            placeholderTextColor="#8E8E93"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Categoría principal</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Suplementos"
            placeholderTextColor="#8E8E93"
            value={category}
            onChangeText={setCategory}
          />

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Ionicons name="checkmark-circle" size={18} color="#0A0F14" />
              <Text style={styles.btnSaveText}>Guardar Proveedor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: 420, backgroundColor: '#0B0F17', borderRadius: 20, borderWidth: 1, borderColor: '#161F2E', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  label: { color: '#8E8E93', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#111823', borderRadius: 10, borderWidth: 1, borderColor: '#161F2E', color: '#FFFFFF', paddingHorizontal: 12, height: 42, fontSize: 14, marginBottom: 14 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 10 },
  btnCancel: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, backgroundColor: '#161F2E' },
  btnCancelText: { color: '#FFFFFF', fontWeight: '600' },
  btnSave: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, backgroundColor: '#00FF66' },
  btnSaveText: { color: '#0A0F14', fontWeight: '700' },
});