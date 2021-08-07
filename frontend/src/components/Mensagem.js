import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';

import { closeMensagem } from '../store/controle';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function Mensagem() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector(state => state.controle.openSnackbar);
  const mensagem = useSelector(state => state.controle.mensagem);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (open && timeoutId === null) {
      const id = setTimeout(() => {
        setTimeoutId(null);
        dispatch(closeMensagem());
      }, 5000);

      clearTimeout(timeoutId);
      setTimeoutId(id);
    }
  }, [open, dispatch, timeoutId]);

  const close = () => {
    clearTimeout(timeoutId);
    setTimeoutId(null);
    dispatch(closeMensagem());
  };

  return (
    <Snackbar 
      open={open}
      message={mensagem}
      action={
        <IconButton
          color="secondary"
          className={classes.close}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
}
