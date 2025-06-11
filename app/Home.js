import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TravelPlanContext } from './TravelPlanContext';

export default function Home() {
  const navigation = useNavigation();
  const { travelPlan } = useContext(TravelPlanContext);
  const { country, money, days } = travelPlan;

  const totalPlannedDays = parseInt(days, 10) || 1;
  const [currentDay, setCurrentDay] = useState(1);

  const totalBalance = parseFloat(money) || 0;
  const dailyBudget = totalBalance && totalPlannedDays
    ? (totalBalance / totalPlannedDays).toFixed(2)
    : '0.00';

  const handleNewDay = () => {
    if (currentDay < totalPlannedDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>${money || '0.00'}</Text>
        <Text style={styles.dailyBudgetLabel}>Daily Budget: ${dailyBudget}</Text>
      </View>

      <View style={styles.topRow}>
        <Text style={styles.countryText}>Country: {country || 'N/A'}</Text>
        {currentDay < totalPlannedDays && (
          <TouchableOpacity style={styles.newButton} onPress={handleNewDay}>
            <Text style={styles.newButtonText}>New Day</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.dayText}>
        Day {currentDay}/{totalPlannedDays}
      </Text>

      <View style={styles.mainContent}>
        <ScrollView style={styles.leftSide} contentContainerStyle={styles.leftSideScroll}>
          {Array.from({ length: currentDay }, (_, index) => (
            <LinearGradient
              key={index}
              colors={['#2c2c54', '#434371', '#1b1b3a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dayBox}
            >
              <Text style={styles.dayBoxText}>Day {index + 1}</Text>
            </LinearGradient>
          ))}
        </ScrollView>

        <LinearGradient
          colors={['#3b1f3e', '#5b2a60', '#241629']}
          start={{ x: 0, y: 0.24 }}
          end={{ x: 0, y: -0.13 }}
          style={styles.rightSide}
        >
          <Text style={styles.historyTitle}>History</Text>
          <ScrollView style={styles.historyScroll}>
            {Array.from({ length: 12 }, (_, i) => (
              <Text key={i} style={styles.historyItem}>
                Day {i + 1}: Spent ${Math.floor(Math.random() * 40 + 10)}
              </Text>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edcda6', //ändra bakgrund på hem
    padding: 20,
    paddingTop: 40,
  },
  balanceContainer: {
    backgroundColor: '#68181f',
    padding: 25,
    borderRadius: 20,
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'center',
  },
  balanceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'white',
  },
  dailyBudgetLabel: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
    color: 'white',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  countryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  newButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  newButtonText: {
    color: '#3e1e68',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#000',
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
  leftSideScroll: {
    paddingBottom: 20,
  },
  dayBox: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  dayBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  rightSide: {
    width: '30%',
    borderRadius: 5,
    padding: 10,
    height: 250,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  historyScroll: {
    flexGrow: 1,
  },
  historyItem: {
    marginBottom: 5,
    color: 'white',
  },
  footer: {
    backgroundColor: '#3D0A05',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  footerText: {
    color: '#efdbbf',
    fontSize: 14,
  },
});
