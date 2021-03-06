import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';
import { isLoading, loaded } from './controle';
import { handleError } from './utils';

const initialState = {
  carrinho: [],
  quantidadeItens: 0,
  valorTotal: 0,

  compras: []
};

export const fetchComprasAsync = createAsyncThunk(
  'comercial/fetchCompras',
  async (_, { getState, dispatch }) => {
    try {
      dispatch(isLoading());
      const state = getState();
      const { token, loja_id } = state.acesso;
  
      const { data } = await api(token, loja_id).get('/compras');
      dispatch(loaded());
      return data;
    }
    catch (e) {
      handleError(e, dispatch);
      dispatch(loaded());
      throw e;
    }
  }
);

export const createCompraAsync = createAsyncThunk(
  'comercial/createCompra',
  async (_, { getState, dispatch }) => {
    try {
      dispatch(isLoading());
      const state = getState();
      const { token, loja_id, id } = state.acesso;
      const { carrinho } = state.comercial;
  
      const data = {
        cliente: id,
        itens: []
      };
  
      for (const item of carrinho) {
        data.itens.push({
          produto: item.produto,
          quantidade: item.quantidade
        });
      }
  
      await api(token, loja_id).post('/compras', data);
      dispatch(loaded());
    }
    catch (e) {
      handleError(e, dispatch);
      dispatch(loaded());
      throw e;
    }
  }
);

export const updateCompraAsync = createAsyncThunk(
  'comercial/updateCompra',
  async (args, { getState, dispatch }) => {
    try {
      dispatch(isLoading());
      const state = getState();
      const { token, loja_id } = state.acesso;
      const { id, status } = args;
  
      await api(token, loja_id).put(`/compras/${id}`, { status });
      dispatch(loaded());
  
      return { id, status };
    }
    catch (e) {
      handleError(e, dispatch);
      dispatch(loaded());
      throw e;
    }
  }
);

export const comercialSlice = createSlice({
  name: 'comercial',
  initialState,
  reducers: {
    setItem(state, action) {
      const { produto, quantidade, preco, foto, nome } = action.payload;
      let carrinho = state.carrinho.slice();
      let quantidadeItens = 0;
      let valorTotal = 0;
      
      if (quantidade > 0) {
        const item = carrinho.find(i => i.produto === produto);
        if (item) {
          item.quantidade = quantidade;
          item.preco = preco;
        } 
        else {
          carrinho.push({ produto, quantidade, preco, foto, nome });
        }
      }
      else {
        carrinho = carrinho.filter(i => i.produto !== produto);
      }

      if (carrinho.length === 0) {
        quantidadeItens = 0;
        valorTotal = 0;
      }
      else {
        for (const item of carrinho) {
          quantidadeItens += item.quantidade;
          valorTotal += (item.quantidade * item.preco);
        }
      }

      state.carrinho = carrinho;
      state.quantidadeItens = quantidadeItens;
      state.valorTotal = valorTotal;
    },
    limparCarrinho(state) {
      state.carrinho = [];
      state.quantidadeItens = 0;
      state.valorTotal = 0;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComprasAsync.fulfilled, (state, action) => {
        state.compras = action.payload;
      });

    builder
      .addCase(updateCompraAsync.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.compras = state.compras.map(c => {
          if (c.id === id) {
            c.status = status;
          }
          return c;
        });
      });
  }
});

export const { setItem, limparCarrinho } = comercialSlice.actions;

export default comercialSlice.reducer;
