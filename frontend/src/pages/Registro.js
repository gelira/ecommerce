import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import { createClienteAsync } from '../store/acesso';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registro() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const create = event => {
    event.preventDefault();
    dispatch(createClienteAsync({ nome, email, senha }));
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Cliente novo? Registre-se agora!
      </Typography>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nome"
          autoFocus
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={create}
        >
          Registrar e Entrar
        </Button>
      </form>
    </div>
  );
}
