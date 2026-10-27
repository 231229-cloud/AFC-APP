// src/services/notificationService.js
import { Platform } from 'react-native';

let Notifications = null;

// Solo cargar la librería nativa si NO es navegador Web
if (Platform.OS !== 'web') {
  try {
    Notifications = require('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch (error) {
    console.log('Error al cargar expo-notifications:', error);
  }
}

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'web' || !Notifications) {
    return null;
  }

  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#00FF66',
    });
  }

  return token;
};

export const triggerLocalPushNotification = async (title, body) => {
  if (Platform.OS === 'web' || !Notifications) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
};