import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  title: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
};

type Props = {
  onAdd: (task: FormData) => void;
};

export const AddTaskForm: React.FC<Props> = ({ onAdd }) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: '',
      date: '',
      priority: 'low',
    },
  });

  const onSubmit = (data: FormData) => {
    onAdd(data);
    reset();
  };

  return (
    <View style={styles.form}>
      <Text>Назва</Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Введіть назву"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text>Дата</Text>
      <Controller
        control={control}
        name="date"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text>Пріорітет</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <View style={styles.priorityRow}>
            {['low', 'medium', 'high'].map((level) => (
              <Button
                key={level}
                title={level}
                color={value === level ? '#007bff' : '#aaa'}
                onPress={() => onChange(level)}
              />
            ))}
          </View>
        )}
      />
      <Button title="Додати" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});