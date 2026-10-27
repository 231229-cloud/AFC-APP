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

import AFC1Image from '../../../assets/AFC1.jpg';

const DEFAULT_CLASSES = [
  {
    id: 'm1',
    shift: 'Matutino',
    time: '06:00 AM - 07:00 AM',
    maxCapacity: 20,
    booked: 12,
  },
  {
    id: 'm2',
    shift: 'Matutino',
    time: '07:00 AM - 08:00 AM',
    maxCapacity: 25,
    booked: 25,
  },
  {
    id: 'm3',
    shift: 'Matutino',
    time: '08:00 AM - 09:00 AM',
    maxCapacity: 20,
    booked: 8,
  },
  {
    id: 'v1',
    shift: 'Vespertino',
    time: '05:00 PM - 06:00 PM',
    maxCapacity: 20,
    booked: 15,
  },
  {
    id: 'v2',
    shift: 'Vespertino',
    time: '06:00 PM - 07:00 PM',
    maxCapacity: 30,
    booked: 30,
  },
  {
    id: 'v3',
    shift: 'Vespertino',
    time: '07:00 PM - 08:00 PM',
    maxCapacity: 25,
    booked: 20,
  },
  {
    id: 'v4',
    shift: 'Vespertino',
    time: '08:00 PM - 09:00 PM',
    maxCapacity: 20,
    booked: 5,
  },
  {
    id: 'v5',
    shift: 'Vespertino',
    time: '09:00 PM - 10:00 PM',
    maxCapacity: 15,
    booked: 4,
  },
];

export const ScheduleModal = ({
  visible,
  currentSchedule,
  onClose,
  onSelectSchedule,
}) => {
  const [selected, setSelected] = useState(
    currentSchedule || '06:00 AM - 07:00 AM'
  );

  const handleConfirm = () => {
    const selectedClass = DEFAULT_CLASSES.find(
      (c) => c.time === selected
    );

    if (
      selectedClass &&
      selectedClass.booked >= selectedClass.maxCapacity
    ) {
      Alert.alert(
        'Cupo Agotado',
        'Esta clase ya alcanzó el límite máximo de asistentes.'
      );
      return;
    }

    onSelectSchedule(selected);

    Alert.alert(
      'Horario Confirmado 🏋️',
      `Tu lugar para el turno de ${selected} ha sido reservado.`
    );

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
          name={
            isFull
              ? 'close-circle-outline'
              : isSelected
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={18}
          color={
            isFull
              ? '#FF453A'
              : isSelected
              ? '#00FF66'
              : '#D0D0D0'
          }
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

          <Text
            style={[
              styles.badgeText,
              isFull
                ? styles.badgeFull
                : styles.badgeAvailable,
            ]}
          >
            {isFull
              ? 'LLENO'
              : `${item.booked}/${item.maxCapacity}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        {/* CONTENEDOR DEL MODAL */}
        <View style={styles.cardContainer}>

          {/* IMAGEN DE FONDO */}
          <ImageBackground
            source={AFC1Image}
            style={styles.cardBg}
            imageStyle={styles.bgImageStyle}
          >

            {/* CAPA OSCURA MUY LIGERA */}
            <View
              pointerEvents="none"
              style={styles.imageOverlay}
            />

            {/* CONTENIDO */}
            <View style={styles.content}>

              {/* ENCABEZADO */}
              <View style={styles.header}>
                <View style={styles.titleGroup}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color="#00FF66"
                  />

                  <Text style={styles.title}>
                    Seleccionar Horario de Clase
                  </Text>
                </View>

                <TouchableOpacity onPress={onClose}>
                  <Ionicons
                    name="close"
                    size={22}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>

              {/* DESCRIPCIÓN */}
              <Text style={styles.subTitle}>
                Elige el bloque en el que entrenarás hoy.
                Las clases sin cupo quedan deshabilitadas:
              </Text>

              {/* LISTA */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scheduleScroll}
                contentContainerStyle={styles.scheduleContent}
              >

                {/* MATUTINO */}
                <Text style={styles.sectionHeader}>
                  Turno Matutino
                </Text>

                {DEFAULT_CLASSES
                  .filter((c) => c.shift === 'Matutino')
                  .map(renderOption)}

                {/* VESPERTINO */}
                <Text
                  style={[
                    styles.sectionHeader,
                    styles.eveningHeader,
                  ]}
                >
                  Turno Vespertino
                </Text>

                {DEFAULT_CLASSES
                  .filter((c) => c.shift === 'Vespertino')
                  .map(renderOption)}

              </ScrollView>

              {/* BOTONES */}
              <View style={styles.actionsRow}>

                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={onClose}
                >
                  <Text style={styles.btnCancelText}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnConfirm}
                  onPress={handleConfirm}
                >
                  <Text style={styles.btnConfirmText}>
                    Reservar Lugar
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  /* =========================================
     FONDO DEL MODAL
  ========================================= */

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 11, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  /* =========================================
     CONTENEDOR
  ========================================= */

  cardContainer: {
    width: '100%',
    maxWidth: 380,

    borderRadius: 16,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: '#161F2E',

    backgroundColor: '#0B0F17',
  },

  /* =========================================
     IMAGEN DE FONDO
  ========================================= */

  cardBg: {
    width: '100%',
    padding: 20,
    position: 'relative',
  },

  bgImageStyle: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: '100%',
    height: '100%',

    resizeMode: 'cover',

    /*
      MÁS VISIBILIDAD DE LA IMAGEN
    */
    opacity: 0.55,
  },

  /* =========================================
     CAPA SOBRE LA IMAGEN
  ========================================= */

  imageOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    /*
      MUCHO MÁS TRANSPARENTE
    */
    backgroundColor: 'rgba(5, 10, 15, 0.15)',
  },

  /* =========================================
     CONTENIDO
  ========================================= */

  content: {
    position: 'relative',
    zIndex: 2,
  },

  /* =========================================
     HEADER
  ========================================= */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 8,
  },

  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,

    flex: 1,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',
  },

  /* =========================================
     SUBTÍTULO
  ========================================= */

  subTitle: {
    color: '#FFFFFF',

    fontSize: 11,

    marginBottom: 14,

    lineHeight: 16,

    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },

  /* =========================================
     TÍTULOS DE SECCIÓN
  ========================================= */

  sectionHeader: {
    color: '#00FF66',

    fontSize: 11,

    fontWeight: '800',

    marginBottom: 8,

    textTransform: 'uppercase',

    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },

  eveningHeader: {
    marginTop: 14,
  },

  /* =========================================
     SCROLL
  ========================================= */

  scheduleScroll: {
    maxHeight: 320,
  },

  scheduleContent: {
    paddingBottom: 2,
  },

  /* =========================================
     HORARIOS / INPUTS
  ========================================= */

  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,

    /*
      MÁS TRANSPARENTE
    */
    backgroundColor: 'rgba(17, 24, 35, 0.42)',

    borderWidth: 1,

    /*
      BORDE LIGERAMENTE VISIBLE
    */
    borderColor: 'rgba(255, 255, 255, 0.25)',

    paddingHorizontal: 12,
    paddingVertical: 10,

    borderRadius: 8,

    marginBottom: 6,
  },

  /* =========================================
     HORARIO SELECCIONADO
  ========================================= */

  timeOptionActive: {
    borderColor: '#00FF66',

    /*
      VERDE TRANSPARENTE
    */
    backgroundColor: 'rgba(0, 255, 102, 0.16)',

    shadowColor: '#00FF66',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  /* =========================================
     HORARIO LLENO
  ========================================= */

  timeOptionDisabled: {
    backgroundColor: 'rgba(11, 15, 23, 0.40)',

    borderColor: 'rgba(255, 255, 255, 0.12)',

    opacity: 0.55,
  },

  /* =========================================
     TEXTO
  ========================================= */

  optionTextRow: {
    flex: 1,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  timeText: {
    color: '#FFFFFF',

    fontSize: 13,

    fontWeight: '600',

    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },

  timeTextActive: {
    color: '#FFFFFF',

    fontWeight: '800',
  },

  disabledText: {
    color: '#8E8E93',

    textDecorationLine: 'line-through',
  },

  /* =========================================
     BADGES
  ========================================= */

  badgeText: {
    fontSize: 10,

    fontWeight: '800',

    paddingHorizontal: 6,
    paddingVertical: 2,

    borderRadius: 4,
  },

  badgeAvailable: {
    color: '#00FF66',

    backgroundColor: 'rgba(0, 255, 102, 0.12)',
  },

  badgeFull: {
    color: '#FF453A',

    backgroundColor: 'rgba(255, 69, 58, 0.15)',
  },

  /* =========================================
     BOTONES
  ========================================= */

  actionsRow: {
    flexDirection: 'row',

    justifyContent: 'flex-end',

    gap: 10,

    marginTop: 16,

    paddingTop: 12,

    borderTopWidth: 1,

    borderTopColor: 'rgba(255,255,255,0.18)',
  },

  btnCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 8,

    backgroundColor: 'rgba(22, 31, 46, 0.70)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  btnCancelText: {
    color: '#FFFFFF',

    fontWeight: '600',

    fontSize: 12,
  },

  btnConfirm: {
    paddingVertical: 10,
    paddingHorizontal: 18,

    borderRadius: 8,

    backgroundColor: '#00FF66',
  },

  btnConfirmText: {
    color: '#0A0F14',

    fontWeight: '800',

    fontSize: 12,
  },
});

export default ScheduleModal;