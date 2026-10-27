import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StockBadge } from '../atoms/StockBadge';

export const ProductCard = ({ product, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onSelect(product)}
      activeOpacity={0.8}
    >
      <TouchableOpacity style={styles.btnMore}>
        <Ionicons name="ellipsis-horizontal" size={16} color="#8E8E93" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>

      <View style={styles.badgeWrapper}>
        <StockBadge stock={product.stock} minStock={product.minStock} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '31%',
    backgroundColor: '#0B0F17',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 12,
    marginBottom: 12,
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#00FF66',
    backgroundColor: '#0F1723',
  },
  btnMore: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  imageContainer: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  image: {
    width: '80%',
    height: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    minHeight: 34,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 4,
  },
  badgeWrapper: {
    marginTop: 4,
  },
});