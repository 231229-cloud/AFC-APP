import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const PinModal = ({ visible, pin, onClose, onKeyPress }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Ingreso por PIN de Socio</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>Ingresa tu código si el lector de huella falla</Text>

        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, pin.length > i && styles.activeDot]} />
          ))}
        </View>

        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item) => (
            <TouchableOpacity key={item} style={styles.keyBtn} onPress={() => onKeyPress(item)}>
              <Text style={styles.keyText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(5, 7, 11, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 320, backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  subTitle: { color: '#8E8E93', fontSize: 11, marginTop: 4, marginBottom: 16 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 20 },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#161F2E' },
  activeDot: { backgroundColor: '#00FF66' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  keyBtn: { width: 65, height: 50, borderRadius: 10, backgroundColor: '#111823', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#161F2E' },
  keyText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});