import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton, List, ListItem } from "material-ui";
import Jogador from "./Jogador";

class MyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
        authorized: false,
        clubes: [],
        posicoes: [],
        status: [],
        team: {},
        token: sessionStorage.getItem('token')
    };
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

  getMyProfile() {
    const getMyTeamConfig = axios.create(
        {
            baseURL: "https://api.cartolafc.globo.com/auth/time",
            headers: {
                'X-GLB-Token': this.state.token,
                // withCredentials: true,
                // id: "Authenticated",
                // timeout: 10000,
                // responseType: 'json',
                // xsrfCookieName: 'XSRF-TOKEN',
                // xsrfHeaderName: 'X-XSRF-TOKEN',
                // validateStatus: (status) => status >= 200 && status < 300,
            }
        }
    );
    getMyTeamConfig(
        {
            method: 'get',
            url: this.baseURL
            // headers: this.headers
        }
      )
      .then(res => {
          console.log(res);
          this.setState({ 
              authorized: true,
              team: res.data,
              clubes: Object.values(res.data.clubes),
              posicoes: Object.values(res.data.posicoes),
              status: Object.values(res.data.status),
        })
      })
      .catch(err => {
        if (err) {
          console.log(err.response);
        }
      });
  }

  saveTeam(){
    axios
    .post("https://api.cartolafc.globo.com/auth/time/salvar",
            {
                'payload': this.state.team
            },
            {
                'X-GLB-Token': this.state.token,
                timeout: 10000,
            }
        )
      .then(res => {
          console.log(res);
      })
      .catch(err => {
        if (err) {
          console.log(err.response);
        }
      });
  }

  render() {
      if(this.state.authorized){
        return(
            <div>
                <h5>Patrimônio</h5>
                <p>{this.state.team.patrimonio.toFixed(2)}</p>
                <h5>Pontos</h5>
                <p>{this.state.team.pontos.toFixed(2)}</p>
                <h5>Valor do Time</h5>
                <p>{this.state.team.valor_time.toFixed(2)}</p>
                <h3>Escalação</h3>
                <List>
                    { this.state.team.atletas.map((athlt) => {
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
            </div>
        )
      }else{
        return(
            <div className='container'>
                <Card >
                    <CardHeader
                        title="Meu Time"
                        subtitle="Vejamos como estamos"
                        actAsExpander={true}
                    />
                    <CardActions>
                        <RaisedButton label='Ver Time' primary={true} onClick={this.handleClick = this.getMyProfile.bind(this)}/>
                        <RaisedButton label='Salvar Time' primary={true} onClick={this.handleClick = this.saveTeam.bind(this)}/>
                    </CardActions>
                </Card>
            </div>
        )
      }
  }
}
export default MyTeam;
