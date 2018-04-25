import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton, List, ListItem } from "material-ui";
import Jogador from "./Jogador";
import BuscarJogador from "../requests/BuscarJogador";
import IAlgorithms from "../control/IAlgorithms";

class MyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ia: new IAlgorithms(),
        authorized: false,
        clubes: [],
        posicoes: [],
        status: [],
        esquemas: [],
        team: {},
        new_team:  { esquema_id: 3, atletas: [], capitao_id: 0},
        jogadores: [],
        token: sessionStorage.getItem('token')
    };
  }

  hideMyTeam(){
      this.setState({
        authorized: false
      });
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

    getPlayers(){
        axios.get('https://api.cartolafc.globo.com/atletas/mercado',
                    {
                        'X-GLB-Token': this.state.token
                    }
                    )
                    .then((res) => {
                        this.setState({
                            jogadores: res.data.atletas
                        });
                        // console.log(this.state.status);
                        // console.log(this.state.clubes);
                        // console.log(Object.values(this.state.posicoes));
                        // console.log(this.state.jogadores);
                    }).catch(err => {
                        if(err){
                        window.alert(err);
                        }
                    });
    }

    getSchemas(){
        axios.get('https://api.cartolafc.globo.com/esquemas',
                    {
                        'X-GLB-Token': this.state.token
                    }
                    )
                    .then((res) => {
                        this.setState({
                            esquemas: res.data
                        });
                        // console.log(this.state.esquemas);
                        // console.log(this.state.status);
                        // console.log(this.state.clubes);
                        // console.log(Object.values(this.state.posicoes));
                        // console.log(this.state.jogadores);
                    }).catch(err => {
                        if(err){
                        window.alert(err);
                        }
                    });
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
        console.log(res)
        this.scaleTeam();
      })
      .catch(err => {
        if (err) {
          console.log(err.response);
        }
      });
  }
    componentWillMount(){
        this.getSchemas();
        this.getPlayers();
    }

    scaleTeam(){
        var custo = this.state.team.patrimonio;
        console.log(this.state.team.patrimonio)
        var count = 0;
        var esquema = this.state.esquemas.find(
            (sch) => {
                return (sch.esquema_id === 3)
            }
        )

        Object.keys(esquema.posicoes).map(
            (key) => {
                if(key === 'ata'){
                    console.log('Atacante')
                    var atacs = this.state.ia.getBestAttackers(
                                this.state.ia.getBestAppreciation(
                                this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 5, 10)));
                    count = esquema.posicoes[key];
                    console.log('Quantos: '+ count)
                    while (count > 0){
                        console.log(count)
                        var jogad = atacs.pop()
                        // console.log(jogad)
                        if(jogad.preco_num <= custo){
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Custo: ' + custo)
                            custo -= jogad.preco_num;
                            this.state.new_team.atletas.push(jogad.atleta_id);
                        }
                        count--;
                    }
                }else if(key === 'gol'){
                    console.log('Goleiro')
                    var goleiros = this.state.ia.getBestDefenders(
                                    this.state.ia.getBestAppreciation(
                                    this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 1, 10)))
                    count = esquema.posicoes[key];
                    console.log('Quantos: '+ count)
                    while (count > 0){
                        console.log(count)
                        var jogad = goleiros.pop()
                        // console.log(jogad)
                        if(jogad.preco_num <= custo){
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Custo: ' + custo)
                            custo -= jogad.preco_num;
                            this.state.new_team.atletas.push(jogad.atleta_id);
                        }
                        count--;
                    }

                }else if(key === 'lat'){
                    console.log('Lateral')
                    var lateras = this.state.ia.getBestDefenders(
                                    this.state.ia.getBestAppreciation(
                                    this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 2, 10)))
                    count = esquema.posicoes[key];
                    console.log('Quantos: '+ count)
                    while (count > 0){
                        console.log(count)
                        var jogad = lateras.pop()
                        // console.log(jogad)
                        if(jogad.preco_num <= custo){
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Custo: ' + custo)
                            custo -= jogad.preco_num;
                            this.state.new_team.atletas.push(jogad.atleta_id);
                        }
                        count--;
                    }

                }else if(key === 'mei'){
                    console.log('Meias')
                    var meias = this.state.ia.getBestAttackers(
                                    this.state.ia.getBestAppreciation(
                                    this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 4, 10)))
                    count = esquema.posicoes[key];
                    console.log('Quantos: '+ count)
                    while (count > 0){
                        console.log(count)
                        var jogad = meias.pop()
                        // console.log(jogad)
                        if(jogad.preco_num <= custo){
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Custo: ' + custo)
                            custo -= jogad.preco_num;
                            this.state.new_team.atletas.push(jogad.atleta_id);
                        }
                        count--;
                    }

                }else if(key === 'tec'){
                    console.log('Técnico')
                    var tecnicos = this.state.ia.getBestAppreciation(
                                    this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 6, 10))
                    count = esquema.posicoes[key];
                    console.log('Quantos: '+ count)
                    while (count > 0){
                        console.log(count)
                        var jogad = tecnicos.pop()
                        // console.log(jogad)
                        if(jogad.preco_num <= custo){
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Custo: ' + custo)
                            custo -= jogad.preco_num;
                            this.state.new_team.atletas.push(jogad.atleta_id);
                        }
                        count--;
                    }
                }else if(key === 'zag'){
                    console.log('Zagueiros')
                    var zagueiros = this.state.ia.getBestDefenders(
                                        this.state.ia.getBestAppreciation(
                                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 3, 10)))
                    count = esquema.posicoes[key];
                    console.log('Quantos: '+ count)
                    while (count > 0){
                        console.log(count)
                        var jogad = zagueiros.pop()
                        // console.log(jogad)
                        if(jogad.preco_num <= custo){
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Custo: ' + custo)
                            custo -= jogad.preco_num;
                            this.state.new_team.atletas.push(jogad.atleta_id);
                        }
                        count--;
                    }
                }
            }
        )
        this.state.new_team.capitao_id = this.state.new_team.atletas[0];
        console.log(this.state.new_team);
    }

  saveTeam(){
    const saveTeamConfig = axios.create(
        {
            baseURL: "https://api.cartolafc.globo.com/auth/time/salvar",
            headers: {
                'X-GLB-Token': this.state.token,
            }
        }
    );
    saveTeamConfig(
            {
                method: 'post',
                url: this.baseURL,
                data: {
                    "payload": this.state.new_team
                },
                config: this.headers
            }
        ).then(res => {
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
                <RaisedButton label='Salvar Time' primary={true} onClick={this.handleClick = this.saveTeam.bind(this)}/>
                <RaisedButton label='Hide' primary={true} onClick={this.handleClick = this.hideMyTeam.bind(this)}/>
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
                        {/* <RaisedButton label='Salvar Time' primary={true} onClick={this.handleClick = this.saveTeam.bind(this)}/> */}
                    </CardActions>
                </Card>
            </div>
        )
      }
  }
}
export default MyTeam;
