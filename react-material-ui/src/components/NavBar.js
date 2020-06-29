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


export default function NavBar (props) {
    const { history } = props;
    const style = {
        background: 'white',
        color: 'black'
      };

    return (
        <div>
            <AppBar position="static" style={style}>
                <ToolBar>
                    <IconButton button edge="start" className="Back" color="inherit" aria-label="menu"  onClick={() => history.back()}>
                        <ArrowBack />
                    </IconButton>

                    
                    <Typography variant="h5" color="inherit">
                        Selecione a despesa
                    </Typography>
                </ToolBar>
            </AppBar>
        </div>
    )
}
