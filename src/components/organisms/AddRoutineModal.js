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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MAX_EXERCISES = 8;

export const AddRoutineModal = ({ visible, onClose, onSaveRoutine, existingRoutines = [] }) => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [title, setTitle] = useState('');
  const [coach, setCoach] = useState('');
  const [description, setDescription] = useState('');

  const [exercises, setExercises] = useState([
    { name: '', sets: '4', reps: '10-12', rest: '60s', videoType: 'url', videoUrl: '', localUri: '', localFileName: '' },
    { name: '', sets: '4', reps: '10-12', rest: '60s', videoType: 'url', videoUrl: '', localUri: '', localFileName: '' },
  ]);

  // MANEJO DE SELECCIÓN DE ARCHIVO DE VIDEO MULTIPLATAFORMA
  const pickVideoForExercise = async (index) => {
    if (Platform.OS === 'web') {
      // Selector Nativo de HTML5 para Laptop / Navegador Web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const videoUrl = URL.createObjectURL(file);
          const updated = [...exercises];
          updated[index].localUri = videoUrl;
          updated[index].localFileName = file.name;
          updated[index].videoType = 'local';
          setExercises(updated);
        }
      };
      input.click();
    } else {
      // Selector de expo-document-picker para Móviles (Android / iOS)
      try {
        const DocumentPicker = require('expo-document-picker');
        const result = await DocumentPicker.getDocumentAsync({
          type: 'video/*',
          copyToCacheDirectory: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const file = result.assets[0];
          const updated = [...exercises];
          updated[index].localUri = file.uri;
          updated[index].localFileName = file.name;
          updated[index].videoType = 'local';
          setExercises(updated);
        }
      } catch (err) {
        Alert.alert('Error', 'No se pudo cargar el archivo de video en el dispositivo.');
      }
    }
  };

  const handleAddExerciseRow = () => {
    if (exercises.length >= MAX_EXERCISES) {
      Alert.alert('Límite alcanzado', `Máximo ${MAX_EXERCISES} ejercicios por rutina.`);
      return;
    }
    setExercises([
      ...exercises,
      { name: '', sets: '4', reps: '10-12', rest: '60s', videoType: 'url', videoUrl: '', localUri: '', localFileName: '' },
    ]);
  };

  const handleRemoveExerciseRow = (index) => {
    if (exercises.length <= 1) {
      Alert.alert('Atención', 'La rutina debe contener al menos 1 ejercicio.');
      return;
    }
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleSubmit = () => {
    if (!title.trim() || !coach.trim()) {
      Alert.alert('Campos Incompletos', 'Ingresa el título de la rutina y el nombre del coach.');
      return;
    }

    const dayExists = existingRoutines.some(
      (r) => r.day?.toLowerCase() === selectedDay.toLowerCase()
    );

    if (dayExists) {
      Alert.alert('Día Ocupado', `Ya existe una rutina registrada para el día "${selectedDay}".`);
      return;
    }

    const validExercises = exercises.filter((e) => e.name.trim() !== '');

    if (validExercises.length === 0) {
      Alert.alert('Sin Ejercicios', 'Ingresa al menos un ejercicio.');
      return;
    }

    const newRoutine = {
      id: `RUT-${Date.now().toString().slice(-4)}`,
      day: selectedDay,
      title,
      coach,
      description,
      createdAt: new Date().toLocaleDateString('es-MX'),
      exercises: validExercises,
    };

    onSaveRoutine(newRoutine);
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setTitle('');
    setCoach('');
    setDescription('');
    setSelectedDay('Lunes');
    setExercises([
      { name: '', sets: '4', reps: '10-12', rest: '60s', videoType: 'url', videoUrl: '', localUri: '', localFileName: '' },
      { name: '', sets: '4', reps: '10-12', rest: '60s', videoType: 'url', videoUrl: '', localUri: '', localFileName: '' },
    ]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Crear Rutina Diaria (Hasta 8 Ejercicios)</Text>
            <TouchableOpacity onPress={handleResetAndClose}>
              <Ionicons name="close" size={22} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollForm}>
            <Text style={styles.fieldLabel}>DÍA DE LA SEMANA *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
              {DAYS_OF_WEEK.map((day) => {
                const isTaken = existingRoutines.some(
                  (r) => r.day?.toLowerCase() === day.toLowerCase()
                );
                const isSelected = selectedDay === day;

                return (
                  <TouchableOpacity
                    key={day}
                    disabled={isTaken}
                    style={[
                      styles.dayChip,
                      isSelected && styles.dayChipActive,
                      isTaken && styles.dayChipDisabled,
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayChipText,
                        isSelected && styles.dayChipTextActive,
                        isTaken && styles.dayChipTextDisabled,
                      ]}
                    >
                      {day} {isTaken ? '(Ocupado)' : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.formRow}>
              <View style={styles.inputCol}>
                <Text style={styles.fieldLabel}>TÍTULO DE LA RUTINA *</Text>
                <TextInput
                  placeholder="Ej. Espalda & Bíceps Enfoque Fuerza"
                  placeholderTextColor="#8E8E93"
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputCol}>
                <Text style={styles.fieldLabel}>COACH RESPONSABLE *</Text>
                <TextInput
                  placeholder="Ej. Coach Alex"
                  placeholderTextColor="#8E8E93"
                  style={styles.input}
                  value={coach}
                  onChangeText={setCoach}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>INDICACIONES TÉCNICAS / NOTAS</Text>
            <TextInput
              placeholder="Notas generales sobre ritmo de la sesión, calentamiento..."
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={2}
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.tableTitleRow}>
              <Text style={styles.fieldLabel}>
                EJERCICIOS CON VIDEO ({exercises.length}/{MAX_EXERCISES})
              </Text>

              {exercises.length < MAX_EXERCISES && (
                <TouchableOpacity style={styles.btnAddExercise} onPress={handleAddExerciseRow}>
                  <Ionicons name="add-circle-outline" size={16} color="#00FF66" />
                  <Text style={styles.btnAddExerciseText}>+ Agregar Ejercicio</Text>
                </TouchableOpacity>
              )}
            </View>

            {exercises.map((ex, idx) => (
              <View key={idx} style={styles.exerciseBlock}>
                <View style={styles.exerciseBlockHeader}>
                  <Text style={styles.exerciseIndex}>EJERCICIO #{idx + 1}</Text>
                  <TouchableOpacity onPress={() => handleRemoveExerciseRow(idx)}>
                    <Ionicons name="trash-outline" size={16} color="#FF453A" />
                  </TouchableOpacity>
                </View>

                <View style={styles.exerciseRow}>
                  <TextInput
                    placeholder="Nombre del Ejercicio"
                    placeholderTextColor="#8E8E93"
                    style={[styles.input, { flex: 2, marginBottom: 0 }]}
                    value={ex.name}
                    onChangeText={(val) => handleExerciseChange(idx, 'name', val)}
                  />
                  <TextInput
                    placeholder="Series"
                    placeholderTextColor="#8E8E93"
                    style={[styles.input, { flex: 0.8, textAlign: 'center', marginBottom: 0 }]}
                    value={ex.sets}
                    onChangeText={(val) => handleExerciseChange(idx, 'sets', val)}
                  />
                  <TextInput
                    placeholder="Reps"
                    placeholderTextColor="#8E8E93"
                    style={[styles.input, { flex: 1, textAlign: 'center', marginBottom: 0 }]}
                    value={ex.reps}
                    onChangeText={(val) => handleExerciseChange(idx, 'reps', val)}
                  />
                  <TextInput
                    placeholder="Descanso"
                    placeholderTextColor="#8E8E93"
                    style={[styles.input, { flex: 1, textAlign: 'center', marginBottom: 0 }]}
                    value={ex.rest}
                    onChangeText={(val) => handleExerciseChange(idx, 'rest', val)}
                  />
                </View>

                {/* BOTONES DUALES: ENLACE O SUBIR DESDE LAPTOP/CELULAR */}
                <View style={styles.videoPickerRow}>
                  <TouchableOpacity
                    style={[
                      styles.videoTypeBtn,
                      ex.videoType === 'url' && styles.videoTypeBtnActive,
                    ]}
                    onPress={() => handleExerciseChange(idx, 'videoType', 'url')}
                  >
                    <Ionicons name="logo-youtube" size={14} color={ex.videoType === 'url' ? '#0A0F14' : '#8E8E93'} />
                    <Text style={[styles.videoTypeBtnText, ex.videoType === 'url' && styles.videoTypeBtnTextActive]}>
                      Enlace URL
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.videoTypeBtn,
                      ex.videoType === 'local' && styles.videoTypeBtnActive,
                    ]}
                    onPress={() => pickVideoForExercise(idx)}
                  >
                    <Ionicons name="cloud-upload-outline" size={14} color={ex.videoType === 'local' ? '#0A0F14' : '#8E8E93'} />
                    <Text style={[styles.videoTypeBtnText, ex.videoType === 'local' && styles.videoTypeBtnTextActive]}>
                      Subir de Laptop/Móvil
                    </Text>
                  </TouchableOpacity>
                </View>

                {ex.videoType === 'url' ? (
                  <TextInput
                    placeholder="Pega el enlace de YouTube o video web..."
                    placeholderTextColor="#6B7280"
                    style={[styles.input, styles.videoInput]}
                    value={ex.videoUrl}
                    onChangeText={(val) => handleExerciseChange(idx, 'videoUrl', val)}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.fileSelectedCard}
                    onPress={() => pickVideoForExercise(idx)}
                  >
                    <Ionicons name="film-outline" size={16} color="#00FF66" />
                    <Text style={styles.fileNameText} numberOfLines={1}>
                      {ex.localFileName ? ex.localFileName : 'Haz clic para seleccionar archivo MP4/MOV de tu equipo'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.btnCancel} onPress={handleResetAndClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#0A0F14" />
              <Text style={styles.btnSaveText}>Guardar Rutina Completa</Text>
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
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 740,
    maxHeight: '92%',
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#161F2E',
    marginBottom: 16,
  },
  modalTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  scrollForm: { paddingBottom: 10 },

  fieldLabel: { color: '#8E8E93', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 6 },
  formRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  inputCol: { flex: 1 },

  input: {
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 8,
    color: '#FFFFFF',
    paddingHorizontal: 10,
    height: 38,
    fontSize: 12,
    marginBottom: 10,
  },
  textArea: { height: 50, textAlignVertical: 'top', paddingTop: 8 },

  daysContainer: { marginBottom: 12 },
  dayChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    marginRight: 6,
  },
  dayChipActive: { backgroundColor: '#00FF66', borderColor: '#00FF66' },
  dayChipDisabled: { backgroundColor: '#070A0F', opacity: 0.4 },
  dayChipText: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },
  dayChipTextActive: { color: '#0A0F14', fontWeight: '800' },
  dayChipTextDisabled: { color: '#485568', textDecorationLine: 'line-through' },

  tableTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  btnAddExercise: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  btnAddExerciseText: { color: '#00FF66', fontSize: 12, fontWeight: '700' },

  exerciseBlock: {
    backgroundColor: '#070A0F',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  exerciseBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  exerciseIndex: { color: '#00FF66', fontSize: 10, fontWeight: '800' },
  exerciseRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },

  videoPickerRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  videoTypeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
  },
  videoTypeBtnActive: { backgroundColor: '#00FF66', borderColor: '#00FF66' },
  videoTypeBtnText: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },
  videoTypeBtnTextActive: { color: '#0A0F14', fontWeight: '800' },

  videoInput: { backgroundColor: '#0B0F17', borderColor: '#1E293B', fontSize: 11, marginBottom: 0 },
  fileSelectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#00FF66',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 38,
  },
  fileNameText: { color: '#FFFFFF', fontSize: 12, flex: 1 },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#161F2E',
  },
  btnCancel: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: '#111823' },
  btnCancelText: { color: '#8E8E93', fontSize: 12, fontWeight: '600' },
  btnSave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#00FF66',
  },
  btnSaveText: { color: '#0A0F14', fontSize: 12, fontWeight: '800' },
}); 