import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Sidebar = ({ navigation, activeRoute = 'Members' }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  return (
    <View style={[styles.sidebar, !isDesktop && styles.sidebarCompact]}>
      {/* Brand Logo */}
      <View style={styles.brandContainer}>
        <View style={styles.sidebarLogoFrame}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.sidebarLogoImage}
            resizeMode="cover"
          />
        </View>
        {isDesktop && <Text style={styles.brandLogo}>AFC</Text>}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.menuList}>
        {/* Inicio / Dashboard */}
        <TouchableOpacity
          style={[styles.menuItem, activeRoute === 'AdminDashboard' && styles.menuItemActive]}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Ionicons
            name={activeRoute === 'AdminDashboard' ? 'home' : 'home-outline'}
            size={20}
            color={activeRoute === 'AdminDashboard' ? '#0A0F14' : '#8E8E93'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'AdminDashboard' ? styles.menuTextActive : styles.menuText}>
              Inicio
            </Text>
          )}
        </TouchableOpacity>

        {/* Socios */}
        <TouchableOpacity
          style={[styles.menuItem, activeRoute === 'Members' && styles.menuItemActive]}
          onPress={() => navigation.navigate('Members')}
        >
          <Ionicons
            name={activeRoute === 'Members' ? 'people' : 'people-outline'}
            size={20}
            color={activeRoute === 'Members' ? '#0A0F14' : '#8E8E93'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'Members' ? styles.menuTextActive : styles.menuText}>
              Socios
            </Text>
          )}
        </TouchableOpacity>

        {/* Rutinas / Coaches */}
        <TouchableOpacity
          style={[styles.menuItem, activeRoute === 'Rutinas' && styles.menuItemActive]}
          onPress={() => navigation.navigate('Rutinas')}
        >
          <Ionicons
            name={activeRoute === 'Rutinas' ? 'barbell' : 'barbell-outline'}
            size={20}
            color={activeRoute === 'Rutinas' ? '#0A0F14' : '#8E8E93'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'Rutinas' ? styles.menuTextActive : styles.menuText}>
              Rutinas
            </Text>
          )}
        </TouchableOpacity>

        {/* Tienda / Punto de Venta */}
        <TouchableOpacity
          style={[styles.menuItem, activeRoute === 'Tienda' && styles.menuItemActive]}
          onPress={() => navigation.navigate('Tienda')}
        >
          <Ionicons
            name={activeRoute === 'Tienda' ? 'cart' : 'cart-outline'}
            size={20}
            color={activeRoute === 'Tienda' ? '#0A0F14' : '#8E8E93'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'Tienda' ? styles.menuTextActive : styles.menuText}>
              Tienda
            </Text>
          )}
        </TouchableOpacity>

        {/* Ventas / Historial */}
        <TouchableOpacity
          style={[styles.menuItem, activeRoute === 'Ventas' && styles.menuItemActive]}
          onPress={() => navigation.navigate('Ventas')}
        >
          <Ionicons
            name={activeRoute === 'Ventas' ? 'receipt' : 'receipt-outline'}
            size={20}
            color={activeRoute === 'Ventas' ? '#0A0F14' : '#8E8E93'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'Ventas' ? styles.menuTextActive : styles.menuText}>
              Ventas
            </Text>
          )}
        </TouchableOpacity>

        {/* Caja / Corte */}
        <TouchableOpacity
          style={[styles.menuItem, activeRoute === 'Caja' && styles.menuItemActive]}
          onPress={() => navigation.navigate('Caja')}
        >
          <Ionicons
            name={activeRoute === 'Caja' ? 'wallet' : 'wallet-outline'}
            size={20}
            color={activeRoute === 'Caja' ? '#0A0F14' : '#8E8E93'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'Caja' ? styles.menuTextActive : styles.menuText}>
              Corte de Caja
            </Text>
          )}
        </TouchableOpacity>

        {/* Configuración */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={20} color="#8E8E93" />
          {isDesktop && <Text style={styles.menuText}>Configuración</Text>}
        </TouchableOpacity>
      </ScrollView>

      {/* SECCIÓN INFERIOR: ACCESO RÁPIDO A VISTA CLIENTE / APPSOCIO */}
      <View style={styles.clientAccessSection}>
        <TouchableOpacity
          style={[
            styles.clientAccessBtn,
            activeRoute === 'MemberHome' && styles.clientAccessBtnActive,
          ]}
          onPress={() => navigation.navigate('MemberHome')}
        >
          <Ionicons
            name={activeRoute === 'MemberHome' ? 'smartphone' : 'smartphone-outline'}
            size={20}
            color={activeRoute === 'MemberHome' ? '#0A0F14' : '#00FF66'}
          />
          {isDesktop && (
            <Text style={activeRoute === 'MemberHome' ? styles.clientBtnTextActive : styles.clientBtnText}>
              Vista Socio (App)
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: '#0B0F17',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#161F2E',
  },
  sidebarCompact: {
    width: 70,
    paddingHorizontal: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  sidebarLogoFrame: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0B0F17',
  },
  sidebarLogoImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.25 }],
  },
  brandLogo: {
    fontSize: 26,
    fontWeight: '900',
    color: '#00FF66',
    fontStyle: 'italic',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#00FF66',
  },
  menuText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  menuTextActive: {
    color: '#0A0F14',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 12,
  },

  /* NUEVOS ESTILOS PARA EL BOTÓN DE VISTA CLIENTE */
  clientAccessSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#161F2E',
    marginTop: 8,
  },
  clientAccessBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00FF66',
    backgroundColor: 'rgba(0, 255, 102, 0.05)',
  },
  clientAccessBtnActive: {
    backgroundColor: '#00FF66',
    borderColor: '#00FF66',
  },
  clientBtnText: {
    color: '#00FF66',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 12,
  },
  clientBtnTextActive: {
    color: '#0A0F14',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 12,
  },
});