import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AnnouncementModal = ({ visible, announcement, onClose }) => {
  if (!announcement) return null;

  const isPromo = announcement.type === 'promo';
  const isAlert = announcement.type === 'alert';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: isPromo
                ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600'
                : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
            }}
            style={styles.bgHeader}
            imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, opacity: 0.35 }}
          >
            <View style={styles.headerContent}>
              <View style={[styles.badge, isAlert ? styles.badgeAlert : styles.badgePromo]}>
                <Ionicons
                  name={isAlert ? 'warning-outline' : 'megaphone-outline'}
                  size={14}
                  color={isAlert ? '#FF3B30' : '#00FF66'}
                />
                <Text style={[styles.badgeText, { color: isAlert ? '#FF3B30' : '#00FF66' }]}>
                  {isAlert ? 'Aviso Importante' : 'Promoción Exclusiva'}
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View style={styles.body}>
            <Text style={styles.title}>{announcement.title}</Text>
            <Text style={styles.message}>{announcement.message}</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
              <Text style={styles.actionBtnText}>Entendido</Text>
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
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    overflow: 'hidden',
  },
  bgHeader: {
    height: 100,
    padding: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(5, 7, 11, 0.8)',
  },
  badgeAlert: { borderWidth: 1, borderColor: '#FF3B30' },
  badgePromo: { borderWidth: 1, borderColor: '#00FF66' },
  badgeText: { fontSize: 11, fontWeight: '800' },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(5, 7, 11, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  message: {
    color: '#D1D5DB',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },
  actionBtn: {
    backgroundColor: '#00FF66',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#0A0F14',
    fontWeight: '800',
    fontSize: 13,
  },
});