import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <ToolBar>
                    <IconButton edge="start" className="Back" color="inherit" aria-label="menu">
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        Selecione a despesa
                    </Typography>
                </ToolBar>
            </AppBar>
        </div>
    )
}

export default NavBar;