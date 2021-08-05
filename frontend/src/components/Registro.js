import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  TextField, 
  Typography 
} from '@material-ui/core';

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

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Registre-se!
      </Typography>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          id="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Registrar e Entrar
        </Button>
      </form>
    </div>
  );
}
