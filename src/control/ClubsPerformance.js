import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton } from "material-ui";

class ClubsPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rodada_atual: null,
        hist_partidas: [],
        clubes: [],
    };
  }
  
  getClubs(){
    axios.get('https://api.cartolafc.globo.com/clubes')
                .then((res) => {
                          this.setState({clubes: Object.values(res.data)});
                          // console.log(this.state.clubes);
                          }).catch(err => {
                            if(err){
                              window.alert(err);
                            }
                          });
  }

  getPartidas(rodada){
    axios
    .get("https://api.cartolafc.globo.com/partidas/"+rodada)
    .then(res => {
        this.state.hist_partidas.push({rodada: rodada, partidas: res.data.partidas})
        // console.log('Adicionando partidas:')
    //     console.log(rodada)
        // console.log(res.data)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
  }

    componentWillMount(){
      // this.getClubs();
      this.getRodadaAtual();
    }

    // componentDidMount(){
    //   this.getHistPartidas();
    // }

  getRodadaAtual(){
    axios
    .get("https://api.cartolafc.globo.com/mercado/status")
    .then(res => {
      this.setState({
        // recebe a info de em que rodada se encontra
        rodada_atual: res.data.rodada_atual
      });
      // chama getPartidas para cada rodada passada, excetuando a atual pois a mesma ainda não aconteceu
      for (let i = (this.state.rodada_atual-1); i >= 1; i--) {
        // verifica se a última rodada já foi adicionada na lista de rodadas
        if(!this.state.hist_partidas.find(
          (obj) => {
            return obj.rodada === this.state.rodada_atual 
          }
        )){
          this.getPartidas(i);
        }
      }
    //   console.log(res)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
  }

    // getHistPartidas(){
    //     for (let i = (this.state.rodada_atual-1); i >= 1; i--) {
    //         // verifica se a última rodada já foi adicionada na lista de rodadas
    //         if(!this.state.hist_partidas.find(
    //           (obj) => {
    //             return obj.rodada === this.state.rodada_atual 
    //           }
    //         )){
    //           this.getPartidas(i);
    //         }
    //     }
    //     // this.accountTeamsStats();
    // }

    accountTeamsStats(){
      var casa;
      var fora;
      var clubes = [{club_id: 0, home: {victory: 0, defeat: 0, draw: 0}, away: {victory: 0, defeat: 0, draw: 0}}];
        this.state.hist_partidas.forEach(
          (rodada) => {
            rodada.partidas.forEach(
              (partida) => {
                // console.log('PARTIDA')
                // console.log(partida)
                // se houver objeto com o mesmo id, recupera-o
                casa = clubes.find((club) => {return club.club_id === partida.clube_casa_id});
                // console.log('CASA')
                // console.log(casa)
                
                // se houver objeto com o mesmo id, recupera-o
                fora = clubes.find((club) => {return club.club_id === partida.clube_visitante_id});
                // console.log('FORA')
                // console.log(fora)

                // se o clube mandante venceu a partida
                if(partida.placar_oficial_mandante > partida.placar_oficial_visitante){
                  if(casa !== undefined & casa !== null){
                    // console.log('CASA GANHOU')
                    // console.log(casa)
                    // se o objeto existe no array, incrementa um atributo
                    casa.home.victory += 1;
                  }else{
                    // console.log('Adicionando ...')
                    // console.log(partida.clube_casa_id)
                    // se o objeto não existe no array, adiciona-o
                    clubes.push({club_id: partida.clube_casa_id, home: {victory: 1, defeat: 0, draw: 0}, away: {victory: 0, defeat: 0, draw: 0}});
                  }
                  
                  if(fora !== undefined & fora !== null){
                    // console.log('FORA PERDEU')
                    // console.log(fora)
                    // se o objeto existe no array, incrementa um atributo
                    fora.away.defeat += 1;
                  }else{
                    // console.log('Adicionando ...')
                    // console.log(partida.clube_visitante_id)
                    // se o objeto não existe no array, adiciona-o
                    clubes.push({club_id: partida.clube_visitante_id, home: {victory: 0, defeat: 0, draw: 0}, away: {victory: 0, defeat: 1, draw: 0}});
                  }
                  
                  // se os clubes empataram
                }else if(partida.placar_oficial_mandante === partida.placar_oficial_visitante){
                  if(casa !== undefined & casa !== null){
                    // console.log('CASA EMPATOU')
                    // console.log(casa)
                    // se o objeto existe no array, incrementa um atributo
                    casa.home.draw += 1;
                  }else{
                    // console.log('Adicionando ...')
                    // console.log(partida.clube_casa_id)
                    // se o objeto não existe no array, adiciona-o
                    clubes.push({club_id: partida.clube_casa_id, home: {victory: 0, defeat: 0, draw: 1}, away: {victory: 0, defeat: 0, draw: 0}});
                  }
                  
                  if(fora !== undefined & fora !== null){
                    // console.log('FORA EMPATOU')
                    // console.log(fora)
                    // se o objeto existe no array, incrementa um atributo
                    fora.away.draw += 1;
                  }else{
                    // console.log('Adicionando ...')
                    // console.log(partida.clube_visitante_id)
                    // se o objeto não existe no array, adiciona-o
                    clubes.push({club_id: partida.clube_visitante_id, home: {victory: 0, defeat: 0, draw: 0}, away: {victory: 0, defeat: 0, draw: 1}});
                  }
                  
                  // se o clube visitante venceu a partida
                }else{
                  if(casa !== undefined & casa !== null){
                    // console.log('CASA PERDEU')
                    // console.log(casa)
                    // se o objeto existe no array, incrementa um atributo
                    casa.home.defeat += 1;
                  }else{
                    // console.log('Adicionando ...')
                    // console.log(partida.clube_casa_id)
                    // se o objeto não existe no array, adiciona-o
                    clubes.push({club_id: partida.clube_casa_id, home: {victory: 0, defeat: 1, draw: 0}, away: {victory: 0, defeat: 0, draw: 0}});
                  }
                  
                  if(fora !== undefined & fora !== null){
                    // console.log('FORA GANHOU')
                    // console.log(fora)
                    // se o objeto existe no array, incrementa um atributo
                    fora.away.victory += 1;
                  }else{
                    // console.log('Adicionando ...')
                    // console.log(partida.clube_visitante_id)
                    // se o objeto não existe no array, adiciona-o
                    clubes.push({club_id: partida.clube_visitante_id, home: {victory: 0, defeat: 0, draw: 0}, away: {victory: 1, defeat: 0, draw: 0}});
                  }

                }
              }
            );
          }
        )
        this.setState({clubes: clubes});
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
                  <RaisedButton label='Partidas' primary={true} onClick={this.handleClick = this.accountTeamsStats.bind(this)}/>
              </CardActions>
          </Card>
      </div>
    )
  }
}
export default ClubsPerformance;
