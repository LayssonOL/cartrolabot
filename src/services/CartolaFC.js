import React, {Component} from 'react';
import axios from 'axios'

class CartolaFC extends Component{
    constructor(){
        super();
        this.state = {
            market: {},
            times: [],
            jogadores: []
        }
    }

    getMarketStatus(){
        axios.get(`proxy/https://api.cartolafc.globo.com/mercado/status`)
                    .then((res) => {
                              console.log(res);
                                // this.setState({
                                //   times: res.data
                                // });
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
    }
    getAllPlayers(){
        axios.get(`proxy/https://api.cartolafc.globo.com/atletas/mercado`)
                    .then((res) => {
                              console.log(res);
                                // this.setState({
                                //   times: res.data
                                // });
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
    }
    getMostPickedPlayers(){
        axios.get(`proxy/https://api.cartolafc.globo.com/mercado/destaques`)
                    .then((res) => {
                              console.log(res);
                                // this.setState({
                                //   times: res.data
                                // });
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
    }
    getTeams(){
        axios.get(`proxy/https://api.cartolafc.globo.com/times?q=%5Bnome`)
                    .then((res) => {
                              console.log(res);
                                // this.setState({
                                //   times: res.data
                                // });
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
    }
    getClubs(){
        axios.get(`proxy/https://api.cartolafc.globo.com/clubes`)
                    .then((res) => {
                              console.log(res);
                                // this.setState({
                                //   times: res.data
                                // });
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
    }

    render(){
        return(
            <div>
                <header className='req-page-header'>
                    <h2 className='req-page-header-title'>
                        Buscar por:
                    </h2>
                </header>
                <div className='button__container'>
                    <button className='button' onClick={this.handleClick = this.handleClick.bind(this)}>
                        Search Datas
                    </button>
                </div>
                <br/>
                <div className='result-list-div'>
                    <h3 id='content_recovered-list'>TIMES:</h3>
                        { Object.values(this.state.times).map((time) => {
                        
                        return 
                        <div key={time.id}>
                            {time.nome}
                        </div>
                        }
                        )}
                    {/* <p id='result-paragraph'></p> */}
                </div>
            </div>
        )
    };
}
export default CartolaFC;