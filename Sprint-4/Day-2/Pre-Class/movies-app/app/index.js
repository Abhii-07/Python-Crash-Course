import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  completedButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  completedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  darkModeToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  buttonGap: {
    height: 16,
  }
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    loadTodos();
    loadDarkMode();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from AsyncStorage:', error);
    }
  };

  const saveTodos = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos to AsyncStorage:', error);
    }
  };

  const loadDarkMode = async () => {
    try {
      const darkModeEnabled = await AsyncStorage.getItem('darkMode');
      if (darkModeEnabled !== null) {
        setDarkMode(darkModeEnabled === 'true');
      }
    } catch (error) {
      console.error('Error loading dark mode preference from AsyncStorage:', error);
    }
  };

  const saveDarkMode = async (enabled) => {
    try {
      await AsyncStorage.setItem('darkMode', enabled.toString());
    } catch (error) {
      console.error('Error saving dark mode preference to AsyncStorage:', error);
    }
  };

  const handleCreateTodo = () => {
    if (newTodo.title.trim() !== '') {
      const todo = {
        id: todos.length + 1,
        ...newTodo,
        completed: false,
      };
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos); 
      setNewTodo({ title: '', description: '' });
      setModalVisible(false); 
    }
  };

  const handleMarkCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos); 
  };

  const handleDeleteTodo = (id) => {
    
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos); 
  };

  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    saveDarkMode(newDarkMode); 
  };

  
  return (
    <View style={[styles.container, isDarkMode && { backgroundColor: 'black' }]}>
      <Text style={[styles.header, isDarkMode && { color: 'white' }]}>Your Todos</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.todoItem, isDarkMode && { backgroundColor: '#333' }]}>
            <Text style={[styles.todoTitle, isDarkMode && { color: 'white' }]}>{item.title}</Text>
            <Text style={[styles.todoDescription, isDarkMode && { color: 'white' }]}>{item.description}</Text>
            <TouchableOpacity
              style={[styles.completedButton, { backgroundColor: item.completed ? 'green' : 'gray' }]}
              onPress={() => handleMarkCompleted(item.id)}
            >
              <Text style={styles.completedButtonText}>
                {item.completed ? 'Completed' : 'Mark Completed'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTodo(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.addButton, isDarkMode && { backgroundColor: 'darkblue' }]}
        onPress={() => setModalVisible(true)} // Open the modal on button press
      >
        <Text style={styles.addButtonText}>Create Todo</Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle Switch */}
      <View style={styles.darkModeToggle}>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Modal for creating a new todo */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isDarkMode && { backgroundColor: '#333' }]}>
            <Text style={[styles.header, isDarkMode && { color: 'white' }]}>Create a New Todo</Text>
            <TextInput
              style={[styles.input, isDarkMode && { backgroundColor: '#444', color: 'white' }]}
              placeholder="Title"
              value={newTodo.title}
              onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
            />
            <TextInput
              style={[styles.input, isDarkMode && { backgroundColor: '#444', color: 'white' }]}
              placeholder="Description"
              value={newTodo.description}
              onChangeText={(text) => setNewTodo({ ...newTodo, description: text })}
            />
            <TouchableOpacity
              style={[styles.addButton, isDarkMode && { backgroundColor: 'darkblue' }]}
              onPress={handleCreateTodo}
            >
              <Text style={styles.addButtonText}>Create Todo</Text>
            </TouchableOpacity>
            <View style={styles.buttonGap} />
            <TouchableOpacity
              style={[styles.addButton, isDarkMode && { backgroundColor: 'darkred' }]}
              onPress={() => setModalVisible(false)} // Close the modal without creating a todo
            >
              <Text style={styles.addButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
