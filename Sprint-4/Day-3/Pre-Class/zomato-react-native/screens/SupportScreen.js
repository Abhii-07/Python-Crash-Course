import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SupportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Support</Text>
      </View>
      <View style={styles.content}>
        <Text>Contact support:</Text>
        {/* Add your support contact information or content here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF', // Header background color
    padding: 10,
  },
  backButton: {
    color: 'white', // Back button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: 'white', // Header title text color
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SupportScreen;
