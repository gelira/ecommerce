import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProdutosAsync } from '../store/estoque';

export default function Produtos() {
  const dispatch = useDispatch();
  
  const produtos = useSelector(state => state.estoque.produtos);

  useEffect(() => {
    dispatch(fetchProdutosAsync());
  }, [dispatch]);

  useEffect(() => console.log(produtos), [produtos]);

  return (
    <h1>Produtos</h1>
  );
}
