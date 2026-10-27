import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SocialButton } from '../atoms/SocialButton';

export const SocialLoginGroup = () => (
  <View style={styles.container}>
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.dividerText}>o continúa con</Text>
      <View style={styles.line} />
    </View>
    <View style={styles.buttonsContainer}>
      <SocialButton title="Google" onPress={() => {}} />
      <SocialButton title="Apple" onPress={() => {}} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: '#212B36' },
  dividerText: { color: '#637381', marginHorizontal: 12, fontSize: 12 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
});