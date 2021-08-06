import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import { setItem } from '../store/comercial';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1
  },
  removeButton: {
    color: 'red'
  },
  addButton: {
    color: 'green'
  },
  deleteButton: {
    color: 'red',
    paddingRight: theme.spacing(2)
  }
}));

export default function CarrinhoItem(props) {
  const { produto, quantidade, preco, foto, nome } = props.item;

  const classes = useStyles();
  const dispatch = useDispatch();

  const updateQuantidade = c => {
    const s = quantidade + c;
    if (s >= 0) {
      dispatch(setItem({ 
        produto,
        quantidade: s,
        preco,
        foto,
        nome 
      }));
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={foto}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {nome}
          </Typography>
          <Typography variant="subtitle1">
            Preço unitário: R$ {preco.toFixed(2)}
          </Typography>
          <Typography variant="subtitle1">
            Valor do item: R$ {(preco * quantidade).toFixed(2)}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.controls}>
        <IconButton 
          aria-label="remover item do carrinho" 
          className={classes.removeButton}
          onClick={() => updateQuantidade(-1)}
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
      </div>
      <IconButton 
        aria-label="remover item do carrinho" 
        className={classes.deleteButton}
        onClick={() => updateQuantidade(-quantidade)}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}