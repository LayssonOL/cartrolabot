import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, Paper } from '@material-ui/core';

const styles = {
    root:{
        flexGrow: 1,
    },
}

class MostScaledPlayers extends Component{
    render(){
        const foto = this.props.foto.replace('FORMATO', '140x140');
        const { classes } = this.props
        return(
            <Fragment classeName={classes.root}>
                <Paper>
                    <Grid container spacing={8} direction='row'>
                        <Grid item >
                            <img src={this.props.esc_clube} alt={this.props.clube} title={this.props.clube}/>
                            <Typography variant="subheading" justify='center'>
                                {this.props.clube}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <figure>
                                <img src={foto} alt={this.props.apelido} title={this.props.apelido}/>
                            </figure>
                            <Typography variant="title">
                                {this.props.apelido}
                            </Typography>
                            <Typography variant="subheading">
                                {this.props.pos}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="title">
                                {this.props.rank}º
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                {/* <article className='row'>
                    <div className='col'>
                        <div className='row justify-content-center'>
                            <img src={this.props.esc_clube} alt={this.props.clube} title={this.props.clube}/>
                        </div>
                        <div className='row justify-content-center'>
                            <span>{this.props.clube}</span>
                        </div>
                    </div>

                    <figure className='col'>
                        <img src={foto} alt={this.props.apelido} title={this.props.apelido}/>
                    </figure>

                    <header className='col'>
                        <div>
                            <h4>{this.props.apelido}</h4>
                            <span>{this.props.pos}</span>
                        </div>
                    </header>
                    <strong className='col'><h3>{this.props.rank}º</h3></strong>
                </article> */}
            </Fragment>

        )
    }
}
export default withStyles(styles)(MostScaledPlayers);