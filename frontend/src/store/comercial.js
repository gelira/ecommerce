import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import api from '../api';

const initialState = {
  carrinho: [],
  quantidadeItens: 0,
  valorTotal: 0
};

// export const fetchProdutosAsync = createAsyncThunk(
//   'estoque/fetchProdutos',
//   async (_, { getState }) => {
//     const state = getState();
//     const { token, loja_id } = state.acesso;

//     const response = await api(token, loja_id).get('/produtos');
//     return response.data;
//   }
// );

// export const uploadFotoProdutoAsync = createAsyncThunk(
//   'estoque/uploadFotoProduto',
//   async (args, { getState }) => {
//     const state = getState();
//     const { token, loja_id } = state.acesso;
//     const { id, foto } = args;

//     const data = new FormData();
//     data.append('foto', foto);

//     await api(token, loja_id).put(`/produtos/${id}/foto`, data, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//   }
// );

// export const createProdutoAsync = createAsyncThunk(
//   'estoque/createProduto',
//   async (args, { getState, dispatch }) => {
//     const state = getState();
//     const { token, loja_id } = state.acesso;
//     const { nome, descricao, preco, file } = args;

//     const { data } = await api(token, loja_id).post('/produtos', {
//       nome,
//       descricao,
//       preco
//     });

//     if (file) {
//       await dispatch(uploadFotoProdutoAsync({ id: data.id, foto: file }));
//     }
//   }
// );

// export const updateProdutoAsync = createAsyncThunk(
//   'estoque/updateProduto',
//   async (args, { getState, dispatch }) => {
//     const state = getState();
//     const { token, loja_id } = state.acesso;
//     const { id } = state.estoque;
//     const { nome, descricao, preco, file } = args;

//     await api(token, loja_id).patch(`/produtos/${id}`, {
//       nome,
//       descricao,
//       preco
//     });

//     if (file) {
//       await dispatch(uploadFotoProdutoAsync({ id, foto: file }));
//     }
//   }
// );

// export const sendProdutoAsync = createAsyncThunk(
//   'estoque/sendProdutoAsync',
//   async (args, { getState, dispatch }) => {
//     const state = getState();
//     const { id } = state.estoque;
//     const { nome, descricao, preco, file } = args;

//     const data = { nome, descricao, preco, file };

//     if (id) {
//       await dispatch(updateProdutoAsync(data));
//     }
//     else {
//       await dispatch(createProdutoAsync(data));
//     }

//     dispatch(fetchProdutosAsync());
//   }
// );

export const comercialSlice = createSlice({
  name: 'comercial',
  initialState,
  reducers: {
    setItem(state, action) {
      const { produto, quantidade, preco, foto } = action.payload;
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
          carrinho.push({ produto, quantidade, preco, foto });
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
    }
  },
});

export const { setItem } = comercialSlice.actions;

export default comercialSlice.reducer;
