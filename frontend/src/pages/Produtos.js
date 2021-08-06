import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import { fetchProdutosAsync, openProdutoForm } from '../store/estoque';
import ProdutoCard from '../components/ProdutoCard';
import ProdutoForm from '../components/ProdutoForm';

const useStyles = makeStyles({
  root: {
    marginTop: '10px'
  },
  container: {
    marginTop: '10px',
    display: 'flex',
    flexFlow: 'row wrap'
  }
});

export default function Produtos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const dono = useSelector(state => state.acesso.role === 'dono');
  const produtos = useSelector(state => state.estoque.produtos);

  useEffect(() => {
    dispatch(fetchProdutosAsync());
  }, [dispatch]);

  const openModal = () => dispatch(openProdutoForm());

  return (
    <>
      <h1>Produtos</h1>
      <div className={classes.root}>
        {dono && (
          <Button 
            variant="contained" 
            color="primary"
            onClick={openModal}
          >
            Cadastrar Produto
          </Button>
        )}
        <div className={classes.container}>
          {produtos.length > 0 ? (
            produtos.map(produto => (
              <ProdutoCard
                key={produto.id} 
                produto={produto} 
              />
            ))
          ) : (
            <Typography variant="h5" gutterBottom>
              Nenhum produto encontrado
            </Typography>
          )}
          {dono && <ProdutoForm />}
        </div>
      </div>
    </>
  );
}
