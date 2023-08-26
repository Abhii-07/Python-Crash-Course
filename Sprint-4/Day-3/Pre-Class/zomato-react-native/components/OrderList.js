import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const OrderList = ({ orders }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text style={styles.customerName}>Customer: {item.customerName}</Text>
            <Text style={styles.totalAmount}>Total: ${item.final_amount.toFixed(2)}</Text>
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
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    marginLeft: 'auto',
  },
});

export default OrderList;
