import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  AccountCircle
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { fetchLojaAsync } from './store/acesso';

import Login from './components/Login';
import Registro from './components/Registro';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const nome_loja = useSelector(state => state.acesso.nome_loja);
  const usuario_id = useSelector(state => state.acesso.id);
  const role = useSelector(state => state.acesso.role);

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
              <h1>Produtos</h1>
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

export default App;
