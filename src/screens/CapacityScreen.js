import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeroRecommendationCard } from '../components/organisms/HeroRecommendationCard';
import { ScheduleCard } from '../components/molecules/ScheduleCard';

export const CapacityScreen = ({ navigation }) => {
  const [currentDayName, setCurrentDayName] = useState('Lunes');
  const [isWeekend, setIsWeekend] = useState(false);

  const capacityDataByDay = {
    Lunes: [
      {
        time: '06:00 AM - 08:00 AM',
        count: '11/50',
        status: 'optimal',
        percentage: 22,
        isBestChoice: true,
        coach: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/100?img=33' },
        bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
      },
      {
        time: '08:00 AM - 11:00 AM',
        count: '26/50',
        status: 'medium',
        percentage: 52,
        isBestChoice: false,
        coach: { name: 'Sofi Martínez', avatar: 'https://i.pravatar.cc/100?img=47' },
        bgImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600',
      },
      {
        time: '05:00 PM - 08:00 PM',
        count: '47/50',
        status: 'high',
        percentage: 94,
        isBestChoice: false,
        coach: { name: 'Carlos Vega', avatar: 'https://i.pravatar.cc/100?img=12' },
        bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
      },
      {
        time: '08:00 PM - 10:00 PM',
        count: '14/50',
        status: 'optimal',
        percentage: 28,
        isBestChoice: false,
        coach: { name: 'David L.', avatar: 'https://i.pravatar.cc/100?img=60' },
        bgImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600',
      },
    ],
    Martes: [
      {
        time: '06:00 AM - 08:00 AM',
        count: '10/50',
        status: 'optimal',
        percentage: 20,
        isBestChoice: true,
        coach: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/100?img=33' },
        bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
      },
      {
        time: '08:00 AM - 11:00 AM',
        count: '24/50',
        status: 'medium',
        percentage: 48,
        isBestChoice: false,
        coach: { name: 'Sofi Martínez', avatar: 'https://i.pravatar.cc/100?img=47' },
        bgImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600',
      },
      {
        time: '05:00 PM - 08:00 PM',
        count: '43/50',
        status: 'high',
        percentage: 86,
        isBestChoice: false,
        coach: { name: 'Carlos Vega', avatar: 'https://i.pravatar.cc/100?img=12' },
        bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
      },
      {
        time: '08:00 PM - 10:00 PM',
        count: '12/50',
        status: 'optimal',
        percentage: 24,
        isBestChoice: false,
        coach: { name: 'David L.', avatar: 'https://i.pravatar.cc/100?img=60' },
        bgImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600',
      },
    ],
    Miércoles: [
      {
        time: '06:00 AM - 08:00 AM',
        count: '13/50',
        status: 'optimal',
        percentage: 26,
        isBestChoice: false,
        coach: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/100?img=33' },
        bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
      },
      {
        time: '08:00 AM - 11:00 AM',
        count: '27/50',
        status: 'medium',
        percentage: 54,
        isBestChoice: false,
        coach: { name: 'Sofi Martínez', avatar: 'https://i.pravatar.cc/100?img=47' },
        bgImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600',
      },
      {
        time: '05:00 PM - 08:00 PM',
        count: '48/50',
        status: 'high',
        percentage: 96,
        isBestChoice: false,
        coach: { name: 'Carlos Vega', avatar: 'https://i.pravatar.cc/100?img=12' },
        bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
      },
      {
        time: '08:00 PM - 10:00 PM',
        count: '15/50',
        status: 'optimal',
        percentage: 30,
        isBestChoice: true,
        coach: { name: 'David L.', avatar: 'https://i.pravatar.cc/100?img=60' },
        bgImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600',
      },
    ],
    Jueves: [
      {
        time: '06:00 AM - 08:00 AM',
        count: '9/50',
        status: 'optimal',
        percentage: 18,
        isBestChoice: true,
        coach: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/100?img=33' },
        bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
      },
      {
        time: '08:00 AM - 11:00 AM',
        count: '19/50',
        status: 'optimal',
        percentage: 38,
        isBestChoice: false,
        coach: { name: 'Sofi Martínez', avatar: 'https://i.pravatar.cc/100?img=47' },
        bgImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600',
      },
      {
        time: '05:00 PM - 08:00 PM',
        count: '33/50',
        status: 'medium',
        percentage: 66,
        isBestChoice: false,
        coach: { name: 'Carlos Vega', avatar: 'https://i.pravatar.cc/100?img=12' },
        bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
      },
      {
        time: '08:00 PM - 10:00 PM',
        count: '10/50',
        status: 'optimal',
        percentage: 20,
        isBestChoice: false,
        coach: { name: 'David L.', avatar: 'https://i.pravatar.cc/100?img=60' },
        bgImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600',
      },
    ],
    Viernes: [
      {
        time: '06:00 AM - 08:00 AM',
        count: '8/50',
        status: 'optimal',
        percentage: 16,
        isBestChoice: false,
        coach: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/100?img=33' },
        bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
      },
      {
        time: '08:00 AM - 11:00 AM',
        count: '14/50',
        status: 'optimal',
        percentage: 28,
        isBestChoice: false,
        coach: { name: 'Sofi Martínez', avatar: 'https://i.pravatar.cc/100?img=47' },
        bgImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600',
      },
      {
        time: '05:00 PM - 08:00 PM',
        count: '28/50',
        status: 'medium',
        percentage: 56,
        isBestChoice: false,
        coach: { name: 'Carlos Vega', avatar: 'https://i.pravatar.cc/100?img=12' },
        bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
      },
      {
        time: '08:00 PM - 10:00 PM',
        count: '6/50',
        status: 'optimal',
        percentage: 12,
        isBestChoice: true,
        coach: { name: 'David L.', avatar: 'https://i.pravatar.cc/100?img=60' },
        bgImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600',
      },
    ],
  };

  useEffect(() => {
    const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayIndex = new Date().getDay();
    const todayName = daysMap[todayIndex];

    if (todayName === 'Sábado' || todayName === 'Domingo') {
      setIsWeekend(true);
      setCurrentDayName(todayName);
    } else {
      setIsWeekend(false);
      setCurrentDayName(todayName);
    }
  }, []);

  const bestSlotObj = capacityDataByDay[currentDayName]?.find((item) => item.isBestChoice);
  const bestSlotTime = bestSlotObj?.time || '06:00 AM - 08:00 AM';
  const bestSlotCoach = bestSlotObj?.coach?.name || 'Alex Rivera';

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inteligencia de Aforo</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {isWeekend ? (
          <View style={styles.weekendCard}>
            <Ionicons name="cafe-outline" size={36} color="#00FF66" />
            <Text style={styles.weekendTitle}>¡Fin de semana de descanso!</Text>
            <Text style={styles.weekendText}>
              El análisis de aforo por huella opera de Lunes a Viernes. Disfruta tu fin de semana.
            </Text>
          </View>
        ) : (
          <>
            <HeroRecommendationCard
              dayName={currentDayName}
              bestTime={bestSlotTime}
              bestCoach={bestSlotCoach}
            />

            <Text style={styles.sectionTitle}>BLOQUES HORARIOS PARA HOY ({currentDayName.toUpperCase()})</Text>

            {capacityDataByDay[currentDayName]?.map((item, idx) => (
              <ScheduleCard
                key={idx}
                time={item.time}
                count={item.count}
                status={item.status}
                percentage={item.percentage}
                isBestChoice={item.isBestChoice}
                coach={item.coach}
                bgImage={item.bgImage}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05070B' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  header: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#070A0F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#161F2E',
  },
  btnBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0B0F17',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#161F2E',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  sectionTitle: { color: '#8E8E93', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 12 },
  weekendCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F2E',
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  weekendTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginTop: 12 },
  weekendText: { color: '#8E8E93', fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 18 },
});