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
import { Collapse } from '@material-ui/core';
import Typography from '@material-ui/core/styles';


const styles = {
    filter_button: {
        float: 'right',
    }
}

class BuscarJogador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ia: new IAlgorithms(),
            clubes: {},
            posicoes: {},
            status: {},
            jogadores: [],
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
                console.log(this.state.status);
                console.log(this.state.clubes);
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
                <Card>
                    <CardHeader
                        title="Buscar Jogadores"
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
                            <PlayersList jogadores={this.state.ia.getBestDefenders(
                                                    this.state.ia.getBestAppreciation(
                                                    this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 1, 10)))}
                                clubes={this.state.clubes}
                                posicoes={this.state.posicoes}
                                status={this.state.status}/>
                            {/* <div className='row'>
                                <div className='col-sm'>
                                    <PlayersList jogadores={this.state.ia.getBestDefenders(
                                        this.state.ia.getBestAppreciation(
                                            this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 1, 10)))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status} />
                                </div>
                                <div className='col-sm'>
                                    <PlayersList jogadores={this.state.ia.getBestDefenders(
                                        this.state.ia.getBestAppreciation(
                                            this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 2, 10)))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status} />
                                </div>
                                <div className='col-sm'>
                                    <PlayersList jogadores={this.state.ia.getBestDefenders(
                                        this.state.ia.getBestAppreciation(
                                            this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 3, 10)))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm'>
                                    <PlayersList jogadores={this.state.ia.getBestAttackers(
                                        this.state.ia.getBestAppreciation(
                                            this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 4, 10)))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status} />
                                </div>
                                <div className='col-sm'>
                                    <PlayersList jogadores={this.state.ia.getBestAttackers(
                                        this.state.ia.getBestAppreciation(
                                            this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 5, 10)))}
                                        clubes={this.state.clubes} posicoes={this.state.posicoes}
                                        status={this.state.status} />
                                </div>
                                <div className='col-sm'>
                                    <PlayersList jogadores={this.state.ia.getBestAppreciation(
                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 6, 10))}
                                        clubes={this.state.clubes}
                                        posicoes={this.state.posicoes}
                                        status={this.state.status} />
                                </div>
                            </div> */}

                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(BuscarJogador);