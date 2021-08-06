import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import { 
  closeProdutoForm, 
  produtoCleanState,
  sendProdutoAsync 
} from '../store/estoque';

export default function ProdutoForm() {
  const dispatch = useDispatch();
  
  const open = useSelector(state => state.estoque.produtoForm);
  const produto = useSelector(state => {
    const { id, produtos } = state.estoque;
    return produtos.find(p => p.id === id);
  });

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [foto, setFoto] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setDescricao(produto.descricao);
      setPreco(produto.preco);
      setFoto(produto.foto);
    }
  }, [produto]);

  const close = () => {
    setNome('');
    setDescricao('');
    setPreco(0);
    setFoto('');
    setFile(null);
    dispatch(produtoCleanState());
    dispatch(closeProdutoForm());
  };

  const salvar = async () => {
    await dispatch(sendProdutoAsync({ nome, descricao, preco, file }));
    close();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Formulário de Produto</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome do produto"
          value={nome}
          onChange={e => setNome(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          fullWidth
          multiline
        />
        <TextField
          margin="dense"
          label="Nome do produto"
          type="number"
          min="0"
          step="0.01"
          value={preco}
          onChange={e => setPreco(Number(e.target.value))}
          fullWidth
        />
        {foto && (
          <img alt="" src={foto} height="100" />
        )}
        <TextField
          margin="dense"
          label="Foto do produto"
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          Cancelar
        </Button>
        <Button onClick={salvar} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
