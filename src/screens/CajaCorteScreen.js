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
import { PaymentMethodRow } from '../components/atoms/PaymentMethodRow';

// Datos desglosados por Membresías y Tienda
const MOCK_CORTE_DATA = {
  Diario: {
    dateLabel: '25 Oct 2026',
    membresias: {
      ingresos: 3200,
      egresos: 200,
      utilidad: 3000,
      methods: [
        { id: 'm1', label: 'Efectivo', icon: 'cash-outline', percentage: 50, amount: 1600 },
        { id: 'm2', label: 'Tarjeta', icon: 'card-outline', percentage: 35, amount: 1120 },
        { id: 'm3', label: 'Transferencia', icon: 'swap-horizontal-outline', percentage: 15, amount: 480 },
      ],
    },
    tienda: {
      ingresos: 1650,
      egresos: 1000,
      utilidad: 650,
      methods: [
        { id: 't1', label: 'Efectivo', icon: 'cash-outline', percentage: 79, amount: 1310 },
        { id: 't2', label: 'Tarjeta', icon: 'card-outline', percentage: 15, amount: 250 },
        { id: 't3', label: 'Transferencia', icon: 'swap-horizontal-outline', percentage: 6, amount: 90 },
      ],
    },
  },
  Semanal: {
    dateLabel: 'Semana 42 (19 Oct - 25 Oct 2026)',
    membresias: {
      ingresos: 21400,
      egresos: 3500,
      utilidad: 17900,
      methods: [
        { id: 'm1', label: 'Efectivo', icon: 'cash-outline', percentage: 45, amount: 9630 },
        { id: 'm2', label: 'Tarjeta', icon: 'card-outline', percentage: 40, amount: 8560 },
        { id: 'm3', label: 'Transferencia', icon: 'swap-horizontal-outline', percentage: 15, amount: 3210 },
      ],
    },
    tienda: {
      ingresos: 11000,
      egresos: 5000,
      utilidad: 6000,
      methods: [
        { id: 't1', label: 'Efectivo', icon: 'cash-outline', percentage: 65, amount: 7150 },
        { id: 't2', label: 'Tarjeta', icon: 'card-outline', percentage: 25, amount: 2750 },
        { id: 't3', label: 'Transferencia', icon: 'swap-horizontal-outline', percentage: 10, amount: 1100 },
      ],
    },
  },
  Mensual: {
    dateLabel: 'Octubre 2026',
    membresias: {
      ingresos: 86450,
      egresos: 14200,
      utilidad: 72250,
      methods: [
        { id: 'm1', label: 'Efectivo', icon: 'cash-outline', percentage: 42, amount: 36309 },
        { id: 'm2', label: 'Tarjeta', icon: 'card-outline', percentage: 43, amount: 37173 },
        { id: 'm3', label: 'Transferencia', icon: 'swap-horizontal-outline', percentage: 15, amount: 12968 },
      ],
    },
    tienda: {
      ingresos: 42450,
      egresos: 20000,
      utilidad: 22450,
      methods: [
        { id: 't1', label: 'Efectivo', icon: 'cash-outline', percentage: 60, amount: 25470 },
        { id: 't2', label: 'Tarjeta', icon: 'card-outline', percentage: 28, amount: 11886 },
        { id: 't3', label: 'Transferencia', icon: 'swap-horizontal-outline', percentage: 12, amount: 5094 },
      ],
    },
  },
};

export const CajaCorteScreen = ({ navigation }) => {
  const [activePeriod, setActivePeriod] = useState('Diario'); // 'Diario' | 'Semanal' | 'Mensual'
  const [activeCategory, setActiveCategory] = useState('Todos'); // 'Todos' | 'Membresias' | 'Tienda'

  const periodData = MOCK_CORTE_DATA[activePeriod];

  // Cálculo de totales según la categoría seleccionada
  const getCalculatedData = () => {
    const mem = periodData.membresias;
    const tie = periodData.tienda;

    if (activeCategory === 'Membresias') {
      return {
        ingresos: mem.ingresos,
        egresos: mem.egresos,
        utilidad: mem.utilidad,
        methods: mem.methods,
      };
    }

    if (activeCategory === 'Tienda') {
      return {
        ingresos: tie.ingresos,
        egresos: tie.egresos,
        utilidad: tie.utilidad,
        methods: tie.methods,
      };
    }

    // Combinado ('Todos')
    const totalIngresos = mem.ingresos + tie.ingresos;
    const totalEgresos = mem.egresos + tie.egresos;
    const combinedMethods = mem.methods.map((m, idx) => {
      const tieAmount = tie.methods[idx]?.amount || 0;
      const totalAmount = m.amount + tieAmount;
      const pct = Math.round((totalAmount / totalIngresos) * 100);
      return { ...m, percentage: pct, amount: totalAmount };
    });

    return {
      ingresos: totalIngresos,
      egresos: totalEgresos,
      utilidad: totalIngresos - totalEgresos,
      methods: combinedMethods,
    };
  };

  const calculated = getCalculatedData();

  const handleGenerateReport = () => {
    Alert.alert(
      'Reporte Generado',
      `Corte (${activeCategory}) - ${activePeriod}: ${periodData.dateLabel}\nIngresos: $${calculated.ingresos.toLocaleString()} | Utilidad: $${calculated.utilidad.toLocaleString()}`
    );
  };

  return (
    <DashboardLayout navigation={navigation} activeRoute="Caja">
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Header */}
        <View style={styles.topHeader}>
          <Text style={styles.title}>Caja / Corte</Text>
        </View>

        {/* Selector de periodo: Diario / Semanal / Mensual */}
        <View style={styles.periodContainer}>
          {['Diario', 'Semanal', 'Mensual'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodTab,
                activePeriod === period && styles.periodTabActive,
              ]}
              onPress={() => setActivePeriod(period)}
            >
              <Text
                style={[
                  styles.periodText,
                  activePeriod === period && styles.periodTextActive,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtro por origen de ingreso: Todos / Membresías / Tienda */}
        <View style={styles.categoryFilterRow}>
          {[
            { key: 'Todos', label: 'General (Todo)', icon: 'apps-outline' },
            { key: 'Membresias', label: 'Membresías', icon: 'card-outline' },
            { key: 'Tienda', label: 'Tienda', icon: 'cart-outline' },
          ].map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                activeCategory === cat.key && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat.key)}
            >
              <Ionicons
                name={cat.icon}
                size={16}
                color={activeCategory === cat.key ? '#0A0F14' : '#8E8E93'}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat.key && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.dateText}>{periodData.dateLabel}</Text>

        {/* Tarjeta de Desglose Comparativo entre Membresías y Tienda */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Desglose de Ingresos</Text>
          
          <View style={styles.breakdownRow}>
            {/* Membresías */}
            <TouchableOpacity
              style={[
                styles.breakdownItem,
                activeCategory === 'Membresias' && styles.breakdownItemActive,
              ]}
              onPress={() => setActiveCategory('Membresias')}
            >
              <View style={styles.breakdownIconBox}>
                <Ionicons name="people-outline" size={18} color="#00FF66" />
              </View>
              <View>
                <Text style={styles.breakdownLabel}>Membresías</Text>
                <Text style={styles.breakdownValue}>
                  ${periodData.membresias.ingresos.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Separador */}
            <View style={styles.breakdownDivider} />

            {/* Tienda */}
            <TouchableOpacity
              style={[
                styles.breakdownItem,
                activeCategory === 'Tienda' && styles.breakdownItemActive,
              ]}
              onPress={() => setActiveCategory('Tienda')}
            >
              <View style={styles.breakdownIconBox}>
                <Ionicons name="cart-outline" size={18} color="#00B2FF" />
              </View>
              <View>
                <Text style={styles.breakdownLabel}>Tienda</Text>
                <Text style={styles.breakdownValue}>
                  ${periodData.tienda.ingresos.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Métricas Principales */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>
              Ingresos ({activeCategory})
            </Text>
            <Text style={styles.metricValue}>
              ${calculated.ingresos.toLocaleString()}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Egresos</Text>
            <Text style={styles.metricValue}>
              ${calculated.egresos.toLocaleString()}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Utilidad Neta</Text>
            <Text style={styles.metricValueHighlight}>
              ${calculated.utilidad.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Métodos de Pago */}
        <View style={styles.methodsCard}>
          <Text style={styles.methodsTitle}>
            Métodos de pago — {activeCategory}
          </Text>

          {calculated.methods.map((item) => (
            <PaymentMethodRow
              key={item.id}
              icon={item.icon}
              label={item.label}
              percentage={item.percentage}
              amount={item.amount}
            />
          ))}
        </View>

        {/* Botón de Generar Reporte */}
        <TouchableOpacity
          style={styles.btnGenerate}
          onPress={handleGenerateReport}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text-outline" size={20} color="#0A0F14" />
          <Text style={styles.btnGenerateText}>
            Generar reporte ({activeCategory})
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },

  // Selector Periodo
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#0B0F17',
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: '#161F2E',
    marginBottom: 14,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  periodTabActive: {
    backgroundColor: '#00FF66',
  },
  periodText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
  },
  periodTextActive: {
    color: '#0A0F14',
    fontWeight: '700',
  },

  // Filtros por Categoría (Chips)
  categoryFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: '#161F2E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryChipActive: {
    backgroundColor: '#00FF66',
    borderColor: '#00FF66',
  },
  categoryChipText: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#0A0F14',
    fontWeight: '700',
  },

  dateText: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },

  // Tarjeta Desglose
  breakdownCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 16,
    marginBottom: 16,
  },
  breakdownTitle: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    borderRadius: 10,
  },
  breakdownItemActive: {
    backgroundColor: '#111823',
  },
  breakdownIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#161F2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownLabel: {
    color: '#8E8E93',
    fontSize: 12,
  },
  breakdownValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  breakdownDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#161F2E',
    marginHorizontal: 8,
  },

  // Métricas
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#0B0F17',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 16,
  },
  metricLabel: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  metricValueHighlight: {
    color: '#00FF66',
    fontSize: 18,
    fontWeight: '800',
  },

  // Métodos de Pago
  methodsCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 20,
    marginBottom: 24,
  },
  methodsTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 18,
  },

  // Botón Principal
  btnGenerate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00FF66',
    height: 48,
    borderRadius: 24,
    marginBottom: 30,
  },
  btnGenerateText: {
    color: '#0A0F14',
    fontSize: 15,
    fontWeight: '700',
  },
});