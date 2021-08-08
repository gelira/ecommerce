import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Carrinho from './pages/Carrinho';
import Compras from './pages/Compras';
import Login from './pages/Login';
import Produtos from './pages/Produtos';
import Registro from './pages/Registro';

export default function Rotas() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/registro">
        <Registro />
      </Route>
      <Route path="/produtos">
        <Produtos />
      </Route>
      <Route path="/compras">
        <Compras />
      </Route>
      <Route path="/carrinho">
        <Carrinho />
      </Route>
    </Switch>
  );
}
