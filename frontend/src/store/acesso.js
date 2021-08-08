import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';
import { openMensagem } from './controle';

const initialState = {
  token: localStorage.getItem('token'),
  id: null,
  nome: '',
  email: '',
  role: '',

  loja_id: null,
  nome_loja: ''
};

export const fetchLojaAsync = createAsyncThunk(
  'acesso/fetchLoja',
  async (args) => {
    const { nome_url } = args;
    const response = await api().get('/loja', {
      params: { nome_url }
    });
    return response.data;
  }
);

export const fetchInfoUsuarioAsync = createAsyncThunk(
  'acesso/fetchInfoUsuario',
  async (args) => {
    const { token, loja_id } = args;
    const { data } = await api(token, loja_id).get('/info');
    return data;
  }
);

export const loginAsync = createAsyncThunk(
  'acesso/login',
  async (args, { dispatch, getState }) => {
    try {
      const state = getState();
      const { loja_id } = state.acesso;

      const { username, password } = args;
      const { data } = await api(null, loja_id).post('/token', { username, password });
      return data;
    }
    catch (e) {
      dispatch(openMensagem({ mensagem: 'Credenciais inválidas' }));
      throw e;
    }
  }
);

export const createClienteAsync = createAsyncThunk(
  'acesso/createCliente',
  async (args) => {
    const { nome, email, senha } = args;
    const { data } = await api().post('/cliente', { nome, email, senha });
    return data;
  }
);

export const acessoSlice = createSlice({
  name: 'acesso',
  initialState,
  reducers: {
    cleanLogin(state) {
      state.token = null;
      state.id = null;
      state.nome = '';
      state.email = '';
      state.role = '';

      localStorage.removeItem('token');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLojaAsync.fulfilled, (state, action) => {
        const { id, nome } = action.payload;

        state.loja_id = id;
        state.nome_loja = nome;
      });
    
    builder
      .addCase(fetchInfoUsuarioAsync.fulfilled, (state, action) => {
        const { id, nome, email, role } = action.payload;

        state.id = id;
        state.nome = nome;
        state.email = email;
        state.role = role;
      });

    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { token } = action.payload;
        state.token = token;
        localStorage.setItem('token', token);
      });

    builder
      .addCase(createClienteAsync.fulfilled, (state, action) => {
        const { token } = action.payload;
        state.token = token;
        localStorage.setItem('token', token);
      });
  },
});

export const { cleanLogin } = acessoSlice.actions;

export default acessoSlice.reducer;
