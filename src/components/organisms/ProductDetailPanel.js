import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ProductDetailPanel = ({ product, onAddStock }) => {
  const [addQuantity, setAddQuantity] = useState('15');
  const [unitCost, setUnitCost] = useState(product?.cost ? product.cost.toString() : '320');

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Selecciona un producto para ver sus detalles</Text>
      </View>
    );
  }

  const handleAdd = () => {
    const qty = parseInt(addQuantity, 10) || 0;
    const cost = parseFloat(unitCost) || 0;
    if (qty > 0) {
      onAddStock(product.id, qty, cost);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header del Producto */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <View style={styles.badgeActive}>
            <Text style={styles.badgeActiveText}>Activo</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.btnEdit}>
              <Ionicons name="create-outline" size={14} color="#FFFFFF" />
              <Text style={styles.btnEditText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDelete}>
              <Ionicons name="trash-outline" size={14} color="#FF453A" />
              <Text style={styles.btnDeleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.skuText}>
          Código: {product.code}  |  Categoría: {product.category}  |  Proveedor: {product.supplier}
        </Text>
        <Text style={styles.priceBig}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Métricas Rápidas */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Ionicons name="cube-outline" size={18} color="#00FF66" />
            <View>
              <Text style={styles.metricLabel}>Stock actual</Text>
              <Text style={styles.metricValueGreen}>{product.stock} unidades</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="add-circle-outline" size={18} color="#00FF66" />
            <View>
              <Text style={styles.metricLabel}>Stock mínimo</Text>
              <Text style={styles.metricValue}>{product.minStock} unidades</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="pricetag-outline" size={18} color="#00FF66" />
            <View>
              <Text style={styles.metricLabel}>Precio de venta</Text>
              <Text style={styles.metricValue}>${product.price}</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="cash-outline" size={18} color="#00FF66" />
            <View>
              <Text style={styles.metricLabel}>Costo por unidad</Text>
              <Text style={styles.metricValue}>${product.cost}</Text>
            </View>
          </View>
        </View>

        {/* Formulario Agregar Existencias */}
        <Text style={styles.sectionTitle}>Agregar existencias</Text>
        <View style={styles.addFormRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cantidad a agregar</Text>
            <TextInput
              style={styles.input}
              value={addQuantity}
              onChangeText={setAddQuantity}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Costo de la compra (opcional)</Text>
            <View style={styles.currencyInputWrapper}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 22 }]}
                value={unitCost}
                onChangeText={setUnitCost}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btnAddSubmit} onPress={handleAdd}>
            <Ionicons name="add" size={18} color="#0A0F14" />
            <Text style={styles.btnAddSubmitText}>Agregar al inventario</Text>
          </TouchableOpacity>
        </View>

        {/* Resumen de compra */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="refresh-outline" size={18} color="#00FF66" />
            <View>
              <Text style={styles.summaryLabel}>Nuevo total de existencias</Text>
              <Text style={styles.summaryValueGreen}>
                {product.stock + (parseInt(addQuantity, 10) || 0)} unidades
              </Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Costo de la nueva compra</Text>
            <Text style={styles.summaryValue}>
              ${((parseInt(addQuantity, 10) || 0) * (parseFloat(unitCost) || 0)).toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fecha de registro</Text>
            <Text style={styles.summaryValue}>29/08/2025</Text>
          </View>
        </View>
      </View>

      {/* Tabla Historial de Inventario */}
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Historial de inventario</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.th, { flex: 1.2 }]}>Fecha</Text>
          <Text style={[styles.th, { flex: 1 }]}>Tipo</Text>
          <Text style={[styles.th, { flex: 1 }]}>Cantidad</Text>
          <Text style={[styles.th, { flex: 1 }]}>Stock final</Text>
          <Text style={[styles.th, { flex: 1 }]}>Costo unitario</Text>
          <Text style={[styles.th, { flex: 1 }]}>Total</Text>
          <Text style={[styles.th, { flex: 1 }]}>Usuario</Text>
        </View>

        {product.history?.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.td, { flex: 1.2 }]}>{item.date}</Text>

            <View style={[styles.td, { flex: 1 }]}>
              <View
                style={[
                  styles.typeBadge,
                  item.type === 'Compra' ? styles.typeBuy : styles.typeSell,
                ]}
              >
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>

            <Text style={[styles.td, { flex: 1, color: item.type === 'Compra' ? '#00FF66' : '#FF453A' }]}>
              {item.type === 'Compra' ? `+${item.qty}` : `-${item.qty}`}
            </Text>
            <Text style={[styles.td, { flex: 1 }]}>{item.finalStock}</Text>
            <Text style={[styles.td, { flex: 1 }]}>${item.unitCost}</Text>
            <Text style={[styles.td, { flex: 1 }]}>${item.total}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{item.user}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { color: '#8E8E93', fontSize: 14 },
  headerCard: { backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20, marginBottom: 16 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  productTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
  badgeActive: { backgroundColor: 'rgba(0, 255, 102, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeActiveText: { color: '#00FF66', fontSize: 11, fontWeight: '700' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  btnEdit: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#161F2E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnEditText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  btnDelete: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255, 69, 58, 0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnDeleteText: { color: '#FF453A', fontSize: 12, fontWeight: '600' },
  skuText: { color: '#8E8E93', fontSize: 12, marginTop: 6 },
  priceBig: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginVertical: 8 },
  description: { color: '#8E8E93', fontSize: 13, lineHeight: 18, marginBottom: 16 },
  metricsGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  metricCard: { flex: 1, backgroundColor: '#111823', borderRadius: 12, borderWidth: 1, borderColor: '#161F2E', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  metricLabel: { color: '#8E8E93', fontSize: 11 },
  metricValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  metricValueGreen: { color: '#00FF66', fontSize: 15, fontWeight: '700' },
  sectionTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginBottom: 12 },
  addFormRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginBottom: 16 },
  inputGroup: { flex: 1 },
  inputLabel: { color: '#8E8E93', fontSize: 11, marginBottom: 6 },
  input: { backgroundColor: '#111823', borderRadius: 8, borderWidth: 1, borderColor: '#161F2E', color: '#FFFFFF', height: 40, paddingHorizontal: 12, fontSize: 14 },
  currencyInputWrapper: { position: 'relative', justifyContent: 'center' },
  currencySymbol: { position: 'absolute', left: 10, color: '#8E8E93', fontSize: 14, zIndex: 1 },
  btnAddSubmit: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#00FF66', paddingHorizontal: 16, height: 40, borderRadius: 8 },
  btnAddSubmitText: { color: '#0A0F14', fontWeight: '700', fontSize: 13 },
  summaryRow: { flexDirection: 'row', backgroundColor: '#111823', borderRadius: 12, padding: 14, gap: 20 },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  summaryLabel: { color: '#8E8E93', fontSize: 11 },
  summaryValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  summaryValueGreen: { color: '#00FF66', fontSize: 15, fontWeight: '700' },
  historyCard: { backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#111823', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8 },
  th: { color: '#8E8E93', fontSize: 12, fontWeight: '600' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#161F2E' },
  td: { color: '#FFFFFF', fontSize: 12 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, alignSelf: 'flex-start' },
  typeBuy: { backgroundColor: 'rgba(0, 255, 102, 0.15)' },
  typeSell: { backgroundColor: 'rgba(255, 69, 58, 0.15)' },
  typeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
});