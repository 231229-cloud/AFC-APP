import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../components/organisms/Header';
import { RoutineBanner } from '../components/molecules/RoutineBanner';
import { QuickAccessRow } from '../components/molecules/QuickAccessRow';
import { MembershipCardCarousel } from '../components/molecules/MembershipCardCarousel';
import { ShopBanner } from '../components/molecules/ShopBanner';
import { ProgressBar } from '../components/atoms/ProgressBar';
import { PaymentModal } from '../components/organisms/PaymentModal';
import { ScheduleModal } from '../components/organisms/ScheduleModal';
import { AnnouncementModal } from '../components/organisms/AnnouncementModal';
import {
  registerForPushNotificationsAsync,
  triggerLocalPushNotification,
} from '../services/notificationService';

const { width } = Dimensions.get('window');
const isWebDesktop = Platform.OS === 'web' && width > 768;

export const MemberHomeScreen = ({ navigation }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState('07:00 AM - 08:00 AM');
  const [membershipStatus, setMembershipStatus] = useState('Activa');
  const [dueDate, setDueDate] = useState('20/Nov/2026');

  const [currentAnnouncement] = useState({
    type: 'alert',
    title: '⚠️ Suspensión de Clases - Festivo',
    message:
      'Estimado socio, las clases grupales vespertinas de 6 PM a 9 PM quedan suspendidas por mantenimiento. El área de pesas permanecerá abierta.',
  });

  const [attendanceHistory, setAttendanceHistory] = useState([
    '2026-10-26',
    '2026-10-23',
    '2026-10-22',
    '2026-10-21',
    '2026-10-20',
  ]);

  const [streakDays, setStreakDays] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    calculateAttendanceStreak(attendanceHistory);

    if (Platform.OS !== 'web') {
      registerForPushNotificationsAsync();
    }

    if (currentAnnouncement) {
      setShowAnnouncementModal(true);
    }
  }, [attendanceHistory]);

  const calculateAttendanceStreak = (history) => {
    let currentStreak = 0;
    let daysChecked = 0;
    const today = new Date();

    while (daysChecked < 365) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - daysChecked);

      const dayOfWeek = checkDate.getDay();
      const dateString = checkDate.toISOString().split('T')[0];

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        daysChecked++;
        continue;
      }

      if (history.includes(dateString)) {
        currentStreak += 1;
        daysChecked++;
      } else {
        break;
      }
    }

    setStreakDays(currentStreak);
    setDiscountPercent(currentStreak >= 150 ? 20 : currentStreak >= 80 ? 10 : 0);
  };

  const handleConfirmPayment = () => {
    setMembershipStatus('Activa');
    setDueDate('20/Dic/2026');
    setShowPaymentModal(false);

    if (Platform.OS !== 'web') {
      triggerLocalPushNotification(
        '¡Renovación Exitosa! 🎉',
        'Tu membresía AFC Gym ha sido activada correctamente.'
      );
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.appContainer}>
        {/* ENCABEZADO */}
        <Header name="Rodrigo" onOpenPayment={() => setShowPaymentModal(true)} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* BANNER RUTINA */}
          <RoutineBanner onPress={() => navigation?.navigate('MemberRoutines')} />

          {/* ACCESOS RÁPIDOS */}
          <QuickAccessRow
            onNavigate={(screen) => navigation?.navigate(screen)}
            onOpenPayment={() => setShowPaymentModal(true)}
            onOpenSchedule={() => setShowScheduleModal(true)}
          />

          {/* SECCIÓN PROGRESO */}
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up-outline" size={16} color="#00FF66" />
            <Text style={styles.sectionTitle}>Tu progreso</Text>
          </View>

          <View style={styles.gridRow}>
            {/* ASISTENCIAS */}
            <View style={styles.attendanceCard}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=400' }}
                style={styles.cardBg}
                imageStyle={{ opacity: 0.35, borderRadius: 14 }}
              >
                <View style={styles.attendanceContent}>
                  <Text style={styles.cardLabel}>Asistencias este mes</Text>
                  <Text style={styles.cardVal}>{attendanceHistory.length} Días</Text>
                  <ProgressBar progress={80} />
                </View>
              </ImageBackground>
            </View>

            {/* MEMBRESÍA EN CARRUSEL */}
            <MembershipCardCarousel
              status={membershipStatus}
              dueDate={dueDate}
              discountPercent={discountPercent}
              onPress={() => setShowPaymentModal(true)}
            />
          </View>

          {/* TIENDA */}
          <ShopBanner onPress={() => Alert.alert('Tienda AFC', 'Módulo de tienda en desarrollo.')} />
        </ScrollView>

        {/* MODALES DEL SISTEMA */}
        <PaymentModal
          visible={showPaymentModal}
          discountPercent={discountPercent}
          onClose={() => setShowPaymentModal(false)}
          onConfirmPayment={handleConfirmPayment}
        />

        <ScheduleModal
          visible={showScheduleModal}
          currentSchedule={selectedSchedule}
          onClose={() => setShowScheduleModal(false)}
          onSelectSchedule={(schedule) => setSelectedSchedule(schedule)}
        />

        <AnnouncementModal
          visible={showAnnouncementModal}
          announcement={currentAnnouncement}
          onClose={() => setShowAnnouncementModal(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#05070B',
    alignItems: 'center',
    width: '100%',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: isWebDesktop ? 920 : '100%',
    backgroundColor: '#05070B',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  attendanceCard: {
    flex: 1,
    height: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#161F2E',
    backgroundColor: '#0B0F17',
    overflow: 'hidden',
  },
  cardBg: {
    flex: 1,
  },
  attendanceContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  cardLabel: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '600',
  },
  cardVal: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 4,
  },
});

export default MemberHomeScreen;