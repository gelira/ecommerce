import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { createCompraAsync, limparCarrinho } from '../store/comercial';
import CarrinhoItem from '../components/CarrinhoItem';

const useStyles = makeStyles({
  control: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  value: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export default function Carrinho() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const carrinho = useSelector(state => state.comercial.carrinho);
  const valorTotal = useSelector(state => state.comercial.valorTotal);
  const haItens = useSelector(state => state.comercial.quantidadeItens > 0);

  const fecharCompra = async () => {
    await dispatch(createCompraAsync());
    dispatch(limparCarrinho());
    history.push('/produtos');
  };

  return (
    <>
      <h1>Carrinho</h1>
      {haItens ? (
        <>
          {carrinho.map(i => (
            <CarrinhoItem 
            key={i.produto}
            item={i}
            />
          ))}
          <div className={classes.value}>
            <Typography variant="h6">Valor total: R$ {valorTotal.toFixed(2)}</Typography>
          </div>
          <div className={classes.control}>
            <Button
              variant="contained" 
              color="primary" 
              onClick={() => history.push('/produtos')}
            >
              Continuar comprando
            </Button>
            <Button
              variant="contained" 
              color="primary" 
              onClick={fecharCompra}
            >
              Fechar compra
            </Button>
          </div>
        </>
      ) : (
        <Typography variant="h6">
          O carrinho está vazio. <Button color="primary" onClick={() => history.push('/produtos')}>Clique aqui</Button> para continuar comprando.
        </Typography>
      )}
    </>
  );
}
