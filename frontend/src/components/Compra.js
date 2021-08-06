import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch, useSelector } from 'react-redux';

import { updateCompraAsync } from '../store/comercial';
import CompraItem from './CompraItem';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formControl: {
    width: 200
  }
}));

export default function Compra(props) {
  const { id, itens, cliente, total, status, data } = props.compra;
  const { nome, email } = cliente;

  const classes = useStyles();
  const dispatch = useDispatch();

  const dono = useSelector(state => state.acesso.role === 'dono');

  const formatData = () => {
    const dt = new Date(data);
    
    const dia = `${dt.getDate()}`.padStart(2, '0');
    const mes = `${dt.getMonth() + 1}`.padStart(2, '0');
    const ano = `${dt.getFullYear()}`;
    const hora = `${dt.getHours()}`.padStart(2, '0');
    const minutos = `${dt.getMinutes()}`.padStart(2, '0');
    const segundos = `${dt.getSeconds()}`.padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
  };

  const changeStatus = event => {
    dispatch(updateCompraAsync({
      id,
      status: event.target.value
    }));
  };

  const cancelarCompra = () => {
    dispatch(updateCompraAsync({
      id,
      status: 'cancelada'
    }));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {dono && (
          <div className={classes.control}>
            <Typography gutterBottom variant="h6" component="h6">
              Cliente: {nome} ({email})
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="status-compra-label">Status da compra</InputLabel>
              <Select
                labelId="status-compra-label"
                value={status}
                onChange={changeStatus}
              >
                <MenuItem value="nova">Nova</MenuItem>
                <MenuItem value="separacao">Separação</MenuItem>
                <MenuItem value="transito">Em trânsito</MenuItem>
                <MenuItem value="entregue">Entregue</MenuItem>
                <MenuItem value="cancelada">Cancelada</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        <Typography component="h6" variant="h6">
          Data: {formatData()}
        </Typography>
        <Typography gutterBottom component="h6" variant="h6">
          Total da compra: R$ {total.toFixed(2)}
        </Typography>
        {itens.map(item => (
          <CompraItem 
            key={item.produto.id}
            item={item}
          />
        ))}
      </CardContent>
      {!dono && status === 'nova' && (
        <CardActions>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={cancelarCompra}
          >
            Cancelar compra
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
