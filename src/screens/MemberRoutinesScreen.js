import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const MemberRoutinesScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('Lunes');

  const routineData = {
    title: 'Rutina Diaria Asignada',
    coach: 'Coach Alex',
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    
    // Lista de 8 ejercicios para el día con sus videos individuales
    exercisesByDay: {
      Lunes: [
        {
          id: '1',
          name: 'Press de Banca Inclinado con Mancuernas',
          sets: '4',
          reps: '10-12',
          rest: '90s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '2',
          name: 'Press Banco Plano con Barra',
          sets: '4',
          reps: '8-10',
          rest: '90s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '3',
          name: 'Aperturas en Polea Alta',
          sets: '3',
          reps: '12-15',
          rest: '60s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '4',
          name: 'Press Militar con Mancuernas',
          sets: '4',
          reps: '10',
          rest: '75s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '5',
          name: 'Elevaciones Laterales en Polea',
          sets: '4',
          reps: '15',
          rest: '45s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '6',
          name: 'Press Francés con Barra Z',
          sets: '3',
          reps: '12',
          rest: '60s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '7',
          name: 'Extensión de Tríceps en Cuerda',
          sets: '4',
          reps: '15',
          rest: '45s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
          id: '8',
          name: 'Fondos en Paralelas (Dips)',
          sets: '3',
          reps: 'Al fallo',
          rest: '60s',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
      ],
    },
  };

  const currentExercises = routineData.exercisesByDay[selectedDay] || routineData.exercisesByDay['Lunes'];

  const renderVideo = (videoUrl) => {
    if (!videoUrl) return null;

    if (Platform.OS === 'web') {
      return (
        <iframe
          width="100%"
          height="180"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 10, border: 'none' }}
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Entrenamieno del Día</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.routineHeaderCard}>
          <View style={styles.coachBadge}>
            <Ionicons name="person-circle-outline" size={14} color="#00FF66" />
            <Text style={styles.coachText}>{routineData.coach}</Text>
          </View>
          <Text style={styles.routineTitle}>{routineData.title}</Text>
        </View>

        {/* SELECTOR DE DÍA */}
        <Text style={styles.daysLabel}>SELECCIONA EL DÍA</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
          {routineData.days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayTab, selectedDay === day && styles.dayTabActive]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayTabText, selectedDay === day && styles.dayTabTextActive]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionHeaderTitle}>
          EJERCICIOS Y VIDEOS EXPLICATIVOS ({currentExercises.length} MOVIMIENTOS)
        </Text>

        {/* TARJETAS CON VIDEO INDIVIDUAL POR CADA EJERCICIO */}
        {currentExercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.exerciseNumber}>EJERCICIO #{index + 1}</Text>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
            </View>

            {/* Video Explicativo individual de este ejercicio */}
            <View style={styles.mediaContainer}>
              {renderVideo(exercise.videoUrl)}
            </View>

            {/* Métricas (Series, Reps, Descanso) */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>SERIES</Text>
                <Text style={styles.statValue}>{exercise.sets}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>REPETICIONES</Text>
                <Text style={styles.statValueHighlight}>{exercise.reps}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>DESCANSO</Text>
                <Text style={styles.statValue}>{exercise.rest}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MemberHome')}>
          <Ionicons name="home-outline" size={22} color="#8E8E93" />
          <Text style={styles.tabLabel}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="barbell" size={22} color="#00FF66" />
          <Text style={styles.tabLabelActive}>Rutinas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MemberHome')}>
          <Ionicons name="card-outline" size={22} color="#8E8E93" />
          <Text style={styles.tabLabel}>Pagos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MemberHome')}>
          <Ionicons name="person-outline" size={22} color="#8E8E93" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05070B' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 90 },

  header: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#070A0F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#161F2E',
  },
  btnBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0B0F17',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#161F2E',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  routineHeaderCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  coachBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: 'rgba(0, 255, 102, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00FF66',
    marginBottom: 8,
  },
  coachText: { color: '#00FF66', fontSize: 11, fontWeight: '700' },
  routineTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },

  daysLabel: { color: '#8E8E93', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 10 },
  daysScroll: { marginBottom: 20 },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#161F2E',
    marginRight: 8,
  },
  dayTabActive: { backgroundColor: '#00FF66', borderColor: '#00FF66' },
  dayTabText: { color: '#8E8E93', fontSize: 12, fontWeight: '600' },
  dayTabTextActive: { color: '#0A0F14', fontWeight: '700' },

  sectionHeaderTitle: { color: '#8E8E93', fontSize: 11, fontWeight: '800', letterSpacing: 0.8, marginBottom: 14 },

  exerciseCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 14,
    marginBottom: 20,
  },
  cardHeader: { marginBottom: 10 },
  exerciseNumber: { color: '#00FF66', fontSize: 11, fontWeight: '800', marginBottom: 2 },
  exerciseName: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },

  mediaContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000000',
    minHeight: 180,
    marginBottom: 12,
  },

  statsGrid: { flexDirection: 'row', gap: 8 },
  statBox: {
    flex: 1,
    backgroundColor: '#070A0F',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#161F2E',
    alignItems: 'center',
  },
  statLabel: { color: '#8E8E93', fontSize: 9, fontWeight: '700', marginBottom: 2 },
  statValue: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  statValueHighlight: { color: '#00FF66', fontSize: 13, fontWeight: '800' },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#070A0F',
    borderTopWidth: 1,
    borderTopColor: '#161F2E',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { color: '#8E8E93', fontSize: 10, fontWeight: '600', marginTop: 4 },
  tabLabelActive: { color: '#00FF66', fontSize: 10, fontWeight: '700', marginTop: 4 },
});

export default MemberRoutinesScreen;