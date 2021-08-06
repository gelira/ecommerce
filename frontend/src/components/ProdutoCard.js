import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  IconButton, 
  Typography 
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { produtoToUpdate, openProdutoForm } from '../store/estoque';
import { setItem } from '../store/comercial';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '20px'
  },
  media: {
    height: 140,
  },
  removeButton: {
    color: 'red'
  },
  addButton: {
    color: 'green'
  }
});

export default function ProdutoCard(props) {
  const { id, nome, descricao, preco, foto } = props.produto;

  const classes = useStyles();
  const dispatch = useDispatch();
  const cliente = useSelector(state => state.acesso.role === 'cliente');
  const quantidadeCarrinho = useSelector(state => {
    const item = state.comercial.carrinho.find(i => i.produto === id);
    return item ? item.quantidade : 0;
  });

  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    if (quantidadeCarrinho > quantidade && quantidade === 0) {
      setQuantidade(quantidadeCarrinho);
    }
  }, [quantidade, quantidadeCarrinho]);

  const setProdutotoUpdate = id => {
    dispatch(produtoToUpdate({ id }));
    dispatch(openProdutoForm());
  };

  const updateQuantidade = c => {
    const s = quantidade + c;
    if (s >= 0) {
      setQuantidade(s);
      dispatch(setItem({ 
        produto: id,
        quantidade: s,
        preco,
        foto 
      }));
    }
  };

  return (
    <Card className={classes.root}>
      {foto && (
        <CardMedia
          className={classes.media}
          image={foto}
        />
      )}
      <CardHeader title={nome} />
      <CardContent>
        <Typography variant="body1" component="p">{descricao}</Typography>
        <Typography variant="h6">R$ {preco.toFixed(2)}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {cliente ? (
          <>
            <IconButton 
              aria-label="remover item do carrinho" 
              className={classes.removeButton}
              onClick={() => updateQuantidade(-1)}
              disabled={quantidade === 0}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{quantidade}</Typography>
            <IconButton 
              aria-label="adicionar item ao carrinho" 
              className={classes.addButton}
              onClick={() => updateQuantidade(1)}
            >
              <AddIcon />
            </IconButton>
          </>
        ) : (
          <Button 
            color="primary"
            onClick={() => setProdutotoUpdate(id)}
          >
            Editar produto
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
