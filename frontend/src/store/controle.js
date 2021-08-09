import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mensagem: '',
  openSnackbar: false,
  loading: false
};

export const controleSlice = createSlice({
  name: 'controle',
  initialState,
  reducers: {
    openMensagem(state, action) {
      const { mensagem } = action.payload;
      state.mensagem = mensagem;
      state.openSnackbar = true;
    },
    closeMensagem(state) {
      state.mensagem = '';
      state.openSnackbar = false;
    },
    isLoading(state) {
      state.loading = true;
    },
    loaded(state) {
      state.loading = false;
    }
  }
});

export const { 
  openMensagem, 
  closeMensagem,
  isLoading,
  loaded 
} = controleSlice.actions;

export default controleSlice.reducer;
