import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ProgressBar = ({ progress = 0 }) => (
  <View style={styles.track}>
    <View style={[styles.fill, { width: `${Math.min(Math.max(progress, 0), 100)}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  track: { height: 4, backgroundColor: 'rgba(22, 31, 46, 0.8)', borderRadius: 2, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#00FF66' },
});