import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type TaskFormData = {
  title: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
};

export const AddTaskForm = () => {
  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      date: '',
      priority: 'low',
    },
  });

  const onSubmit = (data: TaskFormData) => {
    const taskWithStatus = {
      ...data,
      status: 'to-do', // статус за замовчуванням
    };
    console.log('New Task:', taskWithStatus);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Enter task title"
          />
        )}
      />

      <Text style={styles.label}>Date</Text>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="YYYY-MM-DD"
          />
        )}
      />

      <Text style={styles.label}>Priority</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="low, medium or high"
          />
        )}
      />

      <Button title="Add Task" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
});
