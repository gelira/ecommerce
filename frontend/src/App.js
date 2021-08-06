import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';

import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import { cleanLogin, fetchLojaAsync, fetchInfoUsuarioAsync } from './store/acesso';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import Compras from './pages/Compras';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const token = useSelector(state => state.acesso.token);
  const nome_loja = useSelector(state => state.acesso.nome_loja);
  const usuario_id = useSelector(state => state.acesso.id);
  const nome = useSelector(state => state.acesso.nome);
  const role = useSelector(state => state.acesso.role);
  const quantidadeItens = useSelector(state => state.comercial.quantidadeItens);

  const [anchorNavigate, setAnchorNavigate] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);
  const openNavigate = Boolean(anchorNavigate);
  const openUser = Boolean(anchorUser);

  const handleOpenNavigate = (event) => {
    setAnchorNavigate(event.currentTarget);
  };

  const handleCloseNavigate = () => {
    setAnchorNavigate(null);
  };

  const handleOpenUser = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  const navigateCompras = () => {
    history.push('/compras');
    handleCloseNavigate();
  };

  const navigateProdutos = () => {
    history.push('/produtos');
    handleCloseNavigate();
  };

  const logout = () => {
    handleCloseUser();
    dispatch(cleanLogin());
    history.push('/login');
  };

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

  const exibirCarrinho = () => quantidadeItens > 0 && role === 'cliente';

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {usuario_id && (
              <>
                <IconButton 
                  edge="start" 
                  className={classes.menuButton} 
                  color="inherit" 
                  onClick={handleOpenNavigate}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorNavigate}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openNavigate}
                  onClose={handleCloseNavigate}
                >
                  <MenuItem onClick={navigateCompras}>{role === 'cliente' ? 'Minhas Compras' : 'Compras'}</MenuItem>
                  <MenuItem onClick={navigateProdutos}>Produtos</MenuItem>
                </Menu>
              </>
            )}
            <Typography 
              variant="h6"
              className={classes.title}
            >
              {nome_loja}
            </Typography>
            {exibirCarrinho() && (
              <IconButton
                color="inherit"
                onClick={() => history.push('/carrinho')}
              >
                <Badge color="secondary" badgeContent={quantidadeItens}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {usuario_id && (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleOpenUser}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-usuario"
                  anchorEl={anchorUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openUser}
                  onClose={handleCloseUser}
                >
                  <MenuItem>Olá, {nome}!</MenuItem>
                  <MenuItem onClick={logout}>Sair</MenuItem>
                </Menu>
              </>
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
              <Compras />
            </Route>
            <Route path="/carrinho">
              <Carrinho />
            </Route>
          </Switch>
        </Container>
      </div>
    </>
  );
}
