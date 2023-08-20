// Import necessary modules
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = () => {
  const [count, setCount] = useState(0);

  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Function to decrement the count, not below 0
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={decrementCount} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={incrementCount} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272727',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  countContainer: {
    backgroundColor: '#383838',
    padding: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  count: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20, // This sets the gap between buttons
  },
  button: {
    backgroundColor: '#009688',
    padding: 20,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
