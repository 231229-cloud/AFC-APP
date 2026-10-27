import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const RoutineBanner = ({ onPress }) => (
  <View style={styles.container}>
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800' }}
      style={styles.bg}
      imageStyle={{ borderRadius: 16, opacity: 0.35 }}
    >
      <View style={styles.content}>
        <View style={styles.infoGroup}>
          {/* Cuadro verde neón con icono de pesas en negro */}
          <View style={styles.iconSquare}>
            <Ionicons name="barbell" size={20} color="#0A0F14" />
          </View>

          <View>
            <Text style={styles.title}>Mi Rutina de Pesas</Text>
            <Text style={styles.subtitle}>Pecho & Tríceps</Text>
            <Text style={styles.coach}>Coach Alex</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.btnText}>Ver rutina →</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00FF66',
    overflow: 'hidden',
    marginBottom: 20,
  },
  bg: {
    flex: 1,
    backgroundColor: '#0B0F17',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconSquare: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#00FF66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  subtitle: {
    color: '#00FF66',
    fontSize: 11,
    fontWeight: '700',
  },
  coach: {
    color: '#8E8E93',
    fontSize: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#00FF66',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(5, 7, 11, 0.6)',
  },
  btnText: {
    color: '#00FF66',
    fontSize: 11,
    fontWeight: '800',
  },
});