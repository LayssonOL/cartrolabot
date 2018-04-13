import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Jogador from '.././components/Jogador';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import axios from 'axios';
import Filters from '../components/Filters';

const styles = {
    filter_button:{
        float: 'right',
    }       
}

class BuscarJogador extends Component{
    constructor(){
        super();
        this.state = {
            clubes: {},
            posicoes: {},
            status: {},
            jogadores: [],
            expanded: false
        }
    }

    getPlayers(){
        axios.get('https://api.cartolafc.globo.com/atletas/mercado')
                    .then((res) => {
                        this.setState({
                            clubes: res.data.clubes,
                            posicoes: res.data.posicoes,
                            status: res.data.status,
                            jogadores: res.data.atletas
                        });
                        console.log(this.state.status);
                        console.log(this.state.clubes);
                        console.log(Object.values(this.state.posicoes));
                        console.log(this.state.jogadores);
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

    getPlayerClub(clube_id){
        Object.values(this.state.clubes).map((clube) => {
            if(clube.id === clube_id){
                return clube
            }
        }
        )
    }

    getPlayerPos(posicao_id){
        var posi = {}
            Object.values(this.state.posicoes).map((pos) => {
                if(posicao_id === pos.id){
                    posi = pos
                }
            }
        )
        return posi
    }

    getPlayerStat(status_id){
        Object.values(this.state.status).map((stat) => {
            if(status_id === stat.id){
                return stat
            }
        }
        );
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
                        <List>
                            { this.state.jogadores.map((athlt) => {
                            return( 
                                <ListItem key={athlt.atleta_id}>
                                    <Jogador 
                                        apelido={athlt.apelido} 
                                        foto={athlt.foto} 
                                        // clube={this.getPlayerClub(athlt.clube_id)}
                                        pos={this.getPlayerPos(athlt.posicao_id)}
                                        // status={this.getPlayerStat(athlt.status_id)}
                                        /> 
                                </ListItem>
                                )})}
                        </List>
                    </CardText>
                </Card>
            </div>
        )
    }
}
export default BuscarJogador;