import { cleanLogin } from './acesso';
import { openMensagem } from './controle';

export function handleError(error, dispatch) {
  let mensagem = 'Ocorreu um algo inesperado';
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(cleanLogin());
      mensagem = 'Sessão expirada'
    }
    else {
      mensagem = error.response.data.detail || 'Ocorreu um erro na comunicação'
    }
  }
  dispatch(openMensagem({ mensagem }));
}
