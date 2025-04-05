import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TravelPlanContext } from '../TravelPlanContext'; // adjust the path as needed
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();
  const { setTravelPlan } = useContext(TravelPlanContext);
  const [country, setCountry] = useState('');
  const [money, setMoney] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = () => {
    // Save the answers in context
    setTravelPlan({ country, money, days });
    // Navigate to the Home screen (or main page)
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.label}>Which country are you going to?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination country"
        placeholderTextColor="gray"
        value={country}
        onChangeText={setCountry}
      />
      <Text style={styles.label}>How much money are you bringing?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={money}
        onChangeText={setMoney}
      />
      <Text style={styles.label}>How many days will you be staying?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of days"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ebe5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color:'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color:'black',
  },
});

export default GetStarted;
