import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './Reducer/index';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  }
});

export default store;