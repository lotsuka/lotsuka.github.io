import React from 'react';
import NavBar from './NavBar'
import FolderList from './List'
import Autocomplete from './Autocomplete'
import Grid from '@material-ui/core/Grid'
import { Typography, makeStyles } from '@material-ui/core';


const Home = () => {
    const style = {
        padding: '0 2em'
      };

    return (
        <div className="App">
            <Grid container justify="center" spacing={4}>
                <Grid item xs={12}>
                    <NavBar></NavBar>
                </Grid>
                <Grid item md={6} sm={12}  style={style}>
                    <Typography variant="h6">Veja se pode pedir reembolso de uma despesa</Typography>

                    <Autocomplete></Autocomplete>

                    <FolderList></FolderList>
                </Grid>
            </Grid>
        </div>

    )
}

export default Home;
