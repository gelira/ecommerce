import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { fetchProdutosAsync } from '../store/estoque';
import ProdutoCard from '../components/ProdutoCard';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    display: 'flex',
    flexFlow: 'row wrap'
  }
});

export default function Produtos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const produtos = useSelector(state => state.estoque.produtos);

  useEffect(() => {
    dispatch(fetchProdutosAsync());
  }, [dispatch]);

  useEffect(() => console.log(produtos), [produtos]);

  return (
    <div className={classes.root}>
      {produtos.length > 0 ? (
        produtos.map(produto => (
          <ProdutoCard produto={produto} />
        ))
      ) : (
        <Typography variant="h5" gutterBottom>
          Nenhum produto encontrado
        </Typography>
      )}
    </div>
  );
}
