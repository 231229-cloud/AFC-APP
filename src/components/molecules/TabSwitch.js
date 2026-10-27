import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TabSwitch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.singleTab}>
        <Text style={styles.activeText}>Iniciar sesión</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111822',
    borderRadius: 25,
    padding: 4,
    marginVertical: 12,
    width: '100%',
  },
  singleTab: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00FF66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: '#0A0F14',
    fontWeight: '700',
    fontSize: 14,
  },
});