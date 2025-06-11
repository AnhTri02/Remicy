import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { TravelPlanContext } from './TravelPlanContext';

const GetStarted = () => {
  const navigation = useNavigation();
  const { setTravelPlan } = useContext(TravelPlanContext);
  const [country, setCountry] = useState('');
  const [money, setMoney] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = () => {
    setTravelPlan({ country, money, days });
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#68181f', '#68181f', '#68181f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.22, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Get Started</Text>

      <Text style={styles.label}>Which country are you going to?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination country"
        placeholderTextColor="lightgray"
        value={country}
        onChangeText={setCountry}
      />

      <Text style={styles.label}>How much money are you bringing?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="lightgray"
        keyboardType="numeric"
        value={money}
        onChangeText={setMoney}
      />

      <Text style={styles.label}>How many days will you be staying?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of days"
        placeholderTextColor="lightgray"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: 'white',
  },
});

export default GetStarted;
