import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  Grid, 
  Link, 
  TextField, 
  Typography 
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAsync } from '../store/acesso';

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

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = event => {
    event.preventDefault();
    dispatch(loginAsync({ username, password }));
    setUsername('');
    setPassword('');
  };

  const navigateRegistro = () => {
    history.push('/registro');
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          autoFocus
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={login}
        >
          Entrar
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link 
              variant="body2"
              onClick={navigateRegistro}
            >
              Não tem uma conta? Registre-se aqui!
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
