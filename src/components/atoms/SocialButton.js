import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const SocialButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 48,
    backgroundColor: '#161C24',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#212B36',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  text: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
});