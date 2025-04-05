import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BasicPage = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]} >Basic Page</Text>
      <Text style={[styles.title]}>Test2.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1119'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
});

export default BasicPage;
