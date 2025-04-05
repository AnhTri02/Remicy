import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TravelPlanProvider, TravelPlanContext } from './TravelPlanContext';
import GetStarted from './components/GetStarted';
import CurrencyConverter from './components/CurrencyConverter';

const Drawer = createDrawerNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  const { travelPlan } = useContext(TravelPlanContext);
  const { country, money, days } = travelPlan;

  // For demonstration, let's say the user is currently on Day 3 of Y.
  // In a real app, you might store or compute this differently.
  const [currentDay, setCurrentDay] = useState(1);

  // Compute daily budget
  const totalMoney = parseFloat(money) || 0;
  const totalDays = parseInt(days, 10) || 1;
  const dailyBudget = totalMoney && totalDays ? (totalMoney / totalDays).toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      {/* Top Row: Country label and "New" button */}
      <View style={styles.topRow}>
        <Text style={styles.countryText}>Country: {country || 'N/A'}</Text>
        <TouchableOpacity 
          style={styles.newButton} 
          onPress={() => navigation.navigate('Get Started')}
        >
          <Text style={styles.newButtonText}>New</Text>
        </TouchableOpacity>
      </View>

      {/* Current Day Indicator */}
      <Text style={styles.dayText}>
        Day {currentDay}/{days || 1}
      </Text>

      {/* Balance Container */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>${money || '0.00'}</Text>
      </View>

      {/* Daily Budget */}
      <Text style={styles.dailyBudgetLabel}>
        Daily Budget: ${dailyBudget}
      </Text>

      {/* Main Content Area: Left side (Day boxes) + Right side (History) */}
      <View style={styles.mainContent}>
        {/* Left side: Day Boxes */}
        <View style={styles.leftSide}>
          {/* Example: Generate boxes for each day */}
          {Array.from({ length: totalDays }, (_, index) => (
            <View style={styles.dayBox} key={index}>
              <Text style={styles.dayBoxText}>Day {index + 1}</Text>
              {/* In a real app, you might track spending per day here */}
            </View>
          ))}
        </View>

        {/* Right side: History */}
        <View style={styles.rightSide}>
          <Text style={styles.historyTitle}>History</Text>
          <ScrollView style={styles.historyScroll}>
            {/* Example items; replace with real data */}
            <Text style={styles.historyItem}>Day 1: Spent $30</Text>
            <Text style={styles.historyItem}>Day 2: Spent $20</Text>
            <Text style={styles.historyItem}>Day 3: Spent $15</Text>
            {/* ... */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <TravelPlanProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
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
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Get Started" component={GetStarted} />
          <Drawer.Screen name="Converter" component={CurrencyConverter} />
        </Drawer.Navigator>
      </NavigationContainer>
    </TravelPlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ebe5', // from your request
    padding: 20,
    paddingTop: 40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newButton: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  newButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dayText: {
    fontSize: 16,
    marginVertical: 10,
  },
  balanceContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  dailyBudgetLabel: {
    fontSize: 16,
    marginVertical: 10,
    fontStyle: 'italic',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row', // left side (days) and right side (history) side by side
    marginTop: 10,
  },
  leftSide: {
    flex: 1,
    marginRight: 10,
  },
  dayBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  dayBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightSide: {
    width: 120, // or adjust to your liking
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyScroll: {
    maxHeight: 200,
  },
  historyItem: {
    marginBottom: 5,
  },
});
