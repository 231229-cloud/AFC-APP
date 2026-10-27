import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { ProductCard } from '../components/molecules/ProductCard';
import { ProductDetailPanel } from '../components/organisms/ProductDetailPanel';
import { AddProductModal } from '../components/organisms/AddProductModal';
import { AddSupplierModal } from '../components/organisms/AddSupplierModal';
import { AddCategoryModal } from '../components/organisms/AddCategoryModal';

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'BCAA 5000 (100 serv.)',
    price: 649,
    stock: 14,
    minStock: 5,
    cost: 450,
    code: 'AFC-001',
    category: 'Suplementos',
    supplier: 'ON',
    image: 'https://via.placeholder.com/100',
    description: 'Aminoácidos de cadena ramificada ideales para la recuperación muscular tras entrenamientos de alta intensidad.',
  },
  {
    id: '2',
    name: 'Creatina (300g)',
    price: 449,
    stock: 26,
    minStock: 5,
    cost: 320,
    code: 'AFC-002',
    category: 'Suplementos',
    supplier: 'ON',
    image: 'https://via.placeholder.com/100',
    description: 'Creatina monohidratada de alta pureza. Mejora el rendimiento, la fuerza y la recuperación muscular.',
  },
  {
    id: '3',
    name: 'Shaker metálico (750ml)',
    price: 299,
    stock: 10,
    minStock: 5,
    cost: 180,
    code: 'AFC-004',
    category: 'Accesorios',
    supplier: 'AFC',
    image: 'https://via.placeholder.com/100',
    description: 'Vaso mezclador térmico de acero inoxidable resistente con bola mezcladora.',
  },
];

const INITIAL_SUPPLIERS = [
  { id: 'S-1', name: 'Optimum Nutrition (ON)', contact: 'ventas@on.com', phone: '555-0192', category: 'Suplementos' },
  { id: 'S-2', name: 'AFC Gear', contact: 'contacto@afc.com', phone: '555-0144', category: 'Accesorios' },
];

export const POSTiendaScreen = ({ navigation }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [customCategories, setCustomCategories] = useState(['Suplementos', 'Accesorios', 'Snacks']);
  
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [activeTab, setActiveTab] = useState('Productos');
  const [search, setSearch] = useState('');

  // Modales
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const handleAddStock = (productId, qty, cost) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + qty } : p))
    );
    if (selectedProduct?.id === productId) {
      setSelectedProduct((prev) => ({ ...prev, stock: prev.stock + qty }));
    }
  };

  const handleSaveProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    setSelectedProduct(newProduct);
  };

  const handleSaveSupplier = (newSupplier) => {
    setSuppliers([newSupplier, ...suppliers]);
  };

  const handleSaveCategory = (newCatName) => {
    if (!customCategories.includes(newCatName)) {
      setCustomCategories([...customCategories, newCatName]);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout navigation={navigation} activeRoute="Tienda">
      <View style={styles.topHeader}>
        <Text style={styles.title}>Inventario Tienda</Text>
        
        {/* Botón Dinámico según la Pestaña Activa */}
        {activeTab === 'Productos' && (
          <TouchableOpacity style={styles.btnAdd} onPress={() => setShowAddProductModal(true)}>
            <Ionicons name="add" size={18} color="#0A0F14" />
            <Text style={styles.btnAddText}>Agregar Producto</Text>
          </TouchableOpacity>
        )}

        {activeTab === 'Categorías' && (
          <TouchableOpacity style={styles.btnAdd} onPress={() => setShowAddCategoryModal(true)}>
            <Ionicons name="add" size={18} color="#0A0F14" />
            <Text style={styles.btnAddText}>Nueva Categoría</Text>
          </TouchableOpacity>
        )}

        {activeTab === 'Proveedores' && (
          <TouchableOpacity style={styles.btnAdd} onPress={() => setShowAddSupplierModal(true)}>
            <Ionicons name="add" size={18} color="#0A0F14" />
            <Text style={styles.btnAddText}>Agregar Proveedor</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentLayout}>
        <View style={styles.catalogSection}>
          {/* Pestañas */}
          <View style={styles.tabRow}>
            {['Productos', 'Ventas', 'Categorías', 'Proveedores'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Vista de Productos */}
          {activeTab === 'Productos' && (
            <>
              <View style={styles.filterBar}>
                <View style={styles.searchBox}>
                  <Ionicons name="search" size={16} color="#8E8E93" />
                  <TextInput
                    placeholder="Buscar productos..."
                    placeholderTextColor="#8E8E93"
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                  />
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.productsGrid}>
                  {filteredProducts.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      isSelected={selectedProduct?.id === item.id}
                      onSelect={setSelectedProduct}
                    />
                  ))}
                </View>
              </ScrollView>
            </>
          )}

          {/* Vista de Categorías */}
          {activeTab === 'Categorías' && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.gridCards}>
                {customCategories.map((cat, idx) => {
                  const count = products.filter((p) => p.category === cat).length;
                  return (
                    <View key={idx} style={styles.categoryCard}>
                      <Ionicons name="pricetag-outline" size={24} color="#00FF66" />
                      <Text style={styles.categoryTitle}>{cat}</Text>
                      <Text style={styles.categorySub}>{count} productos en catálogo</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}

          {/* Vista de Proveedores */}
          {activeTab === 'Proveedores' && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tableCard}>
                <Text style={styles.sectionHeaderTitle}>Proveedores Registrados</Text>
                {suppliers.map((sup) => (
                  <View key={sup.id} style={styles.supplierCard}>
                    <View style={styles.supplierHeader}>
                      <Text style={styles.supplierName}>{sup.name}</Text>
                      <View style={styles.supplierBadge}>
                        <Text style={styles.supplierBadgeText}>{sup.category}</Text>
                      </View>
                    </View>
                    <Text style={styles.supplierSub}>Contacto: {sup.contact} | Tel: {sup.phone}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Panel lateral con detalle */}
        <View style={styles.detailSection}>
          <ProductDetailPanel product={selectedProduct} onAddStock={handleAddStock} />
        </View>
      </View>

      {/* Modales */}
      <AddProductModal
        visible={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSaveProduct={handleSaveProduct}
      />
      <AddSupplierModal
        visible={showAddSupplierModal}
        onClose={() => setShowAddSupplierModal(false)}
        onSaveSupplier={handleSaveSupplier}
      />
      <AddCategoryModal
        visible={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onSaveCategory={handleSaveCategory}
      />
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  btnAdd: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#00FF66', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  btnAddText: { color: '#0A0F14', fontWeight: '700', fontSize: 13 },
  contentLayout: { flex: 1, flexDirection: 'row', gap: 16 },
  catalogSection: { flex: 1 },
  detailSection: { width: '55%' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tabItem: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E' },
  tabItemActive: { backgroundColor: '#00FF66', borderColor: '#00FF66' },
  tabText: { color: '#8E8E93', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#0A0F14', fontWeight: '700' },
  filterBar: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B0F17', borderWidth: 1, borderColor: '#161F2E', borderRadius: 10, paddingHorizontal: 12, height: 38, gap: 8 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 13 },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: '2.5%' },
  tableCard: { backgroundColor: '#0B0F17', borderRadius: 16, borderWidth: 1, borderColor: '#161F2E', padding: 20 },
  sectionHeaderTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 16 },
  gridCards: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: { width: '48%', backgroundColor: '#0B0F17', borderRadius: 14, borderWidth: 1, borderColor: '#161F2E', padding: 16, gap: 8 },
  categoryTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  categorySub: { color: '#8E8E93', fontSize: 12 },
  supplierCard: { backgroundColor: '#111823', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#161F2E' },
  supplierHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  supplierName: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  supplierBadge: { backgroundColor: 'rgba(0, 255, 102, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  supplierBadgeText: { color: '#00FF66', fontSize: 11, fontWeight: '700' },
  supplierSub: { color: '#8E8E93', fontSize: 12 },
});