import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebDashboardScreen } from '../screens/web/WebDashboardScreen';
import { DevicesScreen } from '../screens/web/DevicesScreen';
import { DataVisualizationScreen } from '../screens/web/DataVisualizationScreen';
import { NotificationsWebScreen } from '../screens/web/NotificationsWebScreen';
import { EventsHistoryScreen } from '../screens/web/EventsHistoryScreen';
import { RealTimeQueryScreen } from '../screens/web/RealTimeQueryScreen';

const Stack = createNativeStackNavigator();

export const WebNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WebDashboard"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#f8fafc',
          },
        }}
      >
        <Stack.Screen name="WebDashboard" component={WebDashboardScreen} />
        <Stack.Screen name="Devices" component={DevicesScreen} />
        <Stack.Screen name="DataVisualization" component={DataVisualizationScreen} />
        <Stack.Screen name="NotificationsWeb" component={NotificationsWebScreen} />
        <Stack.Screen name="EventsHistory" component={EventsHistoryScreen} />
        <Stack.Screen name="RealTimeQuery" component={RealTimeQueryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WebNavigator;