import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen'; // Adjust the import path as needed

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
