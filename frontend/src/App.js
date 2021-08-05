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
import { fetchLojaAsync } from './store/acesso';


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

  const nome_loja = useSelector(state => state.acesso.nome_loja);
  const usuario_id = useSelector(state => state.acesso.id);

  useEffect(() => {
    const { host } = window.location;
    const nome_url = host.split('.')[0];
    dispatch(fetchLojaAsync({ nome_url }));
  }, [dispatch]);

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
          <h1>Teste</h1>
        </Container>
      </div>
    </>
  );
}

export default App;
