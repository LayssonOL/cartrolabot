import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MostScaledPlayers from '.././components/MostScaledPlayers';
import axios from 'axios'

class BuscarJogMaisEscalados extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: sessionStorage.getItem('token'),
            jogs: [],
            expanded: false
        }
    }

    getJogMaisEscalados(){
        axios.get('https://api.cartolafc.globo.com/mercado/destaques',
                    {
                        'X-GLB-Token': this.state.token
                    }
                    )
                    .then((res) => {
                        this.setState({
                            jogs: res.data
                        });
                        console.log(this.state.jogs);
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
        this.setState({
            expanded: !this.state.expanded
        });
    }

    hideDestaques(){
        this.setState({expanded: false});
    }

    render(){
        return(
            <div>
                <Card expanded={this.state.expanded}>
                    <CardHeader
                        title="Jogadores Mais Escalados"
                        subtitle="O jeito fácil de montar seu time!"
                        actAsExpander={true}
                    />
                    <CardActions>
                        <RaisedButton label='Destaques' primary={true} onClick={this.handleClick = this.getJogMaisEscalados.bind(this)}/>
                    </CardActions>
                    <CardText expandable={true}>
                        <List>
                            { this.state.jogs.map((player,index) => {
                            return( 
                                <ListItem key={player.Atleta.atleta_id}>
                                    <MostScaledPlayers 
                                        clube={player.clube}
                                        esc_clube={player.escudo_clube} 
                                        apelido={player.Atleta.apelido} 
                                        foto={player.Atleta.foto}
                                        pos={player.posicao}
                                        rank={index+1}/>
                                    <Divider />
                                </ListItem>
                                )})}
                        </List>
                        <RaisedButton label='Hide' primary={true} onClick={this.handleClick = this.hideDestaques.bind(this)}/>
                    </CardText>
                </Card>
            </div>
        )
    };
}
export default BuscarJogMaisEscalados;