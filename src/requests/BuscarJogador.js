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
    constructor(props){
        super(props);
        this.state = {
            clubes: {},
            posicoes: {},
            status: {},
            jogadores: [],
            token: props.token,
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

    getPlayersFromAClub(clube_id){
        return (Object.values(this.state.clubes).filter((clube) => { return (clube.id === clube_id) }));
    }

    getPlayersFromAPos(posicao_id){
        return (Object.values(this.state.posicoes).filter( (posi) => { return (posi.id === posicao_id)}));
    }

    getPlayersFromAStat(status_id){
        return (Object.values(this.state.status).filter((stat) => { return (status_id === stat.id)}));
    }


    getPlayerClub(clube_id){
        return (Object.values(this.state.clubes).find((clube) => { return (clube.id === clube_id) }));
    }

    getPlayerPos(posicao_id){
        return (Object.values(this.state.posicoes).find( (posi) => { return (posi.id === posicao_id)}));
    }

    getPlayerStat(status_id){
        return (Object.values(this.state.status).find((stat) => { return (status_id === stat.id)}));
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
                                        clube={this.getPlayerClub(athlt.clube_id)}
                                        pos={this.getPlayerPos(athlt.posicao_id)}
                                        status={this.getPlayerStat(athlt.status_id)}
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