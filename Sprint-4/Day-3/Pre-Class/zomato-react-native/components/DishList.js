import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const DishList = ({ dishes }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Image source={{ uri: item.image }} style={styles.dishImage} />
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishPrice: {
    fontSize: 16,
    marginLeft: 'auto',
  },
});

export default DishList;
