import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import { fetchLojaAsync } from './store/acesso';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Produtos from './pages/Produtos';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const nome_loja = useSelector(state => state.acesso.nome_loja);
  const usuario_id = useSelector(state => state.acesso.id);
  const role = useSelector(state => state.acesso.role);
  const quantidadeItens = useSelector(state => state.comercial.quantidadeItens);

  useEffect(() => {
    const { host } = window.location;
    const nome_url = host.split('.')[0];
    dispatch(fetchLojaAsync({ nome_url }));
  }, [dispatch]);

  useEffect(() => {
    if (usuario_id && role) {
      if (role === 'dono') {
        history.push('/compras');
      }
      else {
        history.push('/produtos');
      }
    }
    else {
      history.push('/login');
    }
  }, [usuario_id, role, history]);

  useEffect(() => {
    document.title = nome_loja;
  }, [nome_loja]);

  const exibirCarrinho = () => quantidadeItens > 0 && role === 'cliente';

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography 
              variant="h6"
              className={classes.title}
            >
              {nome_loja}
            </Typography>
            {exibirCarrinho() && (
              <IconButton
                color="inherit"
              >
                <Badge color="secondary" badgeContent={quantidadeItens}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {usuario_id && (
              <IconButton
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Container>
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
              <h1>Compras</h1>
            </Route>
          </Switch>
        </Container>
      </div>
    </>
  );
}
