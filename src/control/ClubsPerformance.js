import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton } from "material-ui";

class ClubsPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rodada_atual: null,
        hist_partidas: []
    };
  }
  
  getPartidas(rodada){
    axios
    .get("https://api.cartolafc.globo.com/partidas/"+rodada)
    .then(res => {
        this.state.hist_partidas.push({rodada: rodada, partidas: res.data.partidas})
    //     console.log('Adicionando partidas:')
    //     console.log(rodada)
    //     console.log(res.data.partidas)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
  }

  componentWillMount(){
      this.getRodadaAtual();
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
        for (let i = 1; i <= this.state.rodada_atual; i++) {
            this.getPartidas(i);
        }
        console.log(this.state.hist_partidas)
    }

    accountTeamsStats(){
        
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
