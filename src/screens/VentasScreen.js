import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';

// Inventario vivo de la Tienda
const INITIAL_INVENTORY = [
  { id: '1', name: 'BCAA 5000 (100 serv.)', price: 649, stock: 14, code: 'AFC-001' },
  { id: '2', name: 'Creatina Monohidratada (300g)', price: 449, stock: 26, code: 'AFC-002' },
  { id: '3', name: 'Shaker Metálico (750ml)', price: 299, stock: 10, code: 'AFC-004' },
  { id: '4', name: 'Barra Proteica (60g)', price: 36, stock: 32, code: 'AFC-005' },
  { id: '5', name: 'Agua Ciel 1L', price: 20, stock: 50, code: 'AFC-007' },
  { id: '6', name: 'Electrolit 625ml', price: 38, stock: 24, code: 'AFC-008' },
];

const INITIAL_SALES = [
  {
    id: 'V-1001',
    time: '14:32 hrs',
    date: '25 Oct 2026',
    itemsCount: 3,
    itemsSummary: '1x Creatina, 1x Shaker, 1x Agua Ciel',
    total: 768,
  },
  {
    id: 'V-1002',
    time: '12:15 hrs',
    date: '25 Oct 2026',
    itemsCount: 1,
    itemsSummary: '1x BCAA 5000',
    total: 649,
  },
];

export const VentasScreen = ({ navigation }) => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [sales, setSales] = useState(INITIAL_SALES);
  const [cart, setCart] = useState([]);

  const [productSearch, setProductSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');

  // Agregar al carrito al toque directo
  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      Alert.alert('Sin Stock', 'Producto agotado.');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          Alert.alert('Stock insuficiente', 'Superas el límite de existencias.');
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Registrar venta y descontar stock en 1 clic
  const handleCheckout = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const itemsSummary = cart.map((i) => `${i.qty}x ${i.name}`).join(', ');

    const newSale = {
      id: `V-${1000 + sales.length + 1}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
      itemsCount,
      itemsSummary,
      total,
    };

    // Descontar del inventario inmediatamente
    setInventory((prevInv) =>
      prevInv.map((prod) => {
        const cartItem = cart.find((c) => c.id === prod.id);
        return cartItem ? { ...prod, stock: prod.stock - cartItem.qty } : prod;
      })
    );

    setSales([newSale, ...sales]);
    setCart([]);
  };

  // Cálculos dinámicos para las métricas
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalMontoGeneral = sales.reduce((acc, s) => acc + s.total, 0);
  const totalProductosVendidos = sales.reduce((acc, s) => acc + s.itemsCount, 0);

  const filteredInventory = inventory.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredSales = sales.filter(
    (s) =>
      s.id.toLowerCase().includes(historySearch.toLowerCase()) ||
      s.itemsSummary.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <DashboardLayout navigation={navigation} activeRoute="Ventas">
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>Módulo Directo de Ventas</Text>

        {/* TARJETAS DE MÉTRICAS DE VENTAS */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Vendido</Text>
            <Text style={styles.metricValueHighlight}>
              ${totalMontoGeneral.toLocaleString()} MXN
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Transacciones</Text>
            <Text style={styles.metricValue}>{sales.length}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Productos Vendidos</Text>
            <Text style={styles.metricValue}>{totalProductosVendidos} pcs</Text>
          </View>
        </View>

        {/* ÁREA DE TRABAJO PRINCIPAL (POS DIRECTO) */}
        <View style={styles.posRow}>
          {/* Lado Izquierdo: Catálogo de Selección Directa */}
          <View style={styles.catalogCard}>
            <Text style={styles.sectionTitle}>1. Toca para Agregar Producto</Text>

            <View style={styles.searchBox}>
              <Ionicons name="search" size={16} color="#8E8E93" />
              <TextInput
                placeholder="Buscar por nombre o código..."
                placeholderTextColor="#8E8E93"
                style={styles.searchInput}
                value={productSearch}
                onChangeText={setProductSearch}
              />
            </View>

            <ScrollView style={{ maxHeight: 260 }} showsVerticalScrollIndicator={false}>
              <View style={styles.productsGrid}>
                {filteredInventory.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.productTile}
                    onPress={() => handleAddToCart(item)}
                    activeOpacity={0.7}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tileName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.tileStock}>Stock: {item.stock} pcs</Text>
                    </View>
                    <Text style={styles.tilePrice}>${item.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Lado Derecho: Ticket y Cobro Rápido */}
          <View style={styles.ticketCard}>
            <Text style={styles.sectionTitle}>2. Venta Actual</Text>

            <ScrollView style={{ flex: 1, marginVertical: 8 }} showsVerticalScrollIndicator={false}>
              {cart.length === 0 ? (
                <View style={styles.emptyCartBox}>
                  <Ionicons name="cart-outline" size={32} color="#161F2E" />
                  <Text style={styles.emptyCartText}>Sin productos en el ticket</Text>
                </View>
              ) : (
                cart.map((item) => (
                  <View key={item.id} style={styles.cartRow}>
                    <Text style={styles.cartItemName} numberOfLines={1}>{item.name}</Text>

                    <View style={styles.qtyBox}>
                      <TouchableOpacity onPress={() => handleUpdateQty(item.id, -1)}>
                        <Ionicons name="remove" size={12} color="#FFF" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity onPress={() => handleUpdateQty(item.id, 1)}>
                        <Ionicons name="add" size={12} color="#FFF" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.cartItemPrice}>${item.price * item.qty}</Text>
                  </View>
                ))
              )}
            </ScrollView>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a Cobrar:</Text>
              <Text style={styles.totalValue}>${cartTotal} MXN</Text>
            </View>

            <TouchableOpacity
              style={[styles.btnPay, cart.length === 0 && styles.btnPayDisabled]}
              disabled={cart.length === 0}
              onPress={handleCheckout}
            >
              <Ionicons name="checkmark-done" size={20} color="#0A0F14" />
              <Text style={styles.btnPayText}>COMPLETAR VENTA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HISTORIAL GENERAL DE VENTAS */}
        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <View>
              <Text style={styles.sectionTitle}>Historial General de Compras</Text>
              <Text style={styles.historySub}>Registro cronológico de operaciones</Text>
            </View>

            <View style={[styles.searchBox, { width: 260 }]}>
              <Ionicons name="search" size={16} color="#8E8E93" />
              <TextInput
                placeholder="Filtrar historial..."
                placeholderTextColor="#8E8E93"
                style={styles.searchInput}
                value={historySearch}
                onChangeText={setHistorySearch}
              />
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 1 }]}>ID Ticket</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Fecha / Hora</Text>
            <Text style={[styles.th, { flex: 3 }]}>Detalle de Compra</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Total</Text>
          </View>

          {filteredSales.map((sale) => (
            <View key={sale.id} style={styles.tableRow}>
              <Text style={[styles.tdBold, { flex: 1 }]}>{sale.id}</Text>
              <View style={{ flex: 1.2 }}>
                <Text style={styles.tdWhite}>{sale.date}</Text>
                <Text style={styles.tdSub}>{sale.time}</Text>
              </View>
              <Text style={[styles.td, { flex: 3 }]} numberOfLines={1}>
                {sale.itemsSummary}
              </Text>
              <Text style={[styles.tdGreen, { flex: 1, textAlign: 'right' }]}>
                ${sale.total} MXN
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },

  // Métricas
  metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  metricCard: {
    flex: 1,
    backgroundColor: '#0B0F17',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 16,
  },
  metricLabel: { color: '#8E8E93', fontSize: 12, fontWeight: '500', marginBottom: 6 },
  metricValue: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  metricValueHighlight: { color: '#00FF66', fontSize: 20, fontWeight: '800' },

  // POS Layout Directo
  posRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  catalogCard: { flex: 1.4, backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 16 },
  ticketCard: { flex: 1, backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 16, justifyContent: 'space-between' },

  sectionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111823', borderWidth: 1, borderColor: '#161F2E', borderRadius: 10, paddingHorizontal: 12, height: 38, gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 13 },

  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  productTile: { width: '48.5%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#111823', borderWidth: 1, borderColor: '#161F2E', borderRadius: 10, padding: 10 },
  tileName: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  tileStock: { color: '#8E8E93', fontSize: 11, marginTop: 2 },
  tilePrice: { color: '#00FF66', fontSize: 14, fontWeight: '700', marginLeft: 8 },

  emptyCartBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, gap: 8 },
  emptyCartText: { color: '#8E8E93', fontSize: 12 },

  cartRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111823', padding: 8, borderRadius: 8, marginBottom: 6 },
  cartItemName: { color: '#FFFFFF', fontSize: 12, flex: 1 },
  qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B0F17', borderRadius: 4, paddingHorizontal: 6, gap: 6 },
  qtyText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  cartItemPrice: { color: '#00FF66', fontSize: 13, fontWeight: '700', marginLeft: 10 },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#161F2E', paddingTop: 12, marginBottom: 12 },
  totalLabel: { color: '#8E8E93', fontSize: 13 },
  totalValue: { color: '#00FF66', fontSize: 20, fontWeight: '800' },

  btnPay: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#00FF66', height: 44, borderRadius: 10 },
  btnPayDisabled: { opacity: 0.3 },
  btnPayText: { color: '#0A0F14', fontWeight: '800', fontSize: 14 },

  // Historial General
  historyCard: { backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20, marginBottom: 30 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  historySub: { color: '#8E8E93', fontSize: 12, marginTop: 2 },

  tableHeader: { flexDirection: 'row', backgroundColor: '#111823', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8 },
  th: { color: '#8E8E93', fontSize: 12, fontWeight: '600' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#161F2E' },
  td: { color: '#8E8E93', fontSize: 13 },
  tdWhite: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  tdSub: { color: '#8E8E93', fontSize: 11 },
  tdBold: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  tdGreen: { color: '#00FF66', fontWeight: '700', fontSize: 14 },
});