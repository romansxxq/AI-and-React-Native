import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data.todos))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.todo}</Text>
      <Text>{item.completed ? '✅ Done' : '⌛ Not done'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ODOT List</Text>
      <Text style={styles.date}>{new Date().toLocaleString()}</Text>
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
});