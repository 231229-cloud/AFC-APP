import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SLIDES = [
  { id: '1', image: require('../../../assets/AFC.jpg') },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800' },
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800' },
  },
];

export const MembershipCardCarousel = ({ status, dueDate, discountPercent, onPress }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    if (containerWidth <= 0) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / containerWidth);
    if (newIndex !== activeIdx && newIndex >= 0 && newIndex < SLIDES.length) {
      setActiveIdx(newIndex);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.9}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* CARRUSEL BASADO EN SCROLLVIEW PAGING */}
      {containerWidth > 0 && (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={StyleSheet.absoluteFillObject}
        >
          {SLIDES.map((slide) => (
            <View key={slide.id} style={[styles.slide, { width: containerWidth }]}>
              <ImageBackground
                source={slide.image}
                style={styles.bgImage}
                imageStyle={{ opacity: 0.35, borderRadius: 14 }}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      )}

      {/* OVERLAY SUPERPUESTO (INFORMACIÓN DE MEMBRESÍA) */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Membresía</Text>
          <Ionicons name="chevron-forward" size={14} color="#8E8E93" />
        </View>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.dueDate}>
          {discountPercent > 0 ? `Desc Racha: -${discountPercent}%` : `Vence: ${dueDate}`}
        </Text>
      </View>

      {/* INDICADORES (DOTS) */}
      <View style={styles.pagination} pointerEvents="none">
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeIdx === i ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#161F2E',
    backgroundColor: '#0B0F17',
    overflow: 'hidden',
    position: 'relative',
  },
  slide: {
    height: 120,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 14,
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 7, 11, 0.45)',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '600',
  },
  status: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  dueDate: {
    color: '#00FF66',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 12,
    backgroundColor: '#00FF66',
  },
  inactiveDot: {
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});