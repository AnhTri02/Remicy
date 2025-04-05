import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_KEY = '9e13da419adab6539177249e';

export default function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch supported currencies on mount using USD as the base.
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const data = await response.json();
      // Extract all available currency codes from the conversion_rates object.
      const currencyKeys = Object.keys(data.conversion_rates);
      if (!currencyKeys.includes(data.base_code)) {
        currencyKeys.push(data.base_code);
      }
      setCurrencies(currencyKeys.sort());
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const convertCurrency = async () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount)) {
      alert('Please enter a valid number');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
      const data = await response.json();
      const rate = data.conversion_rates[targetCurrency];
      if (!rate) {
        alert('Conversion rate not available');
        setLoading(false);
        return;
      }
      const convertedAmount = inputAmount * rate;
      setResult(convertedAmount.toFixed(2));
      setLoading(false);
    } catch (error) {
      console.error('Error converting currency:', error);
      alert('Error fetching conversion rate');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <Text>From:</Text>
      <Picker
        selectedValue={baseCurrency}
        onValueChange={(itemValue) => setBaseCurrency(itemValue)}
        style={styles.picker}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <Text>To:</Text>
      <Picker
        selectedValue={targetCurrency}
        onValueChange={(itemValue) => setTargetCurrency(itemValue)}
        style={styles.picker}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Convert" onPress={convertCurrency} />
      )}

      {result && (
        <Text style={styles.result}>
          {amount} {baseCurrency} = {result} {targetCurrency}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
