import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';

const initialState = {
  produtos: []
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProdutosAsync.fulfilled, (state, action) => {
        state.produtos = action.payload;
      });
  },
});

export default estoqueSlice.reducer;
