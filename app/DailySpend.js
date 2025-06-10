// components/DailySpend.js
import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { TravelPlanContext } from './TravelPlanContext';

const DailySpend = ({ route, navigation }) => {
  const { day } = route.params;
  const { travelPlan, setTravelPlan } = useContext(TravelPlanContext);
  const currentSpending = travelPlan.spending[day] || '';
  const [spending, setSpending] = useState(currentSpending);

  const handleSave = () => {
    setTravelPlan({
      ...travelPlan,
      spending: {
        ...travelPlan.spending,
        [day]: spending,
      },
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day {day} Spending</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount spent"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={spending}
        onChangeText={setSpending}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ebe5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
});

export default DailySpend;
