import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import NavBar from './NavBar'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { expenses } from '../ExpensesData'
import { Route, BrowserHistory, Switch } from 'react-router-dom'



import { Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({


});


export default function ExpenseDetail(props) {
    const { match } = props;
    const { params } = match;
    const { ExpenseId } = params;

    const classes = useStyles();
    const { history } = props;
    const expenseData = expenses;
    const [expenseInfo, setExpenseInfo] = useState(expenseData)

    let expenseName = ExpenseId

    const result = expenseInfo.filter(expenseRow => expenseRow.url == expenseName);

    if (result.length > 0) {
        return (
            <>
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
                <Typography variant="h4">{expenseName}</Typography>
                <Paper variant="outlined">
                    <Typography variant="h6">Você pode pedir reembolso dessa despesa</Typography>

                </Paper>
                <Typography variant="body">
                    {result[0].description}
                </Typography>
                <br />
                <Button variant="contained" color="primary">Pedir reembolso dessa despesa</Button>
            </>
        );
    }
    else {
        return (
            <>
                <NavBar> </NavBar>
                <Typography variant="h4">{expenseName}</Typography>
                <Paper variant="outlined">
                    <Typography variant="h6">Despesa não existente</Typography>

                </Paper>
            </>
        );
    }


}