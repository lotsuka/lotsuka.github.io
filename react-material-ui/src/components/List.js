import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function FolderList() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem button component={Link} to="/Acordos">

                <ListItemText primary="Acordos, Impostos e Tarifas" secondary="Acordos referente a algum débito anterior do condomínio, impostos ou tarifas." />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <ChevronRight />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/Fundos">
                <ListItemText primary="Fundos" secondary="Fundos para eventual inadimplência, obras no condomínio ou cobrir despesas não previstas. " />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <ChevronRight />
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>
            <Divider />

            <ListItem button component={Link} to="/ExpenseGroup">
                <ListItemText primary="Reformas, individualizações e rateios" secondary="Valores destinados ao pagamento de serviços ou obras para o funcionamento do condomínio" />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <ChevronRight />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Divider />
            <ListItem button component={Link} to="/ExpenseGroup">
                <ListItemText primary="Outras despesas" secondary="Despesas diversas, como deficit orcamentário, bonificação de fim de ano e usos de serviços do consomínio." />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <ChevronRight />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </List>
    );
}