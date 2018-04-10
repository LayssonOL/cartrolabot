import React, {Component} from 'react';
import MostScaledPlayers from '.././components/MostScaledPlayers';
import axios from 'axios'

class BuscarJogMaisEscalados extends Component{
    constructor(){
        super();
        this.state = {
            jogs: []
        }
    }

    getJogMaisEscalados(){
        axios.get('https://api.cartolafc.globo.com/mercado/destaques')
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
    }

    render(){
        return(
            <div>
                {/* <div className='button__container'>
                    <button className='btn btn-primary' onClick={this.handleClick = this.getJogMaisEscalados.bind(this)}>
                        Jogadores Destaque
                    </button>
                </div> */}
                <div className="card">
                    <div className="card-header">
                        Buscar Jogadores mais Escalados
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Um jeito fácil de montar seu time!</h5>
                        <p className="card-text">Aproveite as dicas dos outros jogadores que já escalaram seus times e monte um time com os jogadores mais escalados.</p>
                        <button className='btn btn-primary' onClick={this.handleClick = this.getJogMaisEscalados.bind(this)}>
                            Jogadores Destaque
                        </button>
                    </div>
                </div>
                <br/>
                <div className='result-list-div'>
                    {/* <h3 id='content_recovered-list'>Mais Escalados:</h3> */}
                    <div className="list-group">
                        
                        { this.state.jogs.map((player) => {
                        
                        return( 
                            <div className='list-group-item' key={player.Atleta.atleta_id}>
                                <MostScaledPlayers clube={player.clube} esc_clube={player.escudo_clube} apelido={player.Atleta.apelido} foto={player.Atleta.foto}/>
                            </div>
                        )})}
                    </div>
                    {/* <p id='result-paragraph'></p> */}
                </div>
            </div>
        )
    };
}
export default BuscarJogMaisEscalados;