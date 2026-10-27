import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatusTag = ({ status }) => {
  const isOptimal = status === 'optimal';
  const isMedium = status === 'medium';

  return (
    <View
      style={[
        styles.tag,
        isOptimal ? styles.tagOptimal : isMedium ? styles.tagMedium : styles.tagHigh,
      ]}
    >
      <Text
        style={[
          styles.tagText,
          isOptimal ? styles.textOptimal : isMedium ? styles.textMedium : styles.textHigh,
        ]}
      >
        {isOptimal ? '🟢 Ideal para Entrenar' : isMedium ? '🟡 Afluencia Media' : '🔴 Hora Pico'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  tagOptimal: { backgroundColor: 'rgba(0, 255, 102, 0.15)' },
  tagMedium: { backgroundColor: 'rgba(255, 204, 0, 0.15)' },
  tagHigh: { backgroundColor: 'rgba(255, 69, 58, 0.15)' },
  textOptimal: { color: '#00FF66', fontSize: 11, fontWeight: '800' },
  textMedium: { color: '#FFCC00', fontSize: 11, fontWeight: '800' },
  textHigh: { color: '#FF453A', fontSize: 11, fontWeight: '800' },
});