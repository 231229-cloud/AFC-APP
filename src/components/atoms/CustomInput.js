import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomInput = ({ placeholder, secureTextEntry, value, onChangeText, iconName, rightIcon, onRightIconPress }) => (
  <View style={styles.container}>
    {iconName && <Ionicons name={iconName} size={22} color="#8E8E93" style={styles.leftIcon} />}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#637381"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
    {rightIcon && (
      <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconBtn}>
        <Ionicons name={rightIcon} size={22} color="#8E8E93" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: '#111822',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  leftIcon: { marginRight: 12 },
  rightIconBtn: { padding: 4 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 15 },
});