import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OrderForm = ({ onPlaceOrder }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handlePlaceOrder = () => {
    // Validate inputs and create the order object
    const order = {
      customerName,
      selectedDishes,
    };

    // Call the onPlaceOrder function with the order data
    onPlaceOrder(order);

    // Reset the form
    setCustomerName('');
    setSelectedDishes([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
      />

      {/* Dish selection goes here */}
      
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  // Add styles for dish selection (e.g., checkboxes, etc.) here
});

export default OrderForm;
