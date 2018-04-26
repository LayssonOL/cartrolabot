import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import axios from 'axios';
import Filters from '../components/Filters';
import PlayersList from '../components/PlayersList';
import IAlgorithms from '../control/IAlgorithms';


const styles = {
    filter_button:{
        float: 'right',
    }       
}

class BuscarJogador extends Component{
    constructor(props){
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

    getPlayers(){
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
                        if(err){
                        window.alert(err);
                        }
                    });
        this.setState({
            expanded: !this.state.expanded
        });
    }

    hidePlayers(){
        this.setState({expanded: false});
    }

    //coleta todos os jogadores de um mesmo clube
    getPlayersFromAClub(jogadores, clube_id){
        return (jogadores.filter((player) => { return (player.clube.id === clube_id) }));
    }
    
    //coleta todos os jogadores de uma mesma posicao
    getPlayersFromAPos(jogadores, posicao_id){
        return (jogadores.filter((player) => { return (player.posicao.id === posicao_id)}));
    }
    
    //coleta todos os jogadores com um mesmo status(provavel, duvida, nulo,...)
    getPlayersFromAStat(jogadores, status_id){
        return (jogadores.filter((player) => { return (player.status_id === status_id)}));
    }

    render(){
        return(
            <div>
                <Card expanded={this.state.expanded}>
                    <CardHeader
                        title="Buscar Jogadores"
                        subtitle="Estatísticas de cada Jogador"
                        actAsExpander={true}
                    />
                    <CardActions>
                        <RaisedButton label='Jogadores' primary={true} onClick={this.handleClick = this.getPlayers.bind(this)}/>
                        <RaisedButton label='Esconder' primary={true} onClick={this.handleClick = this.hidePlayers.bind(this)}/>
                        <Filters style={styles.filter_button}/>
                    </CardActions>
                    <CardText expandable={true}>
                        <div className='row'>
                            <div className='col-sm'>
                                <PlayersList jogadores={this.state.ia.getBestDefenders(
                                                        this.state.ia.getBestAppreciation(
                                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 1, 10)))} 
                                             clubes={this.state.clubes} 
                                             posicoes={this.state.posicoes} 
                                             status={this.state.status}/>
                            </div>
                            <div className='col-sm'>
                                <PlayersList jogadores={this.state.ia.getBestDefenders(
                                                        this.state.ia.getBestAppreciation(
                                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 2, 10)))} 
                                             clubes={this.state.clubes} 
                                             posicoes={this.state.posicoes} 
                                             status={this.state.status}/>
                            </div>
                            <div className='col-sm'>
                                <PlayersList jogadores={this.state.ia.getBestDefenders(
                                                        this.state.ia.getBestAppreciation(
                                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 3, 10)))} 
                                             clubes={this.state.clubes} 
                                             posicoes={this.state.posicoes} 
                                             status={this.state.status}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm'>
                                <PlayersList jogadores={this.state.ia.getBestAttackers(
                                                        this.state.ia.getBestAppreciation(
                                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 4, 10)))} 
                                             clubes={this.state.clubes} 
                                             posicoes={this.state.posicoes} 
                                             status={this.state.status}/>
                            </div>
                            <div className='col-sm'>
                                <PlayersList jogadores={this.state.ia.getBestAttackers(
                                                        this.state.ia.getBestAppreciation(
                                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 5, 10)))} 
                                             clubes={this.state.clubes} posicoes={this.state.posicoes} 
                                             status={this.state.status}/>
                            </div>
                            <div className='col-sm'>
                                <PlayersList jogadores={this.state.ia.getBestAppreciation(
                                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 6, 10))} 
                                             clubes={this.state.clubes} 
                                             posicoes={this.state.posicoes} 
                                             status={this.state.status}/>
                            </div>
                        </div>
                        
                    </CardText>
                </Card>
            </div>
        )
    }
}
export default BuscarJogador;