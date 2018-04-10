import React, {Component} from 'react';
import Button from 'react-toolbox/lib/button/Button'
import Jogador from '.././components/Jogador'
import axios from 'axios';

class BuscarJogador extends Component{
    constructor(){
        super();
        this.state = {
            clubes: {},
            posicoes: {},
            status: {},
            jogadores: []
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
                        console.log(this.state.posicoes);
                        console.log(this.state.jogadores);
                    }).catch(err => {
                        if(err){
                        window.alert(err);
                        }
                    });
    }

    getPlayerClub(clube_id){
        Object.values(this.state.clubes).map((clube) => {
            if(clube.id === clube_id){
                return clube
            }else{
                return null
            }
        }
        );
    }

    getPlayerPos(posicao_id){
        Object.values(this.state.posicoes).map((pos) => {
            if(posicao_id === pos.id){
                return pos
            }else{
                return null
            }
        }
        );
    }

    getPlayerStat(status_id){
        Object.values(this.state.status).map((stat) => {
            if(status_id === stat.id){
                return stat
            }else{
                return null
            }
        }
        );
    }

    render(){
        return(
            <div>
                <div className="card">
                    <div className="card-header">
                        Buscar Jogadores
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Estatísticas de cada Jogador</h5>
                        <p className="card-text">Avalie quais jogadores merecem estar em seu time para essa rodada!</p>
                        <Button label='Jogadores' className='btn btn-primary' onClick={this.handleClick = this.getPlayers.bind(this)} raised/>
                    </div>
                </div>
                <br/>
                <div className='result-list-div'>
                    {/* <h3 id='content_recovered-list'>CLUBES:</h3> */}
                    <div className="row">
                        { this.state.jogadores.map((athlt) => { 
                            return(
                                <div className='col-sm-6' key={athlt.id}>
                                    {/* Importa um component Club para cada item do array de clubes escudo={Object.values(time.escudos)[2]}*/}
                                    <Jogador apelido={athlt.apelido} foto={athlt.foto}/> 
                                </div>
                            )
                        })}
                    </div>
                    {/* <p id='result-paragraph'></p> */}
                </div>
            </div>
        )
    }
}
export default BuscarJogador;