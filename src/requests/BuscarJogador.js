import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Filters from '../components/Filters';
import PlayersList from '../components/PlayersList';
import IAlgorithms from '../control/IAlgorithms';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ClubsPerformance from '../control/ClubsPerformance';
import PanelMyTeam from '../components/Panel_Jogadores_My_Team';


const styles = {
    filter_button: {
        float: 'right',
    },
    card_layout:{
        position: 'relative',
        width: '100%',
    },
    titles:{
        fontWeight: 'bold',
    },
}

class BuscarJogador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ia: new IAlgorithms(),
            clubes_throughput: new ClubsPerformance(),
            clubes: {},
            posicoes: {},
            status: {},
            jogadores: [],
            rodada_atual: null,
            best_clubs: [],
            token: sessionStorage.getItem('token'),
            expanded: false
        }
    }

    getPlayers() {
        axios.get('https://api.cartolafc.globo.com/atletas/mercado',
            {
                'X-GLB-Token': this.state.token
            }
        )
            .then((res) => {
                this.setState({
                    clubes: res.data.clubes,
                    posicoes: res.data.posicoes,
                    status: res.data.status,
                    jogadores: res.data.atletas
                });
                // console.log(this.state.status);
                // console.log(this.state.clubes);
                // console.log(Object.values(this.state.posicoes));
                // console.log(this.state.jogadores);
            }).catch(err => {
                if (err) {
                    window.alert(err);
                }
            });
        this.setState({
            expanded: !this.state.expanded
        });
    }

    componentDidMount(){
        this.state.clubes_throughput.getRodadaAtual().then(
            (resolve) => {
                this.setState({rodada_atual: resolve})
            }
        )

        this.state.best_clubs = this.state.clubes_throughput.orderingChoiceByPosition().then(
            (resolve) => {
                this.setState({best_clubs: resolve})
            }
        )
    }

    hidePlayers() {
        this.setState({ expanded: false });
    }

    //coleta todos os jogadores de um mesmo clube
    getPlayersFromAClub(jogadores, clube_id) {
        return (jogadores.filter((player) => { return (player.clube.id === clube_id) }));
    }

    //coleta todos os jogadores de uma mesma posicao
    getPlayersFromAPos(jogadores, posicao_id) {
        return (jogadores.filter((player) => { return (player.posicao.id === posicao_id) }));
    }

    //coleta todos os jogadores com um mesmo status(provavel, duvida, nulo,...)
    getPlayersFromAStat(jogadores, status_id) {
        return (jogadores.filter((player) => { return (player.status_id === status_id) }));
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card_layout}>
                    <CardHeader
                        title="Boas Opções"
                        subtitle="Estatísticas de cada Jogador"
                    />
                    <CardActions>
                        <Button variant='raised' color="primary" onClick={this.handleClick = this.getPlayers.bind(this)}>
                            Jogadores
                        </Button>
                        <Button variant='raised' color="primary" onClick={this.handleClick = this.hidePlayers.bind(this)}>
                            Esconder
                        </Button>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto">
                        <CardContent >
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titles} variant='title'>
                                        Goleiros
                                    </Typography>
                                    <PanelMyTeam />
                                    <PlayersList jogadores={this.state.ia.calculatePlayerAllMetricsDefense(
                                        this.state.ia.getBestMeanPlayersByPositionWithoutPrice(this.state.jogadores, 1, 10, this.state.best_clubs, this.state.rodada_atual))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status}
                                        newTeam={this.props.new_team}
                                        addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                                        removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                                         />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titles} variant='title'>
                                        Laterais
                                    </Typography>
                                    <PanelMyTeam />
                                    <PlayersList jogadores={this.state.ia.calculatePlayerAllMetricsDefense(
                                        this.state.ia.getBestMeanPlayersByPositionWithoutPrice(this.state.jogadores, 2, 10, this.state.best_clubs, this.state.rodada_atual))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status}
                                        newTeam={this.props.new_team}
                                        addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                                        removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                                         />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titles} variant='title'>
                                        Zagueiros
                                    </Typography>
                                    <PanelMyTeam />
                                    <PlayersList jogadores={this.state.ia.calculatePlayerAllMetricsDefense(
                                        this.state.ia.getBestMeanPlayersByPositionWithoutPrice(this.state.jogadores, 3, 10, this.state.best_clubs, this.state.rodada_atual))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status}
                                        newTeam={this.props.new_team}
                                        addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                                        removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                                         />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titles} variant='title'>
                                        Meio-Campistas
                                    </Typography>
                                    <PanelMyTeam />
                                    <PlayersList jogadores={this.state.ia.calculatePlayerAllMetricsMidfielders(
                                        this.state.ia.getBestMeanPlayersByPositionWithoutPrice(this.state.jogadores, 4, 10, this.state.best_clubs, this.state.rodada_atual))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status}
                                        newTeam={this.props.new_team}
                                        addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                                        removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                                         />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titles} variant='title'>
                                        Atacantes
                                    </Typography>
                                    <PanelMyTeam />
                                    <PlayersList jogadores={this.state.ia.calculatePlayerAllMetricsAttack(
                                        this.state.ia.getBestMeanPlayersByPositionWithoutPrice(this.state.jogadores, 5, 10, this.state.best_clubs, this.state.rodada_atual))}
                                        clubes={this.state.clubes} posicoes={this.state.posicoes}
                                        status={this.state.status}
                                        newTeam={this.props.new_team}
                                        addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                                        removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                                         />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titles} variant='title'>
                                        Técnicos
                                    </Typography>
                                    <PanelMyTeam />
                                    <PlayersList jogadores={this.state.ia.getBestAppreciation(
                                        this.state.ia.getBestMeanPlayersByPositionWithoutPrice(this.state.jogadores, 6, 10, this.state.best_clubs, this.state.rodada_atual))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status}
                                        newTeam={this.props.new_team}
                                        addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                                        removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                                         />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(BuscarJogador);