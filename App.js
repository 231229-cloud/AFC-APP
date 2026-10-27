import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas de Administración
import { LoginScreen } from './src/screens/LoginScreen';
import { AdminDashboardScreen } from './src/screens/AdminDashboardScreen';
import { AdminScheduleScreen } from './src/screens/AdminScheduleScreen';
import { AdminAnnouncementsScreen } from './src/screens/AdminAnnouncementsScreen';
import { MembersScreen } from './src/screens/MembersScreen';
import { POSTiendaScreen } from './src/screens/POSTiendaScreen';
import { VentasScreen } from './src/screens/VentasScreen';
import { CajaCorteScreen } from './src/screens/CajaCorteScreen';
import { RoutinesScreen } from './src/screens/RoutinesScreen';

// Pantallas del Cliente / Socio
import { MemberHomeScreen } from './src/screens/MemberHomeScreen';
import { MemberRoutinesScreen } from './src/screens/MemberRoutinesScreen';
import { CapacityScreen } from './src/screens/CapacityScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminSchedule" component={AdminScheduleScreen} />
        <Stack.Screen name="AdminAnnouncements" component={AdminAnnouncementsScreen} />
        <Stack.Screen name="Members" component={MembersScreen} />
        <Stack.Screen name="Tienda" component={POSTiendaScreen} />
        <Stack.Screen name="Ventas" component={VentasScreen} />
        <Stack.Screen name="CorteCaja" component={CajaCorteScreen} />
        <Stack.Screen name="Caja" component={CajaCorteScreen} />
        <Stack.Screen name="Routines" component={RoutinesScreen} />
        <Stack.Screen name="Rutinas" component={RoutinesScreen} />
        <Stack.Screen name="MemberHome" component={MemberHomeScreen} />
        <Stack.Screen name="MemberRoutines" component={MemberRoutinesScreen} />
        <Stack.Screen name="Capacity" component={CapacityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}