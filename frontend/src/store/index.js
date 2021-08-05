import { configureStore } from '@reduxjs/toolkit';
import acessoReducer from './acesso';

export const store = configureStore({
  reducer: {
    acesso: acessoReducer,
  },
});
