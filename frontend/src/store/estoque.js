import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';
import { handleError } from './utils';

const initialState = {
  produtos: [],
  
  id: null,
  produtoForm: false
};

export const fetchProdutosAsync = createAsyncThunk(
  'estoque/fetchProdutos',
  async (_, { getState, dispatch }) => {
    try {
      const state = getState();
      const { token, loja_id } = state.acesso;
  
      const response = await api(token, loja_id).get('/produtos');
      return response.data;
    }
    catch (e) {
      handleError(e, dispatch);
      throw e;
    }
  }
);

export const uploadFotoProdutoAsync = createAsyncThunk(
  'estoque/uploadFotoProduto',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState();
      const { token, loja_id } = state.acesso;
      const { id, foto } = args;
  
      const data = new FormData();
      data.append('foto', foto);
  
      await api(token, loja_id).put(`/produtos/${id}/foto`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    catch (e) {
      handleError(e, dispatch);
      throw e;
    }
  }
);

export const createProdutoAsync = createAsyncThunk(
  'estoque/createProduto',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState();
      const { token, loja_id } = state.acesso;
      const { nome, descricao, preco, file } = args;
  
      const { data } = await api(token, loja_id).post('/produtos', {
        nome,
        descricao,
        preco
      });
  
      if (file) {
        await dispatch(uploadFotoProdutoAsync({ id: data.id, foto: file }));
      }
    }
    catch (e) {
      handleError(e, dispatch);
      throw e;
    }
  }
);

export const updateProdutoAsync = createAsyncThunk(
  'estoque/updateProduto',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState();
      const { token, loja_id } = state.acesso;
      const { id } = state.estoque;
      const { nome, descricao, preco, file } = args;
  
      await api(token, loja_id).patch(`/produtos/${id}`, {
        nome,
        descricao,
        preco
      });
  
      if (file) {
        await dispatch(uploadFotoProdutoAsync({ id, foto: file }));
      }
    }
    catch (e) {
      handleError(e, dispatch);
      throw e;
    }
  }
);

export const sendProdutoAsync = createAsyncThunk(
  'estoque/sendProdutoAsync',
  async (args, { getState, dispatch }) => {
    const state = getState();
    const { id } = state.estoque;
    const { nome, descricao, preco, file } = args;

    const data = { nome, descricao, preco, file };

    if (id) {
      await dispatch(updateProdutoAsync(data));
    }
    else {
      await dispatch(createProdutoAsync(data));
    }

    dispatch(fetchProdutosAsync());
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
    },
    produtoCleanState(state) {
      state.id = null;
    },
    openProdutoForm(state) {
      state.produtoForm = true;
    },
    closeProdutoForm(state) {
      state.produtoForm = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProdutosAsync.fulfilled, (state, action) => {
        state.produtos = action.payload;
      });
  },
});

export const { 
  produtoToUpdate, 
  produtoCleanState, 
  openProdutoForm, 
  closeProdutoForm 
} = estoqueSlice.actions;

export default estoqueSlice.reducer;
