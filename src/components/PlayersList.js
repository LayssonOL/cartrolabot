import React, {Component, Fragment} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Jogador from './Jogador';
import IAlgorithms from '../control/IAlgorithms';
import Typography from '@material-ui/core/Typography';


class PlayersList extends Component{
    constructor(props){
        super(props)
        this.state = {
            team: {},
        }
    }
    
    getPlayerClub(clube_id){
        return (Object.values(this.props.clubes).find((clube) => { return (clube.id === clube_id) }));
    }
    
    getPlayerPos(posicao_id){
        return (Object.values(this.props.posicoes).find( (posi) => { return (posi.id === posicao_id)}));
    }
    
    getPlayerStat(status_id){
        return (Object.values(this.props.status).find((stat) => { return (status_id === stat.id)}));
    }
    
    componentDidMount(){
        console.log(sessionStorage.getItem('newTeam'));
        this.setState({team: sessionStorage.getItem('newTeam')})
    }


    render(){
        var ia = new IAlgorithms();
        // console.log('Clubes')
        // console.log(this.props.clubes)
        // console.log('Posicoes')
        // console.log(this.props.posicoes)
        // console.log('Jogadores')
        // console.log(this.props.jogadores)
        // console.log('Status')
        // console.log(this.props.status)
        // console.log(this.props.jogadores)

        return(
            
            <Fragment>
                <List>
                { this.props.jogadores.map((athlt) => {
                    return(
                        <ListItem key={athlt.atleta_id}>
                            <Jogador 
                                id={athlt.atleta_id}
                                apelido={athlt.apelido} 
                                foto={athlt.foto} 
                                clube={this.getPlayerClub(athlt.clube_id)}
                                pos={this.getPlayerPos(athlt.posicao_id)}
                                status={this.getPlayerStat(athlt.status_id)}
                                media={athlt.media_num}
                                ult={athlt.pontos_num}
                                variacao={athlt.variacao_num}
                                preco={athlt.preco_num}
                                scout_mean={ia.weightedAverageScouts(athlt)}
                                inNewTeam={this.props.newTeam.atletas.includes(athlt.atleta_id)}
                                timeAtual={false}
                            />
                        </ListItem>
                    )})}
                </List>
            </Fragment>
        )
    }
}
export default PlayersList;