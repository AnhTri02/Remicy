import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TravelPlanContext } from './TravelPlanContext';

const emoji1 = require('../assets/emoji.png');
const emoji3 = require('../assets/emoji3.png');
const emoji4 = require('../assets/emoji4.png');

export default function Home() {
  const navigation = useNavigation();
  const { travelPlan } = useContext(TravelPlanContext);
  const { country, money, days } = travelPlan || {};

  const totalPlannedDays = parseInt(days, 10) || 1;
  const originalMoney = parseFloat(money) || 0;

  // totalBalance är dynamisk, originalMoney konstant
  const [totalBalance, setTotalBalance] = useState(originalMoney);

  // Uppdatera totalBalance varje gång money ändras i kontexten
  useEffect(() => {
    const newMoney = parseFloat(money) || 0;
    setTotalBalance(newMoney);
  }, [money]);

  // dailyBudget konstant
  const dailyBudget = totalPlannedDays ? originalMoney / totalPlannedDays : 0;

  const [currentDay, setCurrentDay] = useState(1);
  const [expensesByDay, setExpensesByDay] = useState({});
  const [expenseInput, setExpenseInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Summan av utgifter för currentDay
  const expensesForCurrentDay = expensesByDay[currentDay] || [];
  const totalSpentCurrentDay = expensesForCurrentDay.reduce((acc, val) => acc + val, 0);

  // Remaining budget för current day: dailyBudget - utgifter denna dag
  const remainingBudget = dailyBudget - totalSpentCurrentDay;

  // Emoji baserat på kvarvarande budget-ratio
  const ratio = remainingBudget / dailyBudget;
  let emojiSource = emoji1;

  if (dailyBudget === 0.25 || ratio <= 0.25) {
    emojiSource = emoji4;
  } else if (ratio <= 0.75) {
    emojiSource = emoji3;
  } else if (ratio <= 0.5) {
    emojiSource = emoji1;
  } else {
    emojiSource = emoji1;
  }

  const handleAddExpense = () => {
    const expense = parseFloat(expenseInput);

    if (isNaN(expense) || expense <= 0) {
      Alert.alert('Fel', 'Ange ett giltigt belopp större än 0');
      return;
    }

    if (expense > remainingBudget) {
      Alert.alert('Fel', 'Du har inte tillräckligt med budget kvar för denna utgift');
      return;
    }

    setExpensesByDay((prev) => {
      const prevExpenses = prev[currentDay] || [];
      return { ...prev, [currentDay]: [...prevExpenses, expense] };
    });

    // Subtrahera från totalBalance
    setTotalBalance((prevBalance) => prevBalance - expense);

    setExpenseInput('');
  };

  const handleNewDay = () => {
    if (currentDay < totalPlannedDays) {
      setCurrentDay(currentDay + 1);
      setExpenseInput('');
    }
  };

  const openDayModal = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDay(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>${totalBalance.toFixed(2)}</Text>

        <Text style={styles.dailyBudgetLabel}>
          Daily Budget: ${dailyBudget.toFixed(2)}
        </Text>
        <Text style={styles.dailyBudgetLabel}>
          Remaining Budget: ${remainingBudget.toFixed(2)}
        </Text>

        <View style={styles.emojiGrid}>
          <Image source={emojiSource} style={styles.emojiSmall} />
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

      <View style={styles.expenseInputContainer}>
        <TextInput
          style={styles.expenseInput}
          placeholder="Enter expense"
          keyboardType="numeric"
          value={expenseInput}
          onChangeText={setExpenseInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <ScrollView style={styles.leftSide} contentContainerStyle={styles.leftSideScroll}>
          {Array.from({ length: totalPlannedDays }, (_, index) => {
            const day = index + 1;
            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayBox,
                  day === currentDay && { borderColor: '#ffdd00', borderWidth: 2 },
                ]}
                onPress={() => openDayModal(day)}
              >
                <Text style={styles.dayBoxText}>Day {day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <LinearGradient
          colors={['#68181f', '#68181f', '#68181f']}
          start={{ x: 0, y: 0.24 }}
          end={{ x: 0, y: -0.13 }}
          style={styles.rightSide}
        >
          <Text style={styles.historyTitle}>History</Text>
          <ScrollView style={styles.historyScroll}>
            {Array.from({ length: totalPlannedDays }, (_, i) => {
              const day = i + 1;
              const expenses = expensesByDay[day] || [];
              const totalSpent = expenses.reduce((sum, val) => sum + val, 0).toFixed(2);
              return (
                <Text key={day} style={styles.historyItem}>
                  Day {day}: Spent ${totalSpent}
                </Text>
              );
            })}
          </ScrollView>
        </LinearGradient>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Expenses for Day {selectedDay}</Text>
            <ScrollView style={styles.modalScroll}>
              {(expensesByDay[selectedDay] || []).length === 0 ? (
                <Text style={styles.modalText}>No expenses recorded.</Text>
              ) : (
                (expensesByDay[selectedDay] || []).map((expense, idx) => (
                  <Text key={idx} style={styles.modalText}>
                    - ${expense.toFixed(2)}
                  </Text>
                ))
              )}
            </ScrollView>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Behåll dina styles som de är i din kod
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edcda6',
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
    justifyContent: 'center',
    marginTop: 10,
  },
  emojiSmall: {
    width: 40,
    height: 40,
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
  expenseInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  expenseInput: {
    flex: 1,
    borderColor: '#68181f',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#68181f',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
    backgroundColor: '#3D0A05',
  },
  dayBoxText: {
    color: '#ffdd00',
    fontWeight: '600',
  },
  rightSide: {
    flex: 2,
    padding: 12,
  },
  historyTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyScroll: {
    maxHeight: '100%',
  },
  historyItem: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalScroll: {
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 6,
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#68181f',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
