import React, { useState } from 'react'
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

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack';




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));




export default function Fundos(props) {
    const classes = useStyles();
    const { history } = props;
    const expenseData = expenses;
    const [expenseInfo, setExpenseInfo] = useState(expenseData)

    function showExpense(expense) {
        console.dir(expense.name);


        return (
            <>
                <ListItem button component={Link} to={`/${expense.url}`} >

                    <ListItemText primary={expense.name} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Go to Acordo">
                            <ChevronRight />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </>
        );
    }

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <AppBar position="static">
                        <ToolBar>
                            <IconButton button edge="start" className="Back" color="inherit" aria-label="menu" onClick={() => history.push("/")}>
                                <ArrowBack />
                            </IconButton>


                            <Typography variant="h5" color="inherit">
                                Selecione a despesa
                    </Typography>
                        </ToolBar>
                    </AppBar>
                </Grid>
                <Grid item xs={6}>
                    <p>Fundos</p>
                    <p>Fundos para eventual inadimplência, obras no condomínio ou cobrir despesas não previstas.</p>


                    <List className={classes.root}>
                        {expenseInfo.map(expenseNumber => expenseNumber.expenseGroup == "Fundos" ? showExpense(expenseNumber) : undefined)}
                    </List>

                    <Button variant="outlined" color="primary" onClick={() => history.push("/")}>Voltar à lista de reembolsos</Button>

                </Grid>
            </Grid>
        </>
    );
}