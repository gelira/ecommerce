import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  total: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(2)
  },
  removeButton: {
    color: 'red'
  },
  addButton: {
    color: 'green'
  },
  deleteButton: {
    color: 'red',
    paddingRight: theme.spacing(2)
  }
}));

export default function CompraItem(props) {
  const { produto, quantidade, preco } = props.item;
  const { nome, foto } = produto;

  const classes = useStyles();

  return (
    <Card raised className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={foto}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {nome}
          </Typography>
          <Typography variant="subtitle1">
            Preço unitário: R$ {preco.toFixed(2)}
          </Typography>
          <Typography variant="subtitle1">
            Quantidade: {quantidade}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.total}>
        <Typography component="h5" variant="h5">
          Total do item: R$ {(preco * quantidade).toFixed(2)}
        </Typography>
      </div>
    </Card>
  );
}