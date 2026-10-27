import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HeroRecommendationCard = ({ dayName, bestTime, bestCoach }) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' }}
        style={styles.bgImage}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.overlay}>
          <View style={styles.headerGroup}>
            <View style={styles.iconCircle}>
              <Ionicons name="flash" size={18} color="#00FF66" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Inteligencia de Aforo Semestral</Text>
              <Text style={styles.subtitle}>Análisis automatizado por huella digital</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.recommendationLabel}>MEJOR HORA PARA HOY ({dayName.toUpperCase()})</Text>
          <Text style={styles.timeHighlight}>{bestTime}</Text>

          <View style={styles.coachNotice}>
            <Ionicons name="fitness-outline" size={14} color="#00FF66" />
            <Text style={styles.coachNoticeText}>
              Coach en turno sugerido: <Text style={{ color: '#FFF', fontWeight: '800' }}>{bestCoach}</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00FF66',
    marginTop: 16,
    marginBottom: 20,
  },
  bgImage: { width: '100%' },
  overlay: {
    backgroundColor: 'rgba(5, 7, 11, 0.88)',
    padding: 16,
  },
  headerGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 255, 102, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF66',
  },
  title: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  subtitle: { color: '#8E8E93', fontSize: 11 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 12 },
  recommendationLabel: { color: '#8E8E93', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  timeHighlight: { color: '#00FF66', fontSize: 22, fontWeight: '900', marginVertical: 4 },
  coachNotice: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  coachNoticeText: { color: '#8E8E93', fontSize: 11 },
});