import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const CoachAvatar = ({ uri }) => (
  <View style={styles.avatarBorder}>
    <Image source={{ uri }} style={styles.avatarImage} />
  </View>
);

const styles = StyleSheet.create({
  avatarBorder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#00FF66',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
});