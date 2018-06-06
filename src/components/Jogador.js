import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import { withStyles, Paper, Grid, ListItemText } from '@material-ui/core';

const styles = {
    img: {
        maxWidth: "100%",
        height: 'auto',
        position: 'relative',
        bottom: '0%',
    },
    escudo: {
        position: 'relative',
        top: '20%',
        left: '25%',
        width: '33%',
        height: 'auto',
    },
    grid_container: {
        width: '100%',
        height: 'auto',
    },
    text_ranking: {
        position: 'relative',
        top: '38%',
        fontWeight: 'bold',
    },
    paper: {
        width: '100%',
        height: '5%',
    },
    gridContainer: {
        position: 'relative',
        top: '25%',
        maxWidth: '100%',
        height: 'auto',
    },
    data: {
        position: 'relative',
        top: '40%',
        left: '0%',
    },
    jogador_nome: {
        position: 'relative',
        left: '30%',
        fontWeight: 'bold',
    },
    jogador_pos: {
        position: 'relative',
        left: '30%'
    },
    add_button:{
        position: 'relative',
        top: '55%',
        backgroundColor: 'green',
    },
    remove_button:{
        position: 'relative',
        top: '55%',
        backgroundColor: 'red',
    },
    add_icon:{
        color: 'white',
    },
    remove_icon:{
        color: 'white'
    },
    abrv_club:{
        position: 'relative',
        left: '20%',
    },
}

class Jogador extends Component {
    constructor(props){
        super(props)
    }

    // addPlayerToTeam(){
    //     console.log('ADD PLAYER AT JOGADOR')
    //     // console.log(this.props.jog)
    //     this.props.addPlayerToNewTeam(this.props.jog)
    // }
    
    // removePlayerFromTeam(){
    //     console.log('REMOVE PLAYER AT JOGADOR')
    //     // console.log(this.props.jog)
    //     this.props.removePlayerFromNewTeam(this.props.jog)
    // }

    render() {
        var foto = null;
        if (this.props.jog.foto) {
            foto = this.props.jog.foto.replace('FORMATO', '140x140');
        }
        const { classes } = this.props
        // console.log('POSICAO: '+this.props.pos);
        return (

            <Fragment>
                <Paper className={classes.paper}>
                    <Grid className={classes.gridContainer} container spacing={0}>
                        <Grid item xs={2}>
                            <img className={classes.escudo} src={Object.values(this.props.clube.escudos)[0]} alt={this.props.clube.nome} title={this.props.clube.nome} />
                            <ListItemText
                                className={classes.abrv_club}
                                secondary={   <Typography variant="body2" align='justify' gutterBottom>
                                                {this.props.clube.abreviacao}
                                                {/* {this.props.inNewTeam ? 'YES' : 'NO'} */}
                                            </Typography>
                                }
                                >
                            </ListItemText>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <img className={classes.img} src={foto} alt={this.props.jog.apelido} title={this.props.jog.apelido} />
                                </Grid>
                                <Grid item xs={6}>
                                    <ListItemText 
                                        primary={<Typography className={classes.jogador_nome} variant="subheading" align='justify' gutterBottom>
                                            {this.props.jog.apelido}
                                        </Typography>
                                        }
                                        secondary={<Typography className={classes.jogador_pos} variant="subheading" align='justify' gutterBottom>
                                            {this.props.pos.nome}
                                        </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.data} variant='title' align='center'>
                                {this.props.jog.pontos_num}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.data} variant='title' align='center'>
                                {this.props.jog.media_num}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.data} variant='title' align='center'>
                                {this.props.jog.preco_num}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                                {this.props.timeAtual ?
                                    <Typography className={classes.data} variant='title' align='center'>
                                    </Typography>
                                :
                                    <Grid container>
                                        <Grid item xs={6}>
                                           {/* {(this.props.inNewTeam || this.props.inTeam) ? */}
                                            <Button variant="fab" mini aria-label="add" className={classes.add_button}
                                                disabled={this.props.inNewTeam}
                                                onClick={() => {this.props.addPlayerToNewTeam(this.props.jog)}}
                                                >
                                                {/* <AddIcon /> */}
                                                <AddIcon  className={classes.add_icon} />
                                            </Button> 
                                            {/* : */}
                                            {/* null */}
                                           {/* } */}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="fab" mini aria-label="remove" className={classes.remove_button}
                                                disabled={!this.props.inNewTeam}
                                                onClick={() => {this.props.removePlayerFromNewTeam(this.props.jog)}}
                                                >
                                                {/* <ClearIcon /> */}
                                                <RemoveIcon   className={classes.remove_icon} />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            
                            
                        </Grid>
                    </Grid>
                </Paper>
                {/* <Card>
                    <CardHeader
                        title={this.props.jog.apelido}
                        subtitle={this.props.pos.nome}
                        avatar={<Avatar alt={this.props.jog.apelido} src={foto}/>}
                        actAsExpander={true}>
                    </CardHeader> */}
                {/* <CardActions>
                        <Button variant='flat' color='secondary'>Comprar</Button>
                    </CardActions> */}
                {/* <CardContent>
                        <Typography variant="body2">
                            Media = {this.props.jog.media_num}
                        </Typography>
                        <Typography variant="body2">
                            Variacao = {this.props.jog.variacao_num}
                        </Typography>
                        <Typography variant="body2">
                            Media Scout = {this.props.scout_mean}
                        </Typography>
                    </CardContent>
                </Card> */}
            </Fragment>
        )
    }
}
export default withStyles(styles)(Jogador);