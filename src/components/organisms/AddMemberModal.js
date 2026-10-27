import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MEMBERSHIP_OPTIONS = [
  'Semanal',
  'Quincenal',
  'Mensual',
  'Trimestral',
  'Anual',
];

export const AddMemberModal = ({ visible, onClose, onSaveMember }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [membership, setMembership] = useState('Semanal');
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [expirationDate, setExpirationDate] = useState('26/10/2026');
  
  // Estado para la Huella Digital
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Simulación de lectura biométrica por sensor USB
  const handleRegisterFingerprint = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFingerprintRegistered(true);
      Alert.alert('Lector Biométrico', 'Huella capturada y enlazada correctamente.');
    }, 1500);
  };

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Campo obligatorio', 'Por favor ingresa el nombre completo del socio.');
      return;
    }

    const newMember = {
      id: `SOC-${Date.now()}`,
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      membership,
      expirationDate,
      fingerprintRegistered,
      status: 'Activo',
    };

    onSaveMember(newMember);

    // Resetear campos
    setFullName('');
    setPhone('');
    setEmail('');
    setMembership('Semanal');
    setShowMembershipDropdown(false);
    setExpirationDate('26/10/2026');
    setFingerprintRegistered(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Agregar socio</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={18} color="#C5C5C5" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {/* Nombre completo */}
            <View style={styles.fieldBox}>
              <Text style={styles.label}>Nombre completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre y apellidos"
                placeholderTextColor="#4B5563"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Fila: Teléfono y Correo */}
            <View style={styles.row}>
              <View style={[styles.fieldBox, { flex: 1 }]}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número de contacto"
                  placeholderTextColor="#4B5563"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <View style={[styles.fieldBox, { flex: 1 }]}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#4B5563"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Fila: Membresía y Fecha de vencimiento */}
            <View style={[styles.row, { zIndex: 10 }]}>
              {/* Selector de Membresía */}
              <View style={[styles.fieldBox, { flex: 1 }]}>
                <Text style={styles.label}>Membresía *</Text>
                <TouchableOpacity
                  style={[
                    styles.selectBox,
                    showMembershipDropdown && styles.selectBoxActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setShowMembershipDropdown(!showMembershipDropdown)}
                >
                  <Text style={styles.selectText}>{membership}</Text>
                  <Ionicons
                    name={showMembershipDropdown ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#00FF66"
                  />
                </TouchableOpacity>

                {/* Desplegable de Opciones */}
                {showMembershipDropdown && (
                  <View style={styles.dropdownList}>
                    {MEMBERSHIP_OPTIONS.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        style={[
                          styles.dropdownItem,
                          membership === opt && styles.dropdownItemActive,
                        ]}
                        onPress={() => {
                          setMembership(opt);
                          setShowMembershipDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownText,
                            membership === opt && styles.dropdownTextActive,
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Fecha de vencimiento */}
              <View style={[styles.fieldBox, { flex: 1 }]}>
                <Text style={styles.label}>Fecha de vencimiento *</Text>
                <View style={styles.dateInputBox}>
                  <TextInput
                    style={styles.dateInput}
                    value={expirationDate}
                    onChangeText={setExpirationDate}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#4B5563"
                  />
                  <Ionicons name="calendar-outline" size={18} color="#374151" />
                </View>
              </View>
            </View>

            {/* SECCIÓN BIOMÉTRICA: ENLAZAR HUELLA DIGITAL */}
            <View style={styles.fingerprintSection}>
              <Text style={styles.label}>Acceso Biométrico</Text>
              <TouchableOpacity
                style={[
                  styles.btnFingerprint,
                  fingerprintRegistered && styles.btnFingerprintSuccess,
                ]}
                onPress={handleRegisterFingerprint}
                disabled={isScanning}
              >
                <Ionicons
                  name={fingerprintRegistered ? 'checkmark-circle' : 'finger-print'}
                  size={20}
                  color={fingerprintRegistered ? '#0A0F14' : '#00FF66'}
                />
                <Text
                  style={[
                    styles.btnFingerprintText,
                    fingerprintRegistered && styles.btnFingerprintTextSuccess,
                  ]}
                >
                  {isScanning
                    ? 'Coloque el dedo en el sensor...'
                    : fingerprintRegistered
                    ? 'Huella Digital Registrada'
                    : 'Enlazar Huella Digital'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Botones Cancelar y Guardar */}
          <View style={styles.actionsRow}>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 560,
    backgroundColor: '#09100B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#17271D',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E2922',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldBox: {
    marginBottom: 16,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#050A07',
    borderWidth: 1,
    borderColor: '#18281E',
    borderRadius: 8,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#050A07',
    borderWidth: 1,
    borderColor: '#18281E',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
  },
  selectBoxActive: {
    borderColor: '#00FF66',
  },
  selectText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  dropdownList: {
    backgroundColor: '#050A07',
    borderWidth: 1,
    borderColor: '#00FF66',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -2,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dropdownItemActive: {
    backgroundColor: '#525252',
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  dropdownTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dateInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#050A07',
    borderWidth: 1,
    borderColor: '#18281E',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
  },
  dateInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  // Huella digital
  fingerprintSection: {
    marginTop: 4,
    marginBottom: 16,
  },
  btnFingerprint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#050A07',
    borderWidth: 1,
    borderColor: '#00FF66',
    borderRadius: 8,
    height: 44,
  },
  btnFingerprintSuccess: {
    backgroundColor: '#00FF66',
    borderColor: '#00FF66',
  },
  btnFingerprintText: {
    color: '#00FF66',
    fontSize: 13,
    fontWeight: '700',
  },
  btnFingerprintTextSuccess: {
    color: '#0A0F14',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  btnCancel: {
    backgroundColor: '#0D1711',
    borderWidth: 1,
    borderColor: '#1C2C21',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnCancelText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  btnSave: {
    backgroundColor: '#00FF66',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  btnSaveText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 13,
  },
});