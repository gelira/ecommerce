import { configureStore } from '@reduxjs/toolkit';
import acessoReducer from './acesso';
import estoqueReducer from './estoque';
import comercialReducer from './comercial';

export const store = configureStore({
  reducer: {
    acesso: acessoReducer,
    estoque: estoqueReducer,
    comercial: comercialReducer,
  },
});
