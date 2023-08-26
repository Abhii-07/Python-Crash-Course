import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { fetchOrders } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const OrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log('Fetching orders...');
    fetchOrders()
      .then((data) => {
        console.log('Fetched Orders:', data);
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching Orders:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(true)} // Open the menu when the button is pressed
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Food Delivery App</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.menuTitle}>Orders</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.orderItem}>
              <Text style={styles.customerName}>Customer: {item.customer_name}</Text>
              <Text style={[styles.orderStatus, item.status === 'delivered' && styles.deliveredStatus]}>
                Status: {item.status}
              </Text>
              <Text style={styles.totalAmount}>Total Amount: ₹{item.final_amount}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Dropdown Menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsMenuOpen(false)} // Close the menu when the close button is pressed
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.menuItems}>
            {/* Add buttons here to navigate to different pages */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuOpen(false);
                navigation.navigate('Home'); // Navigate to the 'Home' screen
              }}
            >
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuOpen(false);
                navigation.navigate('Menu'); // Navigate to the 'Menu' screen
              }}
            >
              <Text style={styles.menuItemText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuOpen(false);
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
  content: {
    flex: 1,
    padding: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: 16,
    color: 'gray',
  },
  deliveredStatus: {
    color: 'blue',
  },
  totalAmount: {
    fontSize: 16,
    color: 'green',
  },
  // Styles for the modal dropdown menu
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
  },
  menuItems: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default OrderScreen;
