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
import DailySpend from './components/DailySpend';

const Drawer = createDrawerNavigator();

// HomeScreen defined inside App.js
function HomeScreen({ navigation }) {
  const { travelPlan } = useContext(TravelPlanContext);
  const { country, money, days, spending } = travelPlan;

  // Keep track of the current day added (initially, 1 day is always present)
  const [currentDay, setCurrentDay] = useState(1);

  // Compute daily budget (if total days from GetStarted is provided)
  const totalMoney = parseFloat(money) || 0;
  const totalPlannedDays = parseInt(days, 10) || 1;
  const dailyBudget = totalMoney && totalPlannedDays ? (totalMoney / totalPlannedDays).toFixed(2) : '0.00';

  // Function to add a new day (increment the current day)
  const addDay = () => {
    if (currentDay < totalPlannedDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Row: Country label and "Get New Plan" button */}
      <View style={styles.topRow}>
        <Text style={styles.countryText}>Destination: {country || 'N/A'}</Text>
        <TouchableOpacity 
          style={styles.planButton} 
          onPress={() => navigation.navigate('Get Started')}
        >
          <Text style={styles.planButtonText}>Edit Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Day & Budget Info */}
      <Text style={styles.dayText}>
        Current Day: {currentDay}/{totalPlannedDays}
      </Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Budget</Text>
        <Text style={styles.balanceValue}>${money || '0.00'}</Text>
      </View>
      <Text style={styles.dailyBudgetLabel}>
        Daily Budget: ${dailyBudget}
      </Text>

      {/* Button to add a new day (if applicable) */}
      {currentDay < totalPlannedDays && (
        <TouchableOpacity style={styles.addDayButton} onPress={addDay}>
          <Text style={styles.addDayButtonText}>Add Day</Text>
        </TouchableOpacity>
      )}

      {/* Day Boxes: Each day box is pressable to open DailySpend */}
      <ScrollView contentContainerStyle={styles.daysContainer}>
        {Array.from({ length: currentDay }, (_, index) => {
          const dayNumber = index + 1;
          return (
            <TouchableOpacity
              key={dayNumber}
              style={styles.dayBox}
              onPress={() => navigation.navigate('DailySpend', { day: dayNumber })}
            >
              <Text style={styles.dayBoxText}>Day {dayNumber}</Text>
              <Text style={styles.spendingText}>
                Spent: ${spending[dayNumber] || '0.00'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
          <Drawer.Screen
            name="DailySpend"
            component={DailySpend}
            options={{ drawerItemStyle: { height: 0 } }} // Hides this screen from the drawer menu
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </TravelPlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ebe5',
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
    color: 'black',
  },
  planButton: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  planButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dayText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
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
    color: 'black',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  dailyBudgetLabel: {
    fontSize: 16,
    marginVertical: 10,
    fontStyle: 'italic',
    color: 'black',
  },
  addDayButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  addDayButtonText: {
    color: 'white',
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayBox: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  dayBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  spendingText: {
    fontSize: 14,
    marginTop: 5,
    color: 'black',
  },
});
