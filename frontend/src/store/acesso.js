import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';

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
    const { token } = args;
    const { data } = await api(token).get('/info');
    data.token = token;
    return data;
  }
);

export const loginAsync = createAsyncThunk(
  'acesso/login',
  async (args, { dispatch }) => {
    const { username, password } = args;
    const { data } = await api().post('/token', { username, password });
    const { token } = data;
    await dispatch(fetchInfoUsuarioAsync({ token }));
  }
);

export const createClienteAsync = createAsyncThunk(
  'acesso/createCliente',
  async (args, { dispatch }) => {
    const { nome, email, senha } = args;
    const { data } = await api().post('/cliente', { nome, email, senha });
    const { token } = data;
    await dispatch(fetchInfoUsuarioAsync({ token }));
  }
);

export const acessoSlice = createSlice({
  name: 'acesso',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLojaAsync.fulfilled, (state, action) => {
        const { id, nome } = action.payload;

        state.loja_id = id;
        state.nome_loja = nome;
      });
    
    builder
      .addCase(fetchInfoUsuarioAsync.fulfilled, (state, action) => {
        const { id, nome, email, role, token } = action.payload;

        state.id = id;
        state.nome = nome;
        state.email = email;
        state.role = role;
        state.token = token

        localStorage.setItem('token', token);
      });
  },
});

export default acessoSlice.reducer;
