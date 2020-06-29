import React from 'react'
import Grid from '@material-ui/core/Grid'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import { expenses } from '../ExpensesData'
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Others(props) {
    const classes = useStyles();
    const { history } = props;
    const expenseData = expenses;
    console.log(expenseData)

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <NavBar></NavBar>
                </Grid>
                <Grid item xs={6}>
                    <p>Confira se a despesa não é de responsabilidade de inquilino e por isso não tem direito a reembolso:</p>
                    <Typography variant="h6">Despesas de pagamento de inquilinos</Typography>
                    <Paper variant="outlined">
                        <Typography variant="h6">Você não tem direito a pedir reembolso das despesas de inquilinos</Typography>
                    </Paper>
                    <p><a href="#">Consumos do imóvel, como água</a></p>
                    <p><a href="#">Cotas condominiais</a></p>
                    <p><a href="#">Correções na fatura</a></p>
                    <p><a href="#">Encargos e honorários, como 13° salário</a></p>
                    <p><a href="#">Fundos para manutenção</a></p>
                    <p><a href="#">Impostos</a></p>
                    <p><a href="#">Uso dos serviços do condomínio</a></p>

                    <Typography variant="h6">Não é uma despesa de inquilino?</Typography>
                    <Button variant="contained" color="primary">Pedir reembolso dessa despesa</Button>
            </Grid>
        </Grid>
        </>
    );
}