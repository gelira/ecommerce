import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mensagem: '',
  openSnackbar: false
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
    }
  }
});

export const { openMensagem, closeMensagem } = controleSlice.actions;

export default controleSlice.reducer;
