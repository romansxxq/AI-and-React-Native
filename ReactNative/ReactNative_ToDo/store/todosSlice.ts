import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  date?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface TodosState {
  items: Todo[];
  pendingCount: number;
}

const initialState: TodosState = {
  items: [],
  pendingCount: 0,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.pendingCount = action.payload.filter(todo => !todo.completed).length;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.unshift(action.payload);
      state.pendingCount += 1;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        state.pendingCount += todo.completed ? -1 : 1;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(item => item.id === action.payload);
      state.items = state.items.filter(item => item.id !== action.payload);
      if (todo && !todo.completed) {
        state.pendingCount -= 1;
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;