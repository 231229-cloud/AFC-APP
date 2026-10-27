import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AdminScheduleCard } from '../components/molecules/AdminScheduleCard';
import { AdminScheduleModal } from '../components/organisms/AdminScheduleModal';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export const AdminScheduleScreen = ({ navigation }) => {
  const [schedules, setSchedules] = useState([
    { id: '1', shift: 'Matutino', time: '06:00 AM - 07:00 AM', maxCapacity: 20, booked: 12, active: true },
    { id: '2', shift: 'Matutino', time: '07:00 AM - 08:00 AM', maxCapacity: 25, booked: 25, active: true },
    { id: '3', shift: 'Vespertino', time: '05:00 PM - 06:00 PM', maxCapacity: 20, booked: 15, active: true },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleOpenCreate = () => {
    setItemToEdit(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (item) => {
    setItemToEdit(item);
    setModalVisible(true);
  };

  const handleToggleActive = (id) => {
    setSchedules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const handleDelete = (id) => {
    Alert.alert('Eliminar Horario', '¿Eliminar este bloque de clase?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setSchedules((prev) => prev.filter((i) => i.id !== id)) },
    ]);
  };

  const handleSave = (data) => {
    if (data.id) {
      setSchedules((prev) =>
        prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );
    } else {
      setSchedules((prev) => [
        ...prev,
        { ...data, id: Date.now().toString(), booked: 0, active: true },
      ]);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Panel Admin</Text>
            <Text style={styles.headerSubtitle}>Gestión de Horarios y Cupos</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={handleOpenCreate}>
            <Ionicons name="add" size={20} color="#0A0F14" />
            <Text style={styles.addBtnText}>Nuevo</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionHeader}>☀️ Turno Matutino</Text>
          {schedules
            .filter((item) => item.shift === 'Matutino')
            .map((item) => (
              <AdminScheduleCard
                key={item.id}
                item={item}
                onToggleActive={handleToggleActive}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}

          <Text style={[styles.sectionHeader, { marginTop: 20 }]}>🌙 Turno Vespertino</Text>
          {schedules
            .filter((item) => item.shift === 'Vespertino')
            .map((item) => (
              <AdminScheduleCard
                key={item.id}
                item={item}
                onToggleActive={handleToggleActive}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
        </ScrollView>

        <AdminScheduleModal
          visible={modalVisible}
          itemToEdit={itemToEdit}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#05070B', alignItems: 'center', width: '100%' },
  container: { flex: 1, width: '100%', maxWidth: isDesktop ? 920 : '100%', paddingHorizontal: 16, paddingTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  headerSubtitle: { color: '#8E8E93', fontSize: 11 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#00FF66', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addBtnText: { color: '#0A0F14', fontWeight: '800', fontSize: 12 },
  scrollContent: { paddingBottom: 30 },
  sectionHeader: { color: '#00FF66', fontSize: 12, fontWeight: '800', marginBottom: 10, textTransform: 'uppercase' },
});

export default AdminScheduleScreen;