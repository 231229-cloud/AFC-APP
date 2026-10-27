import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { MemberRow } from '../components/molecules/MemberRow';
import { AddMemberModal } from '../components/organisms/AddMemberModal';

const INITIAL_MEMBERS = [
  { id: '1', name: 'Juan Pérez', code: 'MEX123456', phone: '5512345678', dueDate: '2026-11-20' },
  { id: '2', name: 'María López', code: 'MEX234567', phone: '5523456789', dueDate: '2026-11-15' },
  { id: '3', name: 'Carlos Ramírez', code: 'MEX345678', phone: '5534567890', dueDate: '2026-10-28' },
  { id: '4', name: 'Diego Morales', code: 'MEX789012', phone: '5578901234', dueDate: '2026-07-03' },
];

const getDaysOverdue = (dueDateStr) => {
  if (!dueDateStr) return 0;
  const today = new Date();
  const due = new Date(dueDateStr);
  return Math.floor((today - due) / (1000 * 60 * 60 * 24));
};

const getMemberStatus = (dueDateStr) => {
  const daysOverdue = getDaysOverdue(dueDateStr);
  if (daysOverdue <= 0) return { label: 'Activo' };
  if (daysOverdue > 60) return { label: 'Por Depurar' };
  return { label: 'Vencido' };
};

export const MembersScreen = ({ navigation }) => {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Modales
  const [selectedMember, setSelectedMember] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteMember = () => {
    if (selectedMember) {
      setMembers(members.filter((m) => m.id !== selectedMember.id));
      setShowActionModal(false);
      setSelectedMember(null);
    }
  };

  // Callback ejecutado al guardar en AddMemberModal
  const handleSaveMember = (newMemberData) => {
    // Formatear la fecha para compatibilidad con la tabla (YYYY-MM-DD)
    let formattedDueDate = '2026-11-30';
    if (newMemberData.expirationDate) {
      const parts = newMemberData.expirationDate.split('/');
      if (parts.length === 3) {
        formattedDueDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const newMember = {
      id: newMemberData.id || Date.now().toString(),
      name: newMemberData.name,
      code: `MEX${Math.floor(100000 + Math.random() * 900000)}`,
      phone: newMemberData.phone || 'S/N',
      dueDate: formattedDueDate,
    };

    setMembers([newMember, ...members]);
  };

  const filteredMembers = members.filter((member) => {
    const statusObj = getMemberStatus(member.dueDate);
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    if (filterStatus === 'Todos') return matchesSearch;
    return matchesSearch && statusObj.label === filterStatus;
  });

  return (
    <DashboardLayout navigation={navigation} activeRoute="Members">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.topHeader}>
          <Text style={styles.pageTitle}>Socios</Text>
          <TouchableOpacity style={styles.btnAdd} onPress={() => setShowAddModal(true)}>
            <Ionicons name="add" size={20} color="#0A0F14" />
            <Text style={styles.btnAddText}>Agregar socio</Text>
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filterRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#8E8E93" />
            <TextInput
              placeholder="Buscar por nombre, folio o celular..."
              placeholderTextColor="#8E8E93"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            {['Todos', 'Activo', 'Vencido', 'Por Depurar'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[styles.tabChip, filterStatus === status && styles.tabChipActive]}
                onPress={() => setFilterStatus(status)}
              >
                <Text style={[styles.tabChipText, filterStatus === status && styles.tabChipTextActive]}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tabla de Socios */}
        <View style={styles.tableCard}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, { flex: 2 }]}>Nombre</Text>
            <Text style={[styles.th, { flex: 1.5 }]}>Identificación</Text>
            <Text style={[styles.th, { flex: 1.5 }]}>Celular</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Estado</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Vencimiento</Text>
            <Text style={[styles.th, { width: 40, textAlign: 'center' }]}></Text>
          </View>

          {filteredMembers.map((item) => (
            <MemberRow
              key={item.id}
              item={item}
              statusObj={getMemberStatus(item.dueDate)}
              daysOverdue={getDaysOverdue(item.dueDate)}
              onOpenMenu={(m) => {
                setSelectedMember(m);
                setShowActionModal(true);
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal de Acciones/Opciones para el Socio */}
      <Modal visible={showActionModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMember?.name}</Text>
            <Text style={styles.modalSubtitle}>Folio: {selectedMember?.code}</Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => setShowActionModal(false)}>
              <Ionicons name="card-outline" size={20} color="#00FF66" />
              <Text style={styles.modalOptionText}>Renovar Membresía</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalOption, styles.modalOptionDanger]} onPress={handleDeleteMember}>
              <Ionicons name="trash-outline" size={20} color="#FF453A" />
              <Text style={styles.modalOptionDangerText}>Eliminar Socio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancelFull} onPress={() => setShowActionModal(false)}>
              <Text style={styles.btnCancelText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Estructurado "Agregar Socio" */}
      <AddMemberModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSaveMember={handleSaveMember}
      />
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  btnAdd: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00FF66', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, gap: 6 },
  btnAddText: { color: '#0A0F14', fontWeight: '700', fontSize: 14 },

  filterRow: { flexDirection: 'column', gap: 12, marginBottom: 20 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E', borderRadius: 12, paddingHorizontal: 14, height: 44, gap: 10 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  tabsContainer: { flexDirection: 'row', gap: 8 },
  tabChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E', marginRight: 8 },
  tabChipActive: { backgroundColor: '#00FF66', borderColor: '#00FF66' },
  tabChipText: { color: '#8E8E93', fontSize: 13, fontWeight: '600' },
  tabChipTextActive: { color: '#0A0F14', fontWeight: '700' },

  tableCard: { backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#111823', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#161F2E' },
  th: { color: '#8E8E93', fontSize: 13, fontWeight: '600' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 340, backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  modalSubtitle: { fontSize: 12, color: '#8E8E93', marginBottom: 16 },
  modalOption: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#161F2E' },
  modalOptionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  modalOptionDanger: { borderBottomWidth: 0, marginTop: 4 },
  modalOptionDangerText: { color: '#FF453A', fontSize: 14, fontWeight: '600' },

  btnCancelFull: { paddingVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: '#161F2E', marginTop: 12 },
  btnCancelText: { color: '#FFFFFF', fontWeight: '600' },
});