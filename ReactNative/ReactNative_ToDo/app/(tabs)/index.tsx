import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddTaskForm } from '@/components/AddTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTodos, addTodo, toggleTodo, deleteTodo } from '@/store/todosSlice';

const STORAGE_KEY = 'TODOS';

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const pendingCount = useSelector((state: RootState) => state.todos.pendingCount);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch(setTodos(JSON.parse(stored)));
        } else {
          const res = await fetch('https://dummyjson.com/todos');
          const data = await res.json();
          dispatch(setTodos(data.todos));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadTodos();
  }, [dispatch]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (task: { title: string; date: string; priority: 'low' | 'medium' | 'high' }) => {
    const newTask = {
      id: Date.now(),
      todo: task.title,
      completed: false,
      date: task.date,
      priority: task.priority,
    };
    dispatch(addTodo(newTask));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => dispatch(toggleTodo(item.id))}
      >
        <Text style={styles.title}>{item.todo}</Text>
        <Text>{item.completed ? '✅ Done' : '⌛ Not done'}</Text>
        {item.date && <Text>Дата: {item.date}</Text>}
        {item.priority && <Text>Пріорітет: {item.priority}</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteTodo(item.id))}
      >
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ODOT List ({pendingCount})</Text>
      <Text style={styles.date}>{new Date().toLocaleString()}</Text>
      <AddTaskForm onAdd={handleAddTask} />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
  },
  todoContent: {
    flex: 1,
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    fontSize: 16,
  },
});