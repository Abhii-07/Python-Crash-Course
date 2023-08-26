import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button, // Import Button from React Native
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchDishes, placeOrder } from '../services/api';

const OrderFormScreen = ({ navigation }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount state


  useEffect(() => {
    // Fetch menu items when the component mounts
    fetchDishes()
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      // Show an alert to the user
      alert('Please enter your name before placing an order.');
      return;
    }
  
    // Calculate the total amount based on selected dishes
    const totalAmount = selectedDishes.reduce((total, dish) => total + dish.price, 0);
  
    // Prepare the order data
    const orderData = {
      customer_name: customerName,
      status: 'received', // Set the status to "received" by default
      final_amount: totalAmount.toFixed(2), // Calculate and format the final amount
      dishes: selectedDishes.map((dish) => dish.id), // Send selected dish IDs
    };
  
    // Call the placeOrder API function to post the order data
    placeOrder(orderData)
      .then((response) => {
        console.log('Order placed successfully:', response);
        // Reset the state and navigate if needed
        setCustomerName('');
        setSelectedDishes([]);
        navigation.navigate('ShowOrders');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDishSelection = (dish) => {
    // Check if the dish is already selected
    if (selectedDishes.some((selectedDish) => selectedDish.id === dish.id)) {
      // If selected, remove it and subtract its price from the total amount
      setSelectedDishes(selectedDishes.filter((selectedDish) => selectedDish.id !== dish.id));
      setTotalAmount(totalAmount - dish.price);
    } else {
      // If not selected, add it and add its price to the total amount
      setSelectedDishes([...selectedDishes, dish]);
      setTotalAmount(totalAmount + dish.price);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggleMenu}
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Food Delivery App</Text>
      </View>
      <Text style={styles.title}>Place Order</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={customerName}
          onChangeText={(text) => setCustomerName(text)}
        />
      </View>
      {/* Display total order value */}
      <Text style={styles.orderValue}>Total Order Value: ₹{totalAmount.toFixed(2)}</Text>

      <Text style={styles.title}>Select Dishes</Text>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
      >
        <Button title="Place Order" onPress={handlePlaceOrder} />
      </TouchableOpacity>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedDishes.some((selectedDish) => selectedDish.id === item.id) &&
                styles.selectedItem,
            ]}
            onPress={() => toggleDishSelection(item)}
          >
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>Price: ₹{item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuOpen}
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleMenu}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.menuItems}>
            {/* Add buttons here to navigate to different pages */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('Home'); // Navigate to the 'Home' screen
              }}
            >
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('Order'); // Navigate to the 'Order' screen
              }}
            >
              <Text style={styles.menuItemText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('ShowOrders'); // Navigate to the 'ShowOrders' screen
              }}
            >
              <Text style={styles.menuItemText}>Review Orders</Text>
            </TouchableOpacity>
            {/* Add more buttons for other screens */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
  },
  menuButton: {
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  placeOrderButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  menuItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 14,
    color: 'green',
  },
  orderValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
    marginVertical: 10, // Add vertical margin for spacing
    backgroundColor: 'lightgray', // Background color
    padding: 10, // Add padding around the text
    borderRadius: 5, // Add rounded corners
  },
  
});

export default OrderFormScreen;
