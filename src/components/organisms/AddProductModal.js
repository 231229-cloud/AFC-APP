import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AddProductModal = ({ visible, onClose, onSaveProduct }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Suplementos');
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('5');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!name.trim() || !code.trim() || !price.trim() || !stock.trim()) {
      Alert.alert('Campos obligatorios', 'Por favor completa Nombre, Código, Precio y Stock.');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      code: code.trim(),
      category: category.trim(),
      supplier: supplier.trim() || 'General',
      price: parseFloat(price) || 0,
      cost: parseFloat(cost) || 0,
      stock: parseInt(stock, 10) || 0,
      minStock: parseInt(minStock, 10) || 5,
      image: image.trim() || 'https://via.placeholder.com/100',
      description: description.trim() || 'Sin descripción disponible.',
      history: [
        {
          date: new Date().toLocaleDateString('es-MX'),
          type: 'Compra',
          qty: parseInt(stock, 10) || 0,
          finalStock: parseInt(stock, 10) || 0,
          unitCost: parseFloat(cost) || 0,
          total: (parseInt(stock, 10) || 0) * (parseFloat(cost) || 0),
          user: 'Admin',
        },
      ],
    };

    onSaveProduct(newProduct);

    // Limpiar campos
    setName('');
    setCode('');
    setSupplier('');
    setPrice('');
    setCost('');
    setStock('');
    setImage('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>Agregar Nuevo Producto</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.formScroll}>
            <Text style={styles.label}>Nombre del producto *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Proteína Whey 2kg"
              placeholderTextColor="#8E8E93"
              value={name}
              onChangeText={setName}
            />

            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Código / SKU *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. AFC-007"
                  placeholderTextColor="#8E8E93"
                  value={code}
                  onChangeText={setCode}
                />
              </View>

              <View style={styles.flex1}>
                <Text style={styles.label}>Categoría</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Suplementos"
                  placeholderTextColor="#8E8E93"
                  value={category}
                  onChangeText={setCategory}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Precio de venta ($) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>

              <View style={styles.flex1}>
                <Text style={styles.label}>Costo por unidad ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={cost}
                  onChangeText={setCost}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Stock inicial *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={stock}
                  onChangeText={setStock}
                />
              </View>

              <View style={styles.flex1}>
                <Text style={styles.label}>Stock mínimo de alerta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="5"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={minStock}
                  onChangeText={setMinStock}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Proveedor</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Optimum Nutrition"
                  placeholderTextColor="#8E8E93"
                  value={supplier}
                  onChangeText={setSupplier}
                />
              </View>

              <View style={styles.flex1}>
                <Text style={styles.label}>URL de la Imagen</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://..."
                  placeholderTextColor="#8E8E93"
                  value={image}
                  onChangeText={setImage}
                />
              </View>
            </View>

            <Text style={styles.label}>Descripción del producto</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Detalles sobre beneficios, sabor, porciones, etc."
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
          </ScrollView>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Ionicons name="checkmark-circle" size={18} color="#0A0F14" />
              <Text style={styles.btnSaveText}>Guardar Producto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 520,
    maxHeight: '90%',
    backgroundColor: '#0B0F17',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formScroll: {
    marginBottom: 20,
  },
  label: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#111823',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#161F2E',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    height: 42,
    fontSize: 14,
    marginBottom: 14,
  },
  textArea: {
    height: 70,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btnCancel: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#161F2E',
  },
  btnCancelText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  btnSave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#00FF66',
  },
  btnSaveText: {
    color: '#0A0F14',
    fontWeight: '700',
  },
});