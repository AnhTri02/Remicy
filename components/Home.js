// components/Home.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TravelPlanContext } from '../TravelPlanContext';

export default function Home() {
  const navigation = useNavigation();
  const { travelPlan } = useContext(TravelPlanContext);
  const { country, money, days } = travelPlan;

  const totalPlannedDays = parseInt(days, 10) || 1;
  const [currentDay, setCurrentDay] = useState(1);

  const totalBalance = parseFloat(money) || 0;
  const dailyBudget = totalBalance && totalPlannedDays ? (totalBalance / totalPlannedDays).toFixed(2) : '0.00';

  const handleNewDay = () => {
    if (currentDay < totalPlannedDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Row: Country label and "New Day" button */}
      <View style={styles.topRow}>
        <Text style={styles.countryText}>Country: {country || 'N/A'}</Text>
        {currentDay < totalPlannedDays && (
          <TouchableOpacity style={styles.newButton} onPress={handleNewDay}>
            <Text style={styles.newButtonText}>New Day</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Current Day Indicator */}
      <Text style={styles.dayText}>
        Day {currentDay}/{totalPlannedDays}
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

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Left side: Day Boxes */}
        <View style={styles.leftSide}>
          {Array.from({ length: currentDay }, (_, index) => (
            <View style={styles.dayBox} key={index}>
              <Text style={styles.dayBoxText}>Day {index + 1}</Text>
              {/* Placeholder for spending input or display */}
            </View>
          ))}
        </View>

        {/* Right side: History (example) */}
        <View style={styles.rightSide}>
          <Text style={styles.historyTitle}>History</Text>
          <ScrollView style={styles.historyScroll}>
            <Text style={styles.historyItem}>Day 1: Spent $30</Text>
            <Text style={styles.historyItem}>Day 2: Spent $20</Text>
            <Text style={styles.historyItem}>Day 3: Spent $15</Text>
          </ScrollView>
        </View>
      </View>
    </View>
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
    fontWeight: 'bold',
  },
  balanceContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
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
    flexDirection: 'row',
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
    width: 120,
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
