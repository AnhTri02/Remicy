import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CurrencyConverter from './app/CurrencyConverter';
import GetStarted from './app/GetStarted';
import Home from './app/Home';
import NearestATMs from './app/NearestATMs';
import { TravelPlanProvider } from './app/TravelPlanContext'; // ✅ viktig för context

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TravelPlanProvider> {/* ✅ Wrappa hela appen */}
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
          <Tab.Screen name="ATMs Nearby" component={NearestATMs} />
        </Tab.Navigator>
      </NavigationContainer>
    </TravelPlanProvider>
  );
}
