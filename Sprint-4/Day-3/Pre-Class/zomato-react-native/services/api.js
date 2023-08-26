const API_BASE_URL = 'http://127.0.0.1:8000/';

// Helper function to handle errors
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// API function to fetch dishes
// export const fetchDishes = () => {
//   return fetch(`${API_BASE_URL}api/dishes/`)
//     .then(handleErrors)
//     .then((response) => response.json())
//     .catch((error) => {
//       console.error('Error fetching dishes:', error);
//     });
// };

export const fetchDishes = () => {
  return fetch(`${API_BASE_URL}api/dishes/`)
    .then((response) => response.json())
    .then((data) => {
      // Ensure that the 'price' property is converted to a number
      const menuItemsWithPriceAsNumber = data.map((item) => ({
        ...item,
        price: parseFloat(item.price), // Convert 'price' to a float
      }));
      return menuItemsWithPriceAsNumber;
    })
    .catch((error) => {
      console.error('Error fetching menu items:', error);
    });
};

// API function to fetch orders
export const fetchOrders = async () => {
  try {
    const response1 = await fetch(`${API_BASE_URL}api/orders/`);
    const response_1 = await handleErrors(response1);
    return response_1.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Throw the error to be caught by the caller
  }
};

// API function to create a dish
export const createDish = (data) => {
  return fetch(`${API_BASE_URL}api/dishes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error creating dish:', error);
    });
};

// API function to delete a dish
export const deleteDish = (dishId) => {
  return fetch(`${API_BASE_URL}api/dishes/${dishId}/`, {
    method: 'DELETE',
  })
    .then(handleErrors)
    .catch((error) => {
      console.error('Error deleting dish:', error);
    });
};

// API function to update dish availability
export const updateDishAvailability = (dishId, data) => {
  return fetch(`${API_BASE_URL}api/dishes/${dishId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error updating dish availability:', error);
    });
};

// API function to place an order
export const placeOrder = (data) => {
  return fetch(`${API_BASE_URL}api/orders/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error placing order:', error);
    });
};



// API function to update order status
export const updateOrderStatus = (orderId, data) => {
  return fetch(`${API_BASE_URL}api/orders/${orderId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error updating order status:', error);
    });
};
