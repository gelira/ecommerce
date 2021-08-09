import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function IconeCarrinho() {
  const history = useHistory();

  const quantidadeItens = useSelector(state => state.comercial.quantidadeItens);
  const exibirIcone = useSelector(state => {
    const qtd = state.comercial.quantidadeItens;
    const role = state.acesso.role;
    return qtd > 0 && role === 'cliente';
  });

  const navigate = () => {
    history.push('/carrinho');
  };

  return exibirIcone && (
    <IconButton
      color="inherit"
      onClick={navigate}
    >
      <Badge 
        color="secondary" 
        badgeContent={quantidadeItens}
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
