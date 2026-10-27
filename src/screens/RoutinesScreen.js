import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { AddRoutineModal } from '../components/organisms/AddRoutineModal';

const INITIAL_ROUTINES = [
  {
    id: 'RUT-101',
    day: 'Lunes',
    title: 'Pecho, Hombro & Tríceps (Hipertrofia)',
    coach: 'Coach Alex',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Enfoque en tempo 3-1-1 y aislamiento muscular. Muestra control sin balanceo.',
    createdAt: '20/10/2026',
    exercises: [
      { name: 'Press Banco Inclinado con Barra', sets: '4', reps: '10-12', rest: '90s' },
      { name: 'Press Plano con Mancuernas', sets: '4', reps: '10-12', rest: '90s' },
      { name: 'Aperturas en Polea Alta', sets: '3', reps: '12-15', rest: '60s' },
      { name: 'Press Militar con Mancuernas', sets: '4', reps: '10', rest: '75s' },
      { name: 'Elevaciones Laterales en Polea', sets: '4', reps: '15', rest: '45s' },
      { name: 'Press Francés Banco Plano', sets: '3', reps: '12', rest: '60s' },
      { name: 'Extensión Tríceps en Cuerda', sets: '4', reps: '15', rest: '45s' },
      { name: 'Fondos en Paralelas (Dips)', sets: '3', reps: 'Al fallo', rest: '60s' },
    ],
  },
  {
    id: 'RUT-102',
    day: 'Martes',
    title: 'Pierna Completa Enfoque Quadriceps',
    coach: 'Coach Sarah',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Rutina pesada de tren inferior. Mantener profundidad técnica en sentadilla.',
    createdAt: '18/10/2026',
    exercises: [
      { name: 'Sentadilla Libre Profunda', sets: '5', reps: '6-8', rest: '120s' },
      { name: 'Prensa 45 Grados', sets: '4', reps: '10-12', rest: '90s' },
      { name: 'Prensa Hack', sets: '3', reps: '12', rest: '90s' },
      { name: 'Extensión de Cuádriceps', sets: '4', reps: '15', rest: '60s' },
      { name: 'Hip Thrust con Barra', sets: '4', reps: '10-12', rest: '90s' },
      { name: 'Curl Femoral Tumbado', sets: '4', reps: '12-15', rest: '60s' },
      { name: 'Zancadas Caminando con Mancuernas', sets: '3', reps: '12 por pierna', rest: '60s' },
      { name: 'Elevación de Talones en Máquina', sets: '5', reps: '15-20', rest: '45s' },
    ],
  },
];

export const RoutinesScreen = ({ navigation }) => {
  const [routines, setRoutines] = useState(INITIAL_ROUTINES);
  const [selectedRoutine, setSelectedRoutine] = useState(INITIAL_ROUTINES[0]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveRoutine = (newRoutine) => {
    setRoutines([newRoutine, ...routines]);
    setSelectedRoutine(newRoutine);
  };

  const openVideoLink = (url) => {
    if (url) {
      Linking.openURL(url).catch(() => {});
    }
  };

  const filteredRoutines = routines.filter((r) => {
    return (
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.coach.toLowerCase().includes(search.toLowerCase()) ||
      r.day?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout navigation={navigation} activeRoute="Rutinas">
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.title}>Panel de Rutinas del Gym</Text>
          <Text style={styles.subTitle}>Crea y gestiona las rutinas semanales asignadas a los atletas</Text>
        </View>

        <TouchableOpacity style={styles.btnAdd} onPress={() => setShowAddModal(true)}>
          <Ionicons name="add-circle" size={18} color="#0A0F14" />
          <Text style={styles.btnAddText}>Agregar Rutina Diaria</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.layoutRow}>
        {/* LADO IZQUIERDO: RUTINAS REGISTRADAS */}
        <View style={styles.listSection}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color="#8E8E93" />
            <TextInput
              placeholder="Buscar por día, rutina o coach..."
              placeholderTextColor="#8E8E93"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredRoutines.map((routine) => {
              const isSelected = selectedRoutine?.id === routine.id;
              return (
                <TouchableOpacity
                  key={routine.id}
                  style={[styles.routineCard, isSelected && styles.routineCardSelected]}
                  onPress={() => setSelectedRoutine(routine)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardTopRow}>
                    <View style={styles.dayBadge}>
                      <Text style={styles.dayBadgeText}>{routine.day}</Text>
                    </View>
                    <Text style={styles.cardCoach}>Coach: {routine.coach}</Text>
                  </View>

                  <Text style={styles.cardTitle}>{routine.title}</Text>
                  <Text style={styles.cardExercisesCount}>
                    🏋️ {routine.exercises.length} Ejercicios Asignados
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* LADO DERECHO: DETALLE DE LOS 8 EJERCICIOS DEL DÍA */}
        <View style={styles.detailSection}>
          {selectedRoutine ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.dayTag}>
                      <Ionicons name="calendar-outline" size={14} color="#00FF66" />
                      <Text style={styles.dayTagText}>{selectedRoutine.day.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.detailTitle}>{selectedRoutine.title}</Text>
                    <Text style={styles.detailSub}>
                      Coach Responsable: <Text style={{ color: '#00FF66' }}>{selectedRoutine.coach}</Text>
                    </Text>
                  </View>

                  {selectedRoutine.videoUrl ? (
                    <TouchableOpacity
                      style={styles.btnWatchVideo}
                      onPress={() => openVideoLink(selectedRoutine.videoUrl)}
                    >
                      <Ionicons name="logo-youtube" size={18} color="#FF0000" />
                      <Text style={styles.btnWatchVideoText}>Ver Video</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                {selectedRoutine.description ? (
                  <View style={styles.notesBox}>
                    <Ionicons name="information-circle-outline" size={18} color="#00FF66" />
                    <Text style={styles.notesText}>{selectedRoutine.description}</Text>
                  </View>
                ) : null}

                <Text style={styles.sectionSubtitle}>
                  Lista de Ejercicios del Día ({selectedRoutine.exercises.length} en total)
                </Text>

                <View style={styles.tableHeader}>
                  <Text style={[styles.th, { flex: 2.2 }]}>Ejercicio</Text>
                  <Text style={[styles.th, { flex: 0.8, textAlign: 'center' }]}>Series</Text>
                  <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Reps</Text>
                  <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Descanso</Text>
                </View>

                {selectedRoutine.exercises.map((ex, idx) => (
                  <View key={idx} style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}>
                    <Text style={[styles.tdWhite, { flex: 2.2 }]}>
                      <Text style={{ color: '#00FF66' }}>#{idx + 1} </Text>
                      {ex.name}
                    </Text>
                    <Text style={[styles.tdGreen, { flex: 0.8, textAlign: 'center' }]}>{ex.sets}</Text>
                    <Text style={[styles.tdWhite, { flex: 1, textAlign: 'center' }]}>{ex.reps}</Text>
                    <Text style={[styles.tdSub, { flex: 1, textAlign: 'right' }]}>{ex.rest}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyDetail}>
              <Ionicons name="barbell-outline" size={48} color="#161F2E" />
              <Text style={{ color: '#8E8E93' }}>Selecciona un día de la lista para ver sus ejercicios</Text>
            </View>
          )}
        </View>
      </View>

      <AddRoutineModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSaveRoutine={handleSaveRoutine}
        existingRoutines={routines}
      />
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  subTitle: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  btnAdd: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#00FF66', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  btnAddText: { color: '#0A0F14', fontWeight: '800', fontSize: 13 },

  layoutRow: { flex: 1, flexDirection: 'row', gap: 16 },
  listSection: { width: 320 },
  detailSection: { flex: 1 },

  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E', borderRadius: 10, paddingHorizontal: 12, height: 38, gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 12 },

  routineCard: { backgroundColor: '#0B0F17', borderRadius: 12, borderWidth: 1, borderColor: '#161F2E', padding: 14, marginBottom: 10 },
  routineCardSelected: { borderColor: '#00FF66', backgroundColor: '#111823' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  dayBadge: { backgroundColor: '#00FF66', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  dayBadgeText: { color: '#0A0F14', fontSize: 11, fontWeight: '800' },
  cardCoach: { color: '#8E8E93', fontSize: 11 },
  cardTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginBottom: 6 },
  cardExercisesCount: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },

  detailCard: { backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20 },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  dayTag: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  dayTagText: { color: '#00FF66', fontSize: 12, fontWeight: '800' },
  detailTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  detailSub: { color: '#8E8E93', fontSize: 12, marginTop: 4 },
  btnWatchVideo: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#161F2E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  btnWatchVideoText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },

  notesBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#111823', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#161F2E', marginBottom: 20 },
  notesText: { color: '#FFFFFF', fontSize: 12, flex: 1 },

  sectionSubtitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#111823', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 4 },
  th: { color: '#8E8E93', fontSize: 11, fontWeight: '700' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#161F2E' },
  tableRowAlt: { backgroundColor: '#070A0F' },
  tdWhite: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  tdGreen: { color: '#00FF66', fontSize: 12, fontWeight: '800' },
  tdSub: { color: '#8E8E93', fontSize: 12 },

  emptyDetail: { flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 300, gap: 12 },
});