import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';

const initialState = {
  produtos: [],
  
  id: null,
  nome: '',
  descricao: '',
  preco: 0,
  foto: ''
};

export const fetchProdutosAsync = createAsyncThunk(
  'estoque/fetchProdutos',
  async (_, { getState }) => {
    const state = getState();
    const { token, loja_id } = state.acesso;

    const response = await api(token, loja_id).get('/produtos');
    return response.data;
  }
);

export const estoqueSlice = createSlice({
  name: 'estoque',
  initialState,
  reducers: {
    produtoToUpdate(state, action) {
      const { id } = action.payload;
      const produto = state.produtos.find(p => p.id === id);
      if (!produto) {
        return;
      }

      state.id = produto.id;
      state.nome = produto.nome;
      state.descricao = produto.descricao;
      state.preco = produto.preco;
      state.foto = produto.foto;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProdutosAsync.fulfilled, (state, action) => {
        state.produtos = action.payload;
      });
  },
});

export const { produtoToUpdate } = estoqueSlice.actions;

export default estoqueSlice.reducer;
