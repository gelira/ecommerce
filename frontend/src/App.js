import React from 'react';
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

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography 
              variant="h6"
              className={classes.title}
            >Nome da Loja</Typography>
            <IconButton
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
