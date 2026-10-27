import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

export const AuthTemplate = ({ header, form, social, footerText }) => {
  const { width } = useWindowDimensions();

  // Si estás en computadora/web, toma el 80% de la pantalla o hasta 900px.
  // En celular tomará el 95% del ancho.
  const cardWidth = width > 768 ? Math.min(width * 0.8, 900) : '95%';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.rectangularCard, { width: cardWidth }]}>
          {header}
          <View style={styles.content}>{form}</View>
          {social}
          {footerText && <Text style={styles.footer}>{footerText}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#05070B',
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  rectangularCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 36,
    borderWidth: 1,
    borderColor: '#161F2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    elevation: 12,
  },
  content: { 
    width: '100%' 
  },
  footer: { 
    color: '#637381', 
    textAlign: 'center', 
    marginTop: 24, 
    fontSize: 13,
    fontWeight: '500'
  },
});