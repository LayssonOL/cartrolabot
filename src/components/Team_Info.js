import React, { Component, Fragment } from 'react'
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';

const styles = {
    paper:{
        borderStyle: 'outset',
    },
    gridContainer:{

    },
    titles:{
        fontWeight: 'bold',
        fontSize: 'x-large',
    },
    valores:{
        fontSize: '1.25rem',
    },
}

class TeamInfo extends Component{
    constructor(props){
        super(props)
        this.style = {

        }
    }

    render(){
        const { classes } = this.props
        return(
            <Fragment>
                <Paper className={classes.paper}>
                    <Grid className={classes.gridContainer} container spacing={0}>
                        <Grid item xs={4}>
                            <Typography className={classes.titles} variant='subheading' align='center'>
                                Patrimônio
                            </Typography>
                            <Typography classesName={classes.valores} variant='body2' align='center'>
                                {this.props.patrimonio.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.titles} variant='subheading' align='center'>
                                Pontos
                            </Typography>
                            <Typography classesName={classes.valores} variant='body2' align='center'>
                                {this.props.pontos.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.titles} variant='subheading' align='center'>
                                Valor do Time
                            </Typography>
                            <Typography classesName={classes.valores} variant='body2' align='center'>
                                {this.props.valor_time.toFixed(2)}
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Typography variant='subheading' align='center'>
                                Escalação
                            </Typography>
                        </Grid> */}
                    </Grid>
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles(styles)(TeamInfo)