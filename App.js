import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TravelPlanProvider } from './TravelPlanContext';

import Home from './components/Home';
import GetStarted from './components/GetStarted';
import CurrencyConverter from './components/CurrencyConverter';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TravelPlanProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#aaa',
            tabBarStyle: {
              backgroundColor: '#1a1a2e',
              borderTopWidth: 0,
            },
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Get Started" component={GetStarted} />
          <Tab.Screen name="Converter" component={CurrencyConverter} />
        </Tab.Navigator>
      </NavigationContainer>
    </TravelPlanProvider>
  );
}
