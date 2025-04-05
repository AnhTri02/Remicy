import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CurrencyConverter from './components/CurrencyConverter';
import GetStarted from './components/GetStarted';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#1a1119' }}>
      <Text style={{color:'white'}}>Welcome Home!</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Get Started" component={GetStarted} />
        <Drawer.Screen name="Converter" component={CurrencyConverter} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
