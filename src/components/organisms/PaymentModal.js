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
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isWebDesktop = Platform.OS === 'web' && width > 768;

export const PaymentModal = ({ visible, discountPercent = 0, onClose, onConfirmPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState('card'); // 'card', 'spei', 'cash'

  // Formulario Tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Formulario Efectivo
  const [cashDate, setCashDate] = useState('Hoy por la tarde (06:00 PM)');

  // Cálculo con descuento
  const baseAmount = 600;
  const finalAmount = baseAmount - (baseAmount * discountPercent) / 100;
  const amountStr = `$${finalAmount}.00 MXN`;

  const handleProcessPayment = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardHolder) {
        Alert.alert('Incompleto', 'Por favor ingresa los datos de tu tarjeta.');
        return;
      }
      onConfirmPayment({
        method: 'Tarjeta',
        amount: amountStr,
        status: 'Aprobado Instantáneo',
        details: `Tarjeta terminada en ${cardNumber.slice(-4) || '8821'}`,
      });
      Alert.alert(
        '¡Pago Exitoso!',
        'Tu tarjeta ha sido cargada y tu membresía se renovó automáticamente.'
      );
    } else if (selectedMethod === 'spei') {
      onConfirmPayment({
        method: 'Transferencia SPEI',
        amount: amountStr,
        status: 'Comprobante Subido (Pendiente)',
        details: 'Comprobante adjuntado correctamente',
      });
      Alert.alert(
        'Comprobante Enviado',
        'El administrador fue notificado y autorizará tu pago a la brevedad.'
      );
    } else {
      onConfirmPayment({
        method: 'Efectivo en Recepción',
        amount: amountStr,
        status: 'Cita Agendada en Recepción',
        details: `Cita registrada para: ${cashDate}`,
      });
      Alert.alert(
        'Cita Agendada',
        'Tu promesa de pago fue notificada al administrador. Al validar tu huella en recepción se procesará el cobro.'
      );
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* ENCABEZADO */}
          <View style={styles.header}>
            <View>
              <Text style={styles.modalTitle}>Renovar Membresía ({amountStr})</Text>
              {discountPercent > 0 && (
                <Text style={styles.discountTag}>
                  ¡Descuento por racha del {discountPercent}% aplicado!
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          {/* OPCIONES DE MÉTODOS DE PAGO */}
          <View style={styles.methodsRow}>
            <TouchableOpacity
              style={[styles.methodTab, selectedMethod === 'card' && styles.methodTabActive]}
              onPress={() => setSelectedMethod('card')}
            >
              <Ionicons
                name="card-outline"
                size={18}
                color={selectedMethod === 'card' ? '#0A0F14' : '#8E8E93'}
              />
              <Text
                style={[
                  styles.methodTabText,
                  selectedMethod === 'card' && styles.methodTabTextActive,
                ]}
              >
                Tarjeta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodTab, selectedMethod === 'spei' && styles.methodTabActive]}
              onPress={() => setSelectedMethod('spei')}
            >
              <Ionicons
                name="phone-portrait-outline"
                size={18}
                color={selectedMethod === 'spei' ? '#0A0F14' : '#8E8E93'}
              />
              <Text
                style={[
                  styles.methodTabText,
                  selectedMethod === 'spei' && styles.methodTabTextActive,
                ]}
              >
                Transferencia
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodTab, selectedMethod === 'cash' && styles.methodTabActive]}
              onPress={() => setSelectedMethod('cash')}
            >
              <Ionicons
                name="cash-outline"
                size={18}
                color={selectedMethod === 'cash' ? '#0A0F14' : '#8E8E93'}
              />
              <Text
                style={[
                  styles.methodTabText,
                  selectedMethod === 'cash' && styles.methodTabTextActive,
                ]}
              >
                Efectivo
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 12 }}>
            {/* OPCIÓN 1: TARJETA */}
            {selectedMethod === 'card' && (
              <View style={styles.formContainer}>
                <Text style={styles.infoBoxText}>
                  💳 El cobro se procesa en tiempo real con cargo a tu banco y renueva tu acceso al instante.
                </Text>

                <Text style={styles.label}>Número de Tarjeta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="4152 0000 0000 0000"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                />

                <Text style={styles.label}>Nombre del Titular</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Como aparece en la tarjeta"
                  placeholderTextColor="#8E8E93"
                  value={cardHolder}
                  onChangeText={setCardHolder}
                />

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Vencimiento</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/AA"
                      placeholderTextColor="#8E8E93"
                      value={expiry}
                      onChangeText={setExpiry}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      secureTextEntry
                      value={cvv}
                      onChangeText={setCvv}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* OPCIÓN 2: SPEI */}
            {selectedMethod === 'spei' && (
              <View style={styles.formContainer}>
                <View style={styles.speiCard}>
                  <Text style={styles.speiTitle}>Datos para Transferencia SPEI</Text>
                  <Text style={styles.speiText}>
                    Banco: <Text style={styles.boldText}>BBVA Bancomer</Text>
                  </Text>
                  <Text style={styles.speiText}>
                    CLABE: <Text style={styles.boldText}>012 180 01592837412 9</Text>
                  </Text>
                  <Text style={styles.speiText}>
                    Beneficiario: <Text style={styles.boldText}>AFC Gym & Fitness S.A.</Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.btnUploadReceipt}
                  onPress={() => Alert.alert('Comprobante', 'Imagen adjuntada correctamente.')}
                >
                  <Ionicons name="cloud-upload-outline" size={20} color="#00FF66" />
                  <Text style={styles.btnUploadText}>Subir Comprobante / Voucher</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* OPCIÓN 3: EFECTIVO */}
            {selectedMethod === 'cash' && (
              <View style={styles.formContainer}>
                <Text style={styles.infoBoxText}>
                  💵 Agenda la hora en que pasarás a caja en recepción para tener tu recibo impreso listo.
                </Text>

                <Text style={styles.label}>Horario sugerido de visita a recepción</Text>
                <TextInput
                  style={styles.input}
                  value={cashDate}
                  onChangeText={setCashDate}
                  placeholder="Ej. Hoy a las 6:00 PM"
                  placeholderTextColor="#8E8E93"
                />
              </View>
            )}
          </ScrollView>

          {/* ACCIONES */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSubmit} onPress={handleProcessPayment}>
              <Text style={styles.btnSubmitText}>
                {selectedMethod === 'card'
                  ? `Pagar ${amountStr}`
                  : selectedMethod === 'spei'
                  ? 'Enviar Comprobante'
                  : 'Confirmar Cita'}
              </Text>
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
    backgroundColor: 'rgba(5, 7, 11, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: isWebDesktop ? 500 : '95%',
    maxHeight: '90%',
    backgroundColor: '#0B0F17',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  discountTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00FF66',
    marginTop: 2,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  methodTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    paddingVertical: 10,
    borderRadius: 10,
  },
  methodTabActive: {
    backgroundColor: '#00FF66',
    borderColor: '#00FF66',
  },
  methodTabText: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
  },
  methodTabTextActive: {
    color: '#0A0F14',
    fontWeight: '800',
  },

  formContainer: {
    marginTop: 8,
  },
  infoBoxText: {
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 16,
  },
  label: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#111823',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#161F2E',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    height: 40,
    fontSize: 13,
    marginBottom: 10,
  },

  speiCard: {
    backgroundColor: '#111823',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#161F2E',
    marginBottom: 12,
  },
  speiTitle: {
    color: '#00FF66',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  speiText: {
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 4,
  },
  boldText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  btnUploadReceipt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#00FF66',
    borderRadius: 10,
    height: 42,
  },
  btnUploadText: {
    color: '#00FF66',
    fontSize: 13,
    fontWeight: '600',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#161F2E',
  },
  btnCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#161F2E',
  },
  btnCancelText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  btnSubmit: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#00FF66',
  },
  btnSubmitText: {
    color: '#0A0F14',
    fontWeight: '800',
    fontSize: 13,
  },
});