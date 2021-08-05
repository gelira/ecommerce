import { configureStore } from '@reduxjs/toolkit';
import acessoReducer from './acesso';
import estoqueReducer from './estoque';

export const store = configureStore({
  reducer: {
    acesso: acessoReducer,
    estoque: estoqueReducer,
  },
});
