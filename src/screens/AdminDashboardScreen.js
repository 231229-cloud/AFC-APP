import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';

export const AdminDashboardScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  return (
    <DashboardLayout navigation={navigation} activeRoute="AdminDashboard">
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Header Superior */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcomeTitle}>
              Bienvenido, <Text style={styles.highlightGreen}>Administrador</Text>
            </Text>
            <Text style={styles.welcomeSub}>Aquí tienes un resumen de tu gimnasio.</Text>
          </View>
          <View style={styles.userDateContainer}>
            <Text style={styles.dateText}>12 de abril de 2026</Text>
            <Ionicons name="person-circle-outline" size={32} color="#8E8E93" />
          </View>
        </View>

        {/* Tarjetas de Métricas */}
        <View style={styles.cardsGrid}>
          <View style={styles.statCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#00FF66' }]}>
                <Ionicons name="person" size={20} color="#0A0F14" />
              </View>
              <View>
                <Text style={styles.statLabel}>Socios activos</Text>
                <Text style={styles.statNumber}>142</Text>
              </View>
            </View>
            <Text style={styles.statTrendUp}>↑ +5 este mes</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#FF453A' }]}>
                <Ionicons name="time" size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.statLabel}>Socios vencidos</Text>
                <Text style={styles.statNumber}>18</Text>
              </View>
            </View>
            <Text style={styles.statTrendDown}>↓ -3 este mes</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#00FF66' }]}>
                <Text style={styles.currencyIcon}>$</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Ingresos del mes</Text>
                <Text style={styles.statNumber}>$86,450</Text>
              </View>
            </View>
            <Text style={styles.statTrendUp}>↑ +12%</Text>
          </View>
        </View>

        {/* Sección de Gráfica + Ventas */}
        <View style={styles.middleGrid}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Ingresos del mes</Text>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#00FF66' }]} />
                  <Text style={styles.legendText}>Ingresos del gimnasio</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#00B2FF' }]} />
                  <Text style={styles.legendText}>Tienda</Text>
                </View>
              </View>
            </View>

            {/* Contenedor de barras */}
            <View style={styles.chartVisualContainer}>
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />

              <View style={styles.chartPlaceholder}>
                <View style={styles.barColumn}>
                  <View style={[styles.chartBar, { height: '40%', backgroundColor: '#00FF66' }]} />
                </View>
                <View style={styles.barColumn}>
                  <View style={[styles.chartBar, { height: '70%', backgroundColor: '#00FF66' }]} />
                </View>
                <View style={styles.barColumn}>
                  <View style={[styles.chartBar, { height: '50%', backgroundColor: '#00FF66' }]} />
                </View>
                <View style={styles.barColumn}>
                  <View style={[styles.chartBar, { height: '85%', backgroundColor: '#00FF66' }]} />
                </View>
              </View>
            </View>

            {/* Fila de meses */}
            <View style={styles.monthsRow}>
              <Text style={styles.monthText}>Ene</Text>
              <Text style={styles.monthText}>Feb</Text>
              <Text style={styles.monthText}>Mar</Text>
              <Text style={styles.monthText}>Abr</Text>
            </View>
          </View>

          {/* Ventas de Tienda */}
          <View style={styles.salesCard}>
            <Text style={styles.sectionTitle}>Ventas de tienda</Text>

            <View style={styles.salesList}>
              <View style={styles.saleItem}>
                <View style={styles.saleLeft}>
                  <Ionicons name="wine-outline" size={20} color="#8E8E93" />
                  <Text style={styles.saleName}>Proteínas</Text>
                </View>
                <Text style={styles.saleAmount}>$18,450</Text>
              </View>

              <View style={styles.saleItem}>
                <View style={styles.saleLeft}>
                  <Ionicons name="flask-outline" size={20} color="#8E8E93" />
                  <Text style={styles.saleName}>Aminos</Text>
                </View>
                <Text style={styles.saleAmount}>$7,230</Text>
              </View>

              <View style={styles.saleItem}>
                <View style={styles.saleLeft}>
                  <Ionicons name="bag-handle-outline" size={20} color="#8E8E93" />
                  <Text style={styles.saleName}>Accesorios</Text>
                </View>
                <Text style={styles.saleAmount}>$5,180</Text>
              </View>

              <View style={styles.saleItem}>
                <View style={styles.saleLeft}>
                  <Ionicons name="flash-outline" size={20} color="#8E8E93" />
                  <Text style={styles.saleName}>Barras energéticas</Text>
                </View>
                <Text style={styles.saleAmount}>$3,420</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sección de Alertas */}
        <View style={styles.alertsCard}>
          <View style={styles.alertsHeader}>
            <Text style={styles.sectionTitle}>Alertas</Text>
            <TouchableOpacity style={styles.btnVerTodo}>
              <Text style={styles.btnVerTodoText}>Ver Todo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.alertRow}
            onPress={() => navigation.navigate('Members')}
          >
            <View style={styles.alertLeft}>
              <Ionicons name="notifications" size={20} color="#FF453A" style={styles.alertIcon} />
              <Text style={styles.alertText}>5 mensualidades por vencer en los próximos 3 días</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alertRow}
            onPress={() => navigation.navigate('Tienda')}
          >
            <View style={styles.alertLeft}>
              <Ionicons name="notifications" size={20} color="#FF453A" style={styles.alertIcon} />
              <Text style={styles.alertText}>Producto con pocas existencias: Whey Protein 2kg</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  mainContent: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  highlightGreen: { color: '#00FF66' },
  welcomeSub: { color: '#8E8E93', fontSize: 13, marginTop: 4 },
  userDateContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dateText: { color: '#8E8E93', fontSize: 13, fontWeight: '500' },

  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, minWidth: 200, backgroundColor: '#0B0F17', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#161F2E' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  iconBadge: { width: 42, height: 42, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  currencyIcon: { fontSize: 20, fontWeight: 'bold', color: '#0A0F14' },
  statLabel: { color: '#8E8E93', fontSize: 13, fontWeight: '500' },
  statNumber: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 2 },
  statTrendUp: { color: '#00FF66', fontSize: 12, fontWeight: '600' },
  statTrendDown: { color: '#FF453A', fontSize: 12, fontWeight: '600' },

  middleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  chartCard: { flex: 2, minWidth: 320, backgroundColor: '#0B0F17', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#161F2E' },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  legendContainer: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { color: '#8E8E93', fontSize: 11 },

  chartVisualContainer: { 
    height: 140, 
    justify: 'space-between', 
    marginTop: 10,
    position: 'relative',
    width: '100%',
  },
  gridLine: { 
    height: 1, 
    backgroundColor: '#1E293B', 
    width: '100%', 
  },
  chartPlaceholder: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    height: '100%', 
    position: 'absolute', 
    width: '100%',
    paddingHorizontal: 20,
  },
  barColumn: {
    width: 40,
    height: '100%',
    justify: 'flex-end',
    alignItems: 'center',
  },
  chartBar: { 
    width: 14, 
    borderRadius: 7, 
    opacity: 0.95, 
  },
  monthsRow: { 
    flexDirection: 'row', 
    justify: 'space-between', 
    marginTop: 16, 
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#161F2E',
    paddingHorizontal: 20,
  },
  monthText: { 
    color: '#FFFFFF', 
    fontSize: 13, 
    fontWeight: '700',
    width: 40,
    textAlign: 'center',
  },

  salesCard: { flex: 1, minWidth: 260, backgroundColor: '#0B0F17', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#161F2E' },
  salesList: { marginTop: 16, gap: 16 },
  saleItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  saleLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  saleName: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  saleAmount: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  alertsCard: { backgroundColor: '#0B0F17', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', marginBottom: 30 },
  alertsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  btnVerTodo: { backgroundColor: '#00FF66', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8 },
  btnVerTodoText: { color: '#0A0F14', fontWeight: '700', fontSize: 12 },
  alertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#161F2E' },
  alertLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  alertIcon: { marginRight: 4 },
  alertText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500' },
});