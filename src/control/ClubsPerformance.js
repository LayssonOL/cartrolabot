import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton, CardText } from "material-ui";

class ClubsPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rodada_atual: null,
        hist_partidas: [{rodada: null, partidas: []}]
    };
  }
  
  getPartidas(rodada){
    axios
    .get("https://api.cartolafc.globo.com/partidas/"+rodada)
    .then(res => {
      this.setState({
        hist_partidas: this.state.hist_partidas.push({rodada: rodada, partidas: res.data.partidas})
      });
      // console.log(this.state.partidas)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
  }

  getRodadaAtual(){
    axios
    .get("https://api.cartolafc.globo.com/mercado/status")
    .then(res => {
      this.setState({
        rodada_atual: res.data.rodada_atual
      });
    //   console.log(res)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
  }

  getHistPartidas(){
      var rodada_atual = 0;
      this.getRodadaAtual().then(
          (res) => {
            rodada_atual = res.data.rodada;
            for (let i = this.state.rodada_atual; i > 0; i--) {
                this.getPartidas(i);
            }
          }
      );
  }

  render() {
    return (
      <div className='container'>
          <Card >
              <CardHeader
                  title="Histórico de Partidas"
                  subtitle=""
                  actAsExpander={true}
              />
              <CardActions>
                  <RaisedButton label='Partidas' primary={true} onClick={this.handleClick = this.getHistPartidas.bind(this)}/>
              </CardActions>
          </Card>
      </div>
    )
  }
}
export default ClubsPerformance;
