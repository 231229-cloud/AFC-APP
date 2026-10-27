import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AnnouncementBanner = ({ announcement }) => {
  if (!announcement) return null;

  const getTypeStyle = (type) => {
    switch (type) {
      case 'urgent':
        return { color: '#FF453A', icon: 'warning-outline', bg: 'rgba(255, 69, 58, 0.12)' };
      case 'maintenance':
        return { color: '#FFD60A', icon: 'construct-outline', bg: 'rgba(255, 214, 10, 0.12)' };
      default:
        return { color: '#00FF66', icon: 'information-circle-outline', bg: 'rgba(0, 255, 102, 0.12)' };
    }
  };

  const styleConfig = getTypeStyle(announcement.type);

  return (
    <View style={[styles.container, { borderColor: styleConfig.color, backgroundColor: styleConfig.bg }]}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Ionicons name={styleConfig.icon} size={18} color={styleConfig.color} />
          <Text style={[styles.title, { color: styleConfig.color }]}>{announcement.title}</Text>
        </View>
        <Text style={styles.dateText}>{announcement.date}</Text>
      </View>
      <Text style={styles.messageText}>{announcement.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 13, fontWeight: '800' },
  dateText: { color: '#8E8E93', fontSize: 10, fontWeight: '600' },
  messageText: { color: '#FFFFFF', fontSize: 12, lineHeight: 17 },
});