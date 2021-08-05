import React, { useState } from 'react';
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

import { produtoToUpdate } from '../store/estoque';

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

  const [quantidade, setQuantidade] = useState(0);

  const setProdutotoUpdate = id => dispatch(produtoToUpdate({ id }));

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
            <IconButton aria-label="remover item do carrinho" className={classes.removeButton}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{quantidade}</Typography>
            <IconButton aria-label="adicionar item ao carrinho" className={classes.addButton}>
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
