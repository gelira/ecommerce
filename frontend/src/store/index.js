import { configureStore } from '@reduxjs/toolkit';
import acessoReducer from './acesso';
import estoqueReducer from './estoque';
import comercialReducer from './comercial';
import controleReducer from './controle';

export const store = configureStore({
  reducer: {
    acesso: acessoReducer,
    estoque: estoqueReducer,
    comercial: comercialReducer,
    controle: controleReducer
  },
});
