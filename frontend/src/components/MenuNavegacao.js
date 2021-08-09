import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuNavegacao() {
  const classes = useStyles();
  const history = useHistory();

  const usuario_id = useSelector(state => state.acesso.id);
  const role = useSelector(state => state.acesso.role);

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleOpen = event => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const navigateCompras = () => {
    history.push('/compras');
    handleClose();
  };

  const navigateProdutos = () => {
    history.push('/produtos');
    handleClose();
  };

  return usuario_id && (
    <>
      <IconButton 
        edge="start" 
        className={classes.menuButton} 
        color="inherit" 
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
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
        <MenuItem 
          onClick={navigateCompras}
        >
          {role === 'cliente' ? 'Minhas Compras' : 'Compras'}
        </MenuItem>
        <MenuItem 
          onClick={navigateProdutos}
        >
          Produtos
        </MenuItem>
      </Menu>
    </>
  );
}
