import React, {Component} from 'react';
import Club from '../components/Club';
import axios from 'axios'

class BuscarClubes extends Component{
    constructor(){
        super();
        this.state = {
            clubs: []
        }
    }

    getClubs(){
        axios.get("proxy/https://api.cartolafc.globo.com/clubes")
                    .then((res) => {
                        this.setState({
                            clubs: res.data
                        });
                        console.log(this.state.clubs);
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
                    <button className='btn btn-primary' onClick={this.handleClick = this.getClubs.bind(this)}>
                        Clubes
                    </button>
                </div> */}
                <div className="card">
                    <div className="card-header">
                        Buscar Clubes
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Quer mesmo pesquisar time por time?</h5>
                        <p className="card-text">Busque em cada time um bom jogador para compor seu time nessa rodada!</p>
                        <button className='btn btn-primary' onClick={this.handleClick = this.getClubs.bind(this)}>
                            Clubes
                        </button>
                    </div>
                </div>
                <br/>
                <div className='result-list-div'>
                    {/* <h3 id='content_recovered-list'>CLUBES:</h3> */}
                    <div className="row">
                        {/* transforma this.state.clubs em array e manuseia cada item do array*/}
                        { Object.values(this.state.clubs).map((time) => { 
                            //  só imprime se tiver escudo no banco
                            if(Object.values(time.escudos)[2]){ 
                                return(
                                        <div className='col-sm-6' key={time.id}>
                                            {/* Importa um component Club para cada item do array de clubes*/}
                                            <Club time={time.nome} escudo={Object.values(time.escudos)[2]}/> 
                                        </div>
                                )
                            }else{
                                return false;
                            }
                        })}
                    </div>
                    {/* <p id='result-paragraph'></p> */}
                </div>
            </div>
        )
    };
}
export default BuscarClubes;