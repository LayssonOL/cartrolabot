import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, Paper, ListItemText } from '@material-ui/core';

const styles = {
    root:{
       width: '100%',
    },
    img: {
        width: "80%",
        height: 'auto',
    },
    escudo:{
        width: '50%',
        height: 'auto',
    },
    grid_container:{
        width: '100%',
        height: 'auto',
    },
    text_ranking:{
        position: 'relative',
        top: '38%',
        fontWeight: 'bold',
    },
}

class MostScaledPlayers extends Component{
    render(){
        const foto = this.props.foto.replace('FORMATO', '140x140');
        const { classes } = this.props
        return(
            <Fragment >
                <Paper className={classes.root}>
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <img className={classes.escudo} src={this.props.esc_clube} alt={this.props.clube} title={this.props.clube}/>
                            <ListItemText
                                primary={   <Typography variant="subheading" align='justify' gutterBottom>
                                                {this.props.clube}
                                            </Typography>
                                }
                                >
                            </ListItemText>
                        </Grid>
                        <Grid item xs={3}>
                            <img  className={ classes.img } src={foto} alt={this.props.apelido} title={this.props.apelido}/>
                        </Grid>

                        <Grid item xs={3}>
                            <ListItemText
                                primary={   <Typography variant="title" align='justify' gutterBottom>
                                                {this.props.apelido}
                                            </Typography>
                                }
                                secondary={ <Typography variant="subheading" align='justify' gutterBottom>
                                                {this.props.pos}
                                            </Typography>
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.text_ranking} variant="title" align='center' gutterBottom>
                                {this.props.rank}º
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>

        )
    }
}
export default withStyles(styles)(MostScaledPlayers);