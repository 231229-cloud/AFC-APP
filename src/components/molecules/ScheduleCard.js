import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 👈 IMPORTACIÓN DIRECTA DE TU IMAGEN
// Si ScheduleModal.js está en src/components/organisms/ y tu imagen en assets/
import AFC1Image from '../../../assets/AFC1.jpg';

const DEFAULT_CLASSES = [
  { id: 'm1', shift: 'Matutino', time: '06:00 AM - 07:00 AM', maxCapacity: 20, booked: 12 },
  { id: 'm2', shift: 'Matutino', time: '07:00 AM - 08:00 AM', maxCapacity: 25, booked: 25 }, // AGOTADO
  { id: 'm3', shift: 'Matutino', time: '08:00 AM - 09:00 AM', maxCapacity: 20, booked: 8 },
  { id: 'v1', shift: 'Vespertino', time: '05:00 PM - 06:00 PM', maxCapacity: 20, booked: 15 },
  { id: 'v2', shift: 'Vespertino', time: '06:00 PM - 07:00 PM', maxCapacity: 30, booked: 30 }, // AGOTADO
  { id: 'v3', shift: 'Vespertino', time: '07:00 PM - 08:00 PM', maxCapacity: 25, booked: 20 },
  { id: 'v4', shift: 'Vespertino', time: '08:00 PM - 09:00 PM', maxCapacity: 20, booked: 5 },
  { id: 'v5', shift: 'Vespertino', time: '09:00 PM - 10:00 PM', maxCapacity: 15, booked: 4 },
];

export const ScheduleModal = ({ visible, currentSchedule, onClose, onSelectSchedule }) => {
  const [selected, setSelected] = useState(currentSchedule || '06:00 AM - 07:00 AM');

  const handleConfirm = () => {
    const selectedClass = DEFAULT_CLASSES.find((c) => c.time === selected);

    if (selectedClass && selectedClass.booked >= selectedClass.maxCapacity) {
      Alert.alert('Cupo Agotado', 'Esta clase ya alcanzó el límite máximo de asistentes.');
      return;
    }

    onSelectSchedule(selected);
    Alert.alert('Horario Confirmado 🏋️', `Tu lugar para el turno de ${selected} ha sido reservado.`);
    onClose();
  };

  const renderOption = (item) => {
    const isFull = item.booked >= item.maxCapacity;
    const isSelected = selected === item.time;

    return (
      <TouchableOpacity
        key={item.id}
        disabled={isFull}
        style={[
          styles.timeOption,
          isSelected && styles.timeOptionActive,
          isFull && styles.timeOptionDisabled,
        ]}
        onPress={() => setSelected(item.time)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFull ? 'close-circle-outline' : isSelected ? 'radio-button-on' : 'radio-button-off'}
          size={18}
          color={isFull ? '#FF453A' : isSelected ? '#00FF66' : '#8E8E93'}
        />

        <View style={styles.optionTextRow}>
          <Text
            style={[
              styles.timeText,
              isSelected && styles.timeTextActive,
              isFull && styles.disabledText,
            ]}
          >
            {item.time}
          </Text>

          <Text style={[styles.badgeText, isFull ? styles.badgeFull : styles.badgeAvailable]}>
            {isFull ? 'LLENO' : `${item.booked}/${item.maxCapacity}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={AFC1Image} // 👈 Renderizado de tu imagen local
            style={styles.cardBg}
            imageStyle={{
              opacity: 0.35, // Aumenté la opacidad para que se distinga bien la imagen
              borderRadius: 16,
              resizeMode: 'cover',
            }}
          >
            {/* ENCABEZADO */}
            <View style={styles.header}>
              <View style={styles.titleGroup}>
                <Ionicons name="time-outline" size={20} color="#00FF66" />
                <Text style={styles.title}>Seleccionar Horario de Clase</Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={22} color="#8E8E93" />
              </TouchableOpacity>
            </View>

            <Text style={styles.subTitle}>
              Elige el bloque en el que entrenarás hoy. Las clases sin cupo quedan deshabilitadas:
            </Text>

            {/* LISTADO DE HORARIOS */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 320 }}>
              <Text style={styles.sectionHeader}>Turno Matutino</Text>
              {DEFAULT_CLASSES.filter((c) => c.shift === 'Matutino').map(renderOption)}

              <Text style={[styles.sectionHeader, { marginTop: 14 }]}>Turno Vespertino</Text>
              {DEFAULT_CLASSES.filter((c) => c.shift === 'Vespertino').map(renderOption)}
            </ScrollView>

            {/* BOTONES DE ACCIÓN */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
                <Text style={styles.btnCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirm}>
                <Text style={styles.btnConfirmText}>Reservar Lugar</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    overflow: 'hidden',
  },
  cardBg: {
    padding: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  subTitle: { color: '#8E8E93', fontSize: 11, marginBottom: 14, lineHeight: 16 },
  sectionHeader: {
    color: '#00FF66',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(17, 24, 35, 0.85)',
    borderWidth: 1,
    borderColor: '#161F2E',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  timeOptionActive: {
    borderColor: '#00FF66',
    backgroundColor: 'rgba(0, 255, 102, 0.12)',
  },
  timeOptionDisabled: {
    backgroundColor: 'rgba(11, 15, 23, 0.6)',
    borderColor: '#161F2E',
    opacity: 0.5,
  },
  optionTextRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: { color: '#8E8E93', fontSize: 13, fontWeight: '600' },
  timeTextActive: { color: '#FFFFFF', fontWeight: '800' },
  disabledText: {
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeAvailable: {
    color: '#00FF66',
    backgroundColor: 'rgba(0, 255, 102, 0.1)',
  },
  badgeFull: {
    color: '#FF453A',
    backgroundColor: 'rgba(255, 69, 58, 0.15)',
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
  btnCancelText: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 },
  btnConfirm: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#00FF66',
  },
  btnConfirmText: { color: '#0A0F14', fontWeight: '800', fontSize: 12 },
});

export default ScheduleModal;