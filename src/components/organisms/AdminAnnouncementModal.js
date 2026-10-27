import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ANNOUNCEMENT_TYPES = [
  { id: 'info', label: 'Informativo', color: '#00FF66', icon: 'information-circle-outline' },
  { id: 'urgent', label: 'Urgente', color: '#FF453A', icon: 'warning-outline' },
  { id: 'maintenance', label: 'Mantenimiento', color: '#FFD60A', icon: 'construct-outline' },
];

export const AdminAnnouncementModal = ({ visible, onClose, onPublish }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedType, setSelectedType] = useState('info');

  const handlePublish = () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa un título y el contenido del aviso.');
      return;
    }

    const newAnnouncement = {
      id: Date.now().toString(),
      title,
      message,
      type: selectedType,
      date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    };

    onPublish(newAnnouncement);
    Alert.alert('Aviso Publicado 📢', 'El anuncio ya está visible para todos los socios.');
    setTitle('');
    setMessage('');
    setSelectedType('info');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <Ionicons name="mega-outline" size={20} color="#00FF66" />
              <Text style={styles.title}>Nuevo Anuncio General</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>
            Escribe un comunicado que aparecerá en la pantalla principal de la App de los socios.
          </Text>

          <Text style={styles.inputLabel}>Prioridad / Tipo</Text>
          <View style={styles.typeSelector}>
            {ANNOUNCEMENT_TYPES.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.typeBtn,
                  selectedType === t.id && { borderColor: t.color, backgroundColor: `${t.color}15` },
                ]}
                onPress={() => setSelectedType(t.id)}
              >
                <Ionicons name={t.icon} size={16} color={selectedType === t.id ? t.color : '#8E8E93'} />
                <Text style={[styles.typeText, selectedType === t.id && { color: t.color, fontWeight: '800' }]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Título del Anuncio</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Horario especial por día festivo"
            placeholderTextColor="#8E8E93"
          />

          <Text style={styles.inputLabel}>Mensaje para el Socio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe los detalles del aviso aquí..."
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPublish} onPress={handlePublish}>
              <Ionicons name="send" size={14} color="#0A0F14" />
              <Text style={styles.btnPublishText}>Publicar Anuncio</Text>
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
    padding: 16,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  subTitle: { color: '#8E8E93', fontSize: 11, marginBottom: 16, lineHeight: 16 },
  inputLabel: { color: '#8E8E93', fontSize: 11, fontWeight: '700', marginBottom: 6, marginTop: 10 },
  typeSelector: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 8,
  },
  typeText: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },
  input: {
    backgroundColor: '#111823',
    borderWidth: 1,
    borderColor: '#161F2E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  textArea: {
    height: 90,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
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
  btnPublish: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#00FF66',
  },
  btnPublishText: { color: '#0A0F14', fontWeight: '800', fontSize: 12 },
});

export default AdminAnnouncementModal;