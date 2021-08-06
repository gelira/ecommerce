import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';

import { fetchComprasAsync } from '../store/comercial';
import Compra from '../components/Compra';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
});

export default function Compras() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [status, setStatus] = useState('nova');

  const compras = useSelector(state => {
    return state.comercial.compras.filter(c => c.status === status);
  });

  useEffect(() => {
    dispatch(fetchComprasAsync());
  }, [dispatch]);

  const tabChange = (_, newValue) => setStatus(newValue);

  return (
    <>
      <h1>Compras</h1>
      <Paper className={classes.root}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          value={status}
          onChange={tabChange}
          centered
        >
          <Tab value="nova" label="Novas" />
          <Tab value="separacao" label="Separação" />
          <Tab value="transito" label="Em trânsito" />
          <Tab value="entregue" label="Entregues" />
          <Tab value="cancelada" label="Canceladas" />
        </Tabs>
      </Paper>
      {compras.length > 0 ? (
        compras.map(c => <Compra key={c.id} compra={c} />)
      ) : (
        <h1>Nenhuma compra com esse status</h1>
      )}
    </>
  );
}
