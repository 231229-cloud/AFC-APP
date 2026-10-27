import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { AdminAnnouncementModal } from '../components/organisms/AdminAnnouncementModal';

export const AdminAnnouncementsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'Mantenimiento en Área de Peso Libre',
      message: 'Se dará mantenimiento a las bancas el viernes de 2:00 PM a 4:00 PM.',
      type: 'maintenance',
      date: '10 abr',
    },
    {
      id: '2',
      title: 'Horario Especial Semana Santa',
      message: 'El gimnasio operará en horario sabatino de 8:00 AM a 2:00 PM.',
      type: 'info',
      date: '08 abr',
    },
  ]);

  const handlePublish = (newAnnouncement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleDelete = (id) => {
    Alert.alert('Eliminar Anuncio', '¿Deseas retirar este anuncio de la app de los socios?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setAnnouncements((prev) => prev.filter((a) => a.id !== id)),
      },
    ]);
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'urgent':
        return { label: 'Urgente', color: '#FF453A', bg: 'rgba(255, 69, 58, 0.15)' };
      case 'maintenance':
        return { label: 'Mantenimiento', color: '#FFD60A', bg: 'rgba(255, 214, 10, 0.15)' };
      default:
        return { label: 'Informativo', color: '#00FF66', bg: 'rgba(0, 255, 102, 0.15)' };
    }
  };

  return (
    <DashboardLayout navigation={navigation} activeRoute="AdminAnnouncements">
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Gestión de Avisos y Comunicados</Text>
            <Text style={styles.subtitle}>Publica mensajes que se verán en la App de los socios</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={18} color="#0A0F14" />
            <Text style={styles.addBtnText}>Nuevo Aviso</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {announcements.map((item) => {
            const badge = getTypeBadge(item.type);
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.badgeRow}>
                    <Text style={[styles.badge, { color: badge.color, backgroundColor: badge.bg }]}>
                      {badge.label}
                    </Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMessage}>{item.message}</Text>
              </View>
            );
          })}
        </ScrollView>

        <AdminAnnouncementModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onPublish={handlePublish}
        />
      </View>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00FF66',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: { color: '#0A0F14', fontWeight: '800', fontSize: 12 },
  card: {
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { fontSize: 10, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  dateText: { color: '#8E8E93', fontSize: 11 },
  cardTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 6 },
  cardMessage: { color: '#8E8E93', fontSize: 13, lineHeight: 18 },
});

export default AdminAnnouncementsScreen;