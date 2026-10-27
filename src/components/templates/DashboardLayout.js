import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DashboardLayout = ({ children, navigation, activeRoute }) => {
  const menuItems = [
    { id: 'AdminDashboard', label: 'Inicio', icon: 'home-outline' },
    { id: 'Members', label: 'Socios', icon: 'people-outline' },
    { id: 'AdminSchedule', label: 'Horarios', icon: 'calendar-outline' },
    { id: 'AdminAnnouncements', label: 'Avisos', icon: 'mega-outline' }, // 👈 OPCIÓN AGREGADA A LA BARRA LATERAL
    { id: 'Routines', label: 'Rutinas', icon: 'barbell-outline' },
    { id: 'Tienda', label: 'Tienda', icon: 'cart-outline' },
    { id: 'Ventas', label: 'Ventas', icon: 'receipt-outline' },
    { id: 'CorteCaja', label: 'Corte de Caja', icon: 'wallet-outline' },
    { id: 'Configuracion', label: 'Configuración', icon: 'settings-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* BARRA LATERAL IZQUIERDA */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>AFC</Text>
          </View>
          <Text style={styles.logoText}>AFC</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.menuList}>
          {menuItems.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => navigation?.navigate(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={isActive ? '#0A0F14' : '#8E8E93'}
                />
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* BOTÓN INFERIOR VISTA SOCIO */}
        <TouchableOpacity
          style={styles.btnVistaSocio}
          onPress={() => navigation?.navigate('MemberHome')}
        >
          <Text style={styles.btnVistaSocioText}>? Vista Socio (App)</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <View style={styles.contentArea}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#05070B',
  },
  sidebar: {
    width: 220,
    backgroundColor: '#05070B',
    borderRightWidth: 1,
    borderRightColor: '#161F2E',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00FF66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBadgeText: { color: '#0A0F14', fontWeight: '900', fontSize: 11 },
  logoText: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  menuList: { flex: 1 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: '#00FF66',
  },
  navText: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#0A0F14',
    fontWeight: '800',
  },
  btnVistaSocio: {
    borderWidth: 1,
    borderColor: '#00FF66',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnVistaSocioText: {
    color: '#00FF66',
    fontSize: 12,
    fontWeight: '700',
  },
  contentArea: {
    flex: 1,
    padding: 24,
  },
});