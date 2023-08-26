import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { fetchDishes } from '../services/api'; // Import your API functions
import { Ionicons } from '@expo/vector-icons'; // Import an icon library, such as Ionicons

const MenuScreen = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchDishes()
      .then((data) => {
        console.log('Fetched Dishes:', data); // Log the fetched data to the console
        setDishes(data); // Set the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error);
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      <View style={styles.content}>
        <Text style={styles.menuTitle}>Menu</Text>
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Number of columns in the grid
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishItem}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishPrice}>Price: ₹{item.price}</Text>
              <Text style={styles.dishAvailability}>
                Availability: {item.availability ? 'Available' : 'Not Available'}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Dropdown Menu */}
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
                navigation.navigate('OrderForm'); // Navigate to the 'Order' screen
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

const windowWidth = Dimensions.get('window').width;

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
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dishItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: windowWidth / 2 - 20, // Adjust based on the number of columns
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishPrice: {
    fontSize: 14,
    color: 'green',
  },
  dishAvailability: {
    fontSize: 12,
    color: 'gray',
  },
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

export default MenuScreen;
