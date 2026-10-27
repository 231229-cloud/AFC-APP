import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';

export const Logo = () => {
  const { width } = useWindowDimensions();

  // Detecta si estamos en una pantalla grande
  const isDesktop = Platform.OS === 'web' && width >= 768;

  return (
    <View style={styles.container}>

      <Image
        source={require('../../../assets/AFC.jpg')}
        style={[
          styles.bgImage,
          isDesktop && styles.bgImageDesktop,
        ]}
        resizeMode="cover"
        resizeMethod={Platform.OS === 'android' ? 'resize' : 'scale'}
        fadeDuration={0}
      />

      {/* Franja inferior */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.subtitle}>
          DISCIPLINA • CONSTANCIA • RESULTADOS
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    width: '100%',
    aspectRatio: 2.3,

    minHeight: 150,
    maxHeight: 280,

    marginBottom: 20,

    backgroundColor: '#05070B',

    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',

    overflow: 'hidden',

    position: 'relative',

    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  /*
   * Imagen principal
   * En celular ocupa exactamente la tarjeta,
   * evitando zoom adicional.
   */
  bgImage: {
    position: 'absolute',

    width: '100%',
    height: '100%',

    left: 0,
    top: 0,

    opacity: 1,
  },

  /*
   * Ajuste exclusivo para computadora.
   * Conserva el encuadre que ya funcionaba bien
   * en tu laptop.
   */
  bgImageDesktop: {
    width: '100%',
    height: '140%',
    top: -15,
  },

  /*
   * Franja negra inferior
   */
  bottomOverlay: {
    width: '100%',

    paddingVertical: 10,
    paddingHorizontal: 12,

    backgroundColor: 'rgba(5, 7, 11, 0.75)',

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 2,
  },

  subtitle: {
    color: '#FFFFFF',

    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 1.5,

    textAlign: 'center',
  },

});