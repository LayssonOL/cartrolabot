import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
// import AddIcon from '@material-ui/icons/Add';
// import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import { withStyles, Paper, Grid, ListItemText } from '@material-ui/core';

const styles = {
    img: {
        width: "100%",
        height: 'auto',
        position: 'relative',
        top: '4%',
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
        width: '100%',
        height: 'auto',
    },
    data: {
        position: 'relative',
        top: '40%',
        left: '0%',
    },
    jogador_nome: {
        position: 'relative',
        left: '30%'
    },
    button:{
        position: 'relative',
        top: '25%',
    },
}

class Jogador extends Component {
    constructor(props){
        super(props)
    }

    addPlayer(){
        var team = sessionStorage.getItem('newTeam')
        console.log(team)
        if(!team.atletas.includes(this.props.id) && team.atletas.length < 12){
            for (let i = 0; i < team.atletas.length; i++) {
                if(team.atletas[i] === null){
                    team.atletas[i] = this.props.id
                }
            }
            sessionStorage.setItem('newTeam', team)
        }else{
            window.alert('Jogador já consta no time ou time cheio!');
        }
    }

    removePlayer(){
        var team = sessionStorage.getItem('newTeam')
        console.log(team)
        if(team.atletas.includes(this.props.id)){
            team.atletas[team.atletas.indexOf(this.props.id)] = null
            sessionStorage.setItem('newTeam', team)
        }else{
            window.alert('Jogador não consta no time!');
        }
    }


    render() {
        var foto = null;
        if (this.props.foto) {
            foto = this.props.foto.replace('FORMATO', '140x140');
        }
        const { classes } = this.props
        // console.log('POSICAO: '+this.props.pos);
        return (

            <Fragment>
                <Paper className={classes.paper}>
                    <Grid className={classes.gridContainer} container spacing={0}>
                        <Grid item xs={2}>
                            <img className={classes.escudo} src={Object.values(this.props.clube.escudos)[0]} alt={this.props.clube.nome} title={this.props.clube.nome} />
                            {/* <ListItemText
                                primary={   <Typography variant="subheading" align='justify' gutterBottom>
                                                {this.props.clube.nome}
                                            </Typography>
                                }
                                >
                            </ListItemText> */}
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <img className={classes.img} src={foto} alt={this.props.apelido} title={this.props.apelido} />
                                </Grid>
                                <Grid item xs={6}>
                                    <ListItemText className={classes.jogador_nome}
                                        primary={<Typography variant="title" align='justify' gutterBottom>
                                            {this.props.apelido}
                                        </Typography>
                                        }
                                        secondary={<Typography variant="subheading" align='justify' gutterBottom>
                                            {this.props.pos.nome}
                                        </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.data} variant='title' align='center'>
                                {this.props.ult}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.data} variant='title' align='center'>
                                {this.props.media}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.data} variant='title' align='center'>
                                {this.props.preco}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                                {this.props.timeAtual ?
                                    <Typography className={classes.data} variant='title' align='center'>
                                    </Typography>
                                :
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Button variant="fab" color="primary" aria-label="add" className={classes.button}
                                                disabled={this.props.inNewTeam || this.props.inTeam}
                                                // onClick={this.addPlayer(this)}
                                                >
                                                {/* <AddIcon /> */}
                                                A
                                            </Button> 
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="fab" color="secondary" aria-label="remove" className={classes.button}
                                                disabled={!this.props.inNewTeam || !this.props.inNewTeam}
                                                // onClick={this.removePlayer(this)}
                                                >
                                                {/* <ClearIcon /> */}
                                                R
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            
                            
                        </Grid>
                    </Grid>
                </Paper>
                {/* <Card>
                    <CardHeader
                        title={this.props.apelido}
                        subtitle={this.props.pos.nome}
                        avatar={<Avatar alt={this.props.apelido} src={foto}/>}
                        actAsExpander={true}>
                    </CardHeader> */}
                {/* <CardActions>
                        <Button variant='flat' color='secondary'>Comprar</Button>
                    </CardActions> */}
                {/* <CardContent>
                        <Typography variant="body2">
                            Media = {this.props.media}
                        </Typography>
                        <Typography variant="body2">
                            Variacao = {this.props.variacao}
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