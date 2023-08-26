import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MenuHeader = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => navigation.toggleDrawer()} // Open the drawer
    >
      <Ionicons name="ios-menu" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 15,
  },
});

export default MenuHeader;
