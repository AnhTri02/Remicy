import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Picker,
} from 'react-native';
import { fetchExchangeRates, convertCurrency } from '../utils/currency';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('JPY');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [rates, setRates] = useState(null);

  const baseCurrency = 'USD'; // You can let user change this later

  useEffect(() => {
    const getRates = async () => {
      const result = await fetchExchangeRates(currency);
      setRates(result);
    };
    getRates();
  }, [currency]);

  const handleAddExpense = async () => {
    if (!amount || !description || !rates) {
      Alert.alert('Missing input', 'Please fill in all fields');
      return;
    }

    const convertedAmount = convertCurrency(Number(amount), 1, rates[baseCurrency]);

    const newExpense = {
      id: Date.now().toString(),
      amount: Number(amount),
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      currency,
      baseCurrency,
      description,
      category,
      date: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('expenses');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(parsed));

      Alert.alert('Expense Added', `${amount} ${currency} - ${description}`);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to save expense');
      console.error(err);
    }
  };

  if (!rates) {
    return <Text style={{ padding: 20 }}>Loading exchange rates...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Currency</Text>
      <Picker
        selectedValue={currency}
        onValueChange={(value) => setCurrency(value)}
        style={styles.picker}
      >
        {Object.keys(rates).map((cur) => (
          <Picker.Item label={cur} value={cur} key={cur} />
        ))}
      </Picker>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Transport" value="Transport" />
        <Picker.Item label="Accommodation" value="Accommodation" />
        <Picker.Item label="Shopping" value="Shopping" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      {amount ? (
        <Text style={styles.convertedText}>
          ≈ {convertCurrency(Number(amount), 1, rates[baseCurrency]).toFixed(2)} {baseCurrency}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 15, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
  convertedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#4caf50',
  },
});

export default AddExpenseScreen;
