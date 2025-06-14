import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TravelPlanContext } from './TravelPlanContext';

const emoji1 = require('./assets/emoji.png');
const emoji2 = require('./assets/emoji2.png');
const emoji3 = require('./assets/emoji3.png');
const emoji4 = require('./assets/emoji4.png');

export default function Home() {
  const navigation = useNavigation();
  const { travelPlan } = useContext(TravelPlanContext);
  const { country, money, days } = travelPlan || {};

  const totalPlannedDays = parseInt(days, 10) || 1;
  const [currentDay, setCurrentDay] = useState(1);

  const totalBalance = parseFloat(money) || 0;
  const originalDailyBudget = totalPlannedDays ? totalBalance / totalPlannedDays : 0;
  const dailyBudget = originalDailyBudget.toFixed(2);

  const handleNewDay = () => {
    if (currentDay < totalPlannedDays) {
      setCurrentDay(currentDay + 1);
    }
  };

    // Determine emoji image path
  let emojiSource;
  if (originalDailyBudget === 0) {
    emojiSource = require('./assets/emoji4.png');
  } else {
    const ratio = dailyBudget / originalDailyBudget;
    if (ratio <= 0) {
      emojiSource = require('./assets/emoji4.png');
    } else if (ratio <= 0.25) {
      emojiSource = require('./assets/emoji3.png');
    } else if (ratio <= 0.5) {
      emojiSource = require('./assets/emoji2.png');
    } else if (ratio <= 0.75) {
      emojiSource = require('./assets/emoji.png');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>${money || '0.00'}</Text>
        <Text style={styles.dailyBudgetLabel}>Daily Budget: ${dailyBudget}</Text>

        <View style={styles.emojiGrid}>
          <Image source={emoji1} style={styles.emojiLarge} />
          <Image source={emoji2} style={styles.emojiLarge} />
          <Image source={emoji3} style={styles.emojiLarge} />
          <Image source={emoji4} style={styles.emojiLarge} />
        </View>
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
              colors={['#3D0A05', '#68181f', '#3D0A05']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dayBox}
            >
              <Text style={styles.dayBoxText}>Day {index + 1}</Text>
            </LinearGradient>
          ))}
        </ScrollView>

        <LinearGradient
          colors={['#68181f', '#68181f', '#68181f']}
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
    backgroundColor: '#fff',
  },
  balanceContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  dailyBudgetLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  emojiLarge: {
    width: 189,
    height: 189,
    margin: 6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  countryText: {
    fontSize: 18,
    fontWeight: '600',
  },
  newButton: {
    backgroundColor: '#68181f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dayText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSide: {
    flex: 1,
    padding: 10,
  },
  leftSideScroll: {
    alignItems: 'center',
  },
  dayBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBoxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rightSide: {
    width: 140,
    padding: 12,
  },
  historyTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  historyScroll: {
    maxHeight: 280,
  },
  historyItem: {
    color: 'white',
    marginBottom: 6,
  },
});
