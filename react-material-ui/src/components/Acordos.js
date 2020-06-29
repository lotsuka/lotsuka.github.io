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

export default function Acordos(props) {
    const classes = useStyles();
    const { history } = props;

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
                    <p>Acordos, impostos e tarifas</p>
                    <p>Acordos referente a algum débito anterior do condomínio, impostos ou tarifas.</p>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/:Acordo - Débito">

                            <ListItemText primary="Acordo - Débito" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Acordo - Judicial" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>



                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Acordo - Trabalhista" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Despesas - Extras" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Documentação/Laudo" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - Energia / Água" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - IPTU" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>


                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - IPTU - 2016" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - IPTU - 2017" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>


                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - IPTU - 2018" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>


                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - IPTU - Subsolo / Garagem" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>


                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto - IPTU - Terreno" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Imposto sobre serviços de condomínio (ISS)" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>


                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Multa - Infração regulamentar" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <List className={classes.root}>
                        <ListItem button component={Link} to="/Acordos">

                            <ListItemText primary="Taxa municipal - Coleta de Lixo" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Go to Acordo">
                                    <ChevronRight />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>

                    <Button variant="outlined" color="primary" onClick={() => history.push("/")}>Voltar à lista de reembolsos</Button>

                </Grid>
            </Grid>
        </>
    );
}