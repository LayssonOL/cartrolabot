import React, { Component, Fragment } from "react";
import { withStyles, Grid, Paper, Typography } from "@material-ui/core";

const styles = {
    paper:{
        width: '100%',
        height: '3%',
    },
    gridContainer:{
        position: 'relative',
        top: '25%',
        width: '100%',
        height: 'auto',
    },
    text:{
        position: 'relative',
        align: 'center',
        fontWeight: 'bold',
        height: 'auto',
    },
}

class PanelMyTeam extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    render(){
        const { classes } = this.props
        return (
            <Fragment>
                <Paper className={classes.paper}>
                    <Grid className={classes.gridContainer} container spacing={0}>
                        <Grid item xs={2}>
                            <Typography className={classes.text} variant='title' align='center'>
                                Time
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.text} variant='title' align='center'>
                                Jogador
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.text} variant='title' align='center'>
                                Última
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.text} variant='title' align='center'>
                                Média
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.text} variant='title' align='center'>
                                Preço
                            </Typography>
                        <Grid item xs={2}>
                            <Typography variant='title' align='center'>
                                
                            </Typography>
                        </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>
            // <div className="columns cartola-time__escalacao-header">
            //     <div className="row large-collapse">
            //         <div className="large-2 large-offset-3 column cartola-mercado-lista-header__titulo text__center">time</div>
            //         <div className="large-6 column cartola-mercado-lista-header__titulo--left">jogador</div>
            //         {/* <!-- <div class="large-2 column text__center">status</div> --> */}
            //         <div className="large-2 column text__center">última</div>
            //         <div className="large-2 column text__center">média</div>
            //         <div className="large-2 column text__center">confronto</div>
            //         <div className="large-2 column end text__center">preço</div>
            //     </div>
            // </div>
        )
    }
}

export default withStyles(styles)(PanelMyTeam)