import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = ({ name, onOpenPayment }) => (
  <View style={styles.container}>
    <View style={styles.topRow}>
      <View style={styles.brandGroup}>
        <Ionicons name="barbell" size={20} color="#00FF66" />
        <Text style={styles.brandTitle}>AFC</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconCircle}>
          <Ionicons name="notifications-outline" size={18} color="#00FF66" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarBorder} onPress={onOpenPayment}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>

    <Text style={styles.greeting}>Hola, {name} 👋</Text>
    <Text style={styles.subGreeting}>Sigue esforzándote, los resultados llegan.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingTop: 40, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#05070B' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  brandGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandTitle: { color: '#00FF66', fontSize: 20, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E', justifyContent: 'center', alignItems: 'center' },
  avatarBorder: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: '#00FF66', overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  greeting: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  subGreeting: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
});