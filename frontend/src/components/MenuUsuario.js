import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { cleanLogin } from '../store/acesso';

export default function MenuUsuario() {
  const history = useHistory();
  const dispatch = useDispatch();

  const nome = useSelector(state => state.acesso.nome);
  const usuario_id = useSelector(state => state.acesso.id);

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleOpen = event => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const logout = () => {
    handleClose();
    dispatch(cleanLogin());
    history.push('/login');
  };

  return usuario_id && (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-usuario"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>Olá, {nome}!</MenuItem>
        <MenuItem onClick={logout}>Sair</MenuItem>
      </Menu>
    </>
  );
}