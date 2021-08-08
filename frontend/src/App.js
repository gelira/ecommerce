import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { cleanLogin, fetchLojaAsync, fetchInfoUsuarioAsync } from './store/acesso';

import Mensagem from './components/Mensagem';
import MenuNavegacao from './components/MenuNavegacao';
import MenuUsuario from './components/MenuUsuario';
import IconeCarrinho from './components/IconeCarrinho';
import Rotas from './Rotas';

const useStyles = makeStyles(theme => ({
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

  const token = useSelector(state => state.acesso.token);
  const nome_loja = useSelector(state => state.acesso.nome_loja);

  useEffect(() => {
    const { host } = window.location;
    const nome_url = host.split('.')[0];
    dispatch(fetchLojaAsync({ nome_url }));
  }, [dispatch]);

  useEffect(() => {
    (async function () {
      try {
        if (token) {
          const data = await dispatch(fetchInfoUsuarioAsync({ token })).unwrap();
          if (data.role === 'dono') {
            history.push('/compras');
          }
          else {
            history.push('/produtos');
          }
        }
        else {
          history.push('/login');
        }
      }
      catch {
        dispatch(cleanLogin());
        history.push('/login');
      }
    })();
  }, [token, dispatch, history]);

  useEffect(() => {
    document.title = nome_loja;
  }, [nome_loja]);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <MenuNavegacao />
            <Typography 
              variant="h6"
              className={classes.title}
            >
              {nome_loja}
            </Typography>
            <IconeCarrinho />
            <MenuUsuario />
          </Toolbar>
        </AppBar>
        <Container>
          <Rotas />
        </Container>
      </div>
      <Mensagem />
    </>
  );
}
