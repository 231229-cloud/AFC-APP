import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export const ShopBanner = ({ onPress }) => (
  <View style={styles.container}>
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=800' }}
      style={styles.bg}
      imageStyle={{ borderRadius: 16, opacity: 0.35 }}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>🛒 Tienda AFC</Text>
          <Text style={styles.subtitle}>Suplementos, accesorios y más.</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Ver productos →</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: { height: 85, borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', overflow: 'hidden', marginTop: 12, marginBottom: 20 },
  bg: { flex: 1, backgroundColor: '#0B0F17' },
  content: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  title: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  subtitle: { color: '#8E8E93', fontSize: 11, marginTop: 2 },
  btn: { borderWidth: 1, borderColor: '#00FF66', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(5, 7, 11, 0.6)' },
  btnText: { color: '#00FF66', fontSize: 11, fontWeight: '800' },
});