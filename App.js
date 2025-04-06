// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TravelPlanProvider } from './TravelPlanContext';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import CurrencyConverter from './components/CurrencyConverter';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <TravelPlanProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home" //sidan startar i Home
          screenOptions={{
            sceneContainerStyle: { backgroundColor: '#e4ebe5' },
            drawerStyle: { backgroundColor: '#333' },
            headerStyle: { backgroundColor: '#333' },
            headerTintColor: 'white',
            drawerActiveTintColor: 'white',
            drawerInactiveTintColor: 'white',
            drawerLabelStyle: { color: 'white' },
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Get Started" component={GetStarted} />
          <Drawer.Screen name="Converter" component={CurrencyConverter} />
        </Drawer.Navigator>
      </NavigationContainer>
    </TravelPlanProvider>
  );
}
