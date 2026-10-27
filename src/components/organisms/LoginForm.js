import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomInput } from '../atoms/CustomInput';
import { CustomButton } from '../atoms/CustomButton';

export const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Redirige directamente al Dashboard de Administrador
    if (navigation) {
      navigation.navigate('AdminDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Correo o usuario"
        iconName="person-outline"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Contraseña"
        iconName="lock-closed-outline"
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? 'eye-outline' : 'eye-off-outline'}
        onRightIconPress={() => setShowPassword(!showPassword)}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <CustomButton
        title="Entrar"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 4 },
  forgotContainer: { alignSelf: 'flex-end', marginVertical: 6 },
  forgotText: { color: '#00FF66', fontSize: 12, fontWeight: '500' },
});