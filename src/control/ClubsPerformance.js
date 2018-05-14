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

  // método para recuperar todos os clubes 
  getClubs() {
    axios.get('https://api.cartolafc.globo.com/clubes')
      .then((res) => {
        this.setState({ clubes: Object.values(res.data) });
        console.log(this.state.clubes);
      }).catch(err => {
        if (err) {
          window.alert(err);
        }
      });
  }

  // método para consultar todas as partidas de cada rodada
  getPartidas(rodada) {
    return new Promise(
      (resolve, reject) => {
        axios.get("https://api.cartolafc.globo.com/partidas/" + rodada).then(
          (res) => {
            resolve(res.data.partidas)
          }
        );
        // reject(axios.get("https://api.cartolafc.globo.com/partidas/"+rodada).catch());
      }
    );
    // axios
    // .get("https://api.cartolafc.globo.com/partidas/"+rodada)
    // .then(res => {
    //     this.state.hist_partidas.push({rodada: rodada, partidas: res.data.partidas})
    //     // console.log('Adicionando partidas:')
    // //     console.log(rodada)
    //     // console.log(res.data)
    // })
    // .catch(err => {
    //   if (err) {
    //     window.alert(err);
    //   }
    // });
  }

  componentWillMount() {
    // this.getClubs();
    this.getHistPartidas();
  }


  // método para capturar a rodada atual
  getRodadaAtual() {

    console.log('Get Rodada Atual')
    return new Promise(
      (resolve, reject) => {
        axios.get("https://api.cartolafc.globo.com/mercado/status").then(res => {
          var rodada = res.data.rodada_atual;
          // this.setState({
          //   // recebe a info de em que rodada se encontra
          //   rodada_atual: res.data.rodada_atual
          // });
          resolve(rodada)
        })
          .catch(err => {
            if (err) {
              window.alert(err);
            }
          });
      }
    );
  }

  getHistPartidas(rodada_atual) {
    return new Promise(
      (resolve, reject) => {
        console.log('Get Hist Partidas')
        this.getRodadaAtual().then(
          (rodada_atual) => {
            // () => {
            var clubes = [];
            var hist_part = [];
            // chama getPartidas para cada rodada passada, excetuando a atual pois a mesma ainda não aconteceu
            for (let i = (rodada_atual - 1); i >= 1; i--) {
              // verifica se a última rodada já foi adicionada na lista de rodadas
              var ult_rod = hist_part.find(
                (obj) => {
                  return obj.rodada === rodada_atual
                }
              );

              if (!ult_rod) {
                this.getPartidas(i).then((partidas) => {
                  clubes = this.accountTeamsStats(partidas, clubes)
                });
              }
            }
            // this.setState({hist_partidas: hist_part});
            resolve(clubes_rend);
            // reject(null);
          }
        );
      }
    );
  }

  // método para contabilizar vitórias, derrotas e empates como mandante e como visitante para cada clube
  accountTeamsStats(partidas, clubes) {
    // return new Promise(
    // (resolve, reject) => {
    var casa;
    var fora;
    // console.log('ENTROU accountTeamStats')
    // console.log(hist_partidas)
    // this.getHistPartidas().then(
    // this.state.hist_partidas.forEach( => {
    // console.log('HIST_PARTIDAS')
    // console.log(hist_partidas)

    // hist_partidas.map(
    //   (rodada) => {
    //     console.log('RODADA')
    //     console.log(rodada)
    if (partidas)
      partidas.forEach(
        (partida) => {
          // console.log('PARTIDA')
          // console.log(partida)
          // se houver objeto com o mesmo id, recupera-o
          casa = clubes.find((club) => { return club.club_id === partida.clube_casa_id });
          // console.log('CASA')
          // console.log(casa)

          // se houver objeto com o mesmo id, recupera-o
          fora = clubes.find((club) => { return club.club_id === partida.clube_visitante_id });
          // console.log('FORA')
          // console.log(fora)

          // se o clube mandante venceu a partida
          if (partida.placar_oficial_mandante > partida.placar_oficial_visitante) {
            if (casa !== undefined & casa !== null) {
              // console.log('CASA GANHOU')
              // console.log(casa)
              // se o objeto existe no array, incrementa um atributo
              casa.home.victory += 1;
            } else {
              // console.log('Adicionando ...')
              // console.log(partida.clube_casa_id)
              // se o objeto não existe no array, adiciona-o
              clubes.push({ club_id: partida.clube_casa_id, home: { victory: 1, defeat: 0, draw: 0 }, away: { victory: 0, defeat: 0, draw: 0 } });
            }

            if (fora !== undefined & fora !== null) {
              // console.log('FORA PERDEU')
              // console.log(fora)
              // se o objeto existe no array, incrementa um atributo
              fora.away.defeat += 1;
            } else {
              // console.log('Adicionando ...')
              // console.log(partida.clube_visitante_id)
              // se o objeto não existe no array, adiciona-o
              clubes.push({ club_id: partida.clube_visitante_id, home: { victory: 0, defeat: 0, draw: 0 }, away: { victory: 0, defeat: 1, draw: 0 } });
            }

            // se os clubes empataram
          } else if (partida.placar_oficial_mandante === partida.placar_oficial_visitante) {
            if (casa !== undefined & casa !== null) {
              // console.log('CASA EMPATOU')
              // console.log(casa)
              // se o objeto existe no array, incrementa um atributo
              casa.home.draw += 1;
            } else {
              // console.log('Adicionando ...')
              // console.log(partida.clube_casa_id)
              // se o objeto não existe no array, adiciona-o
              clubes.push({ club_id: partida.clube_casa_id, home: { victory: 0, defeat: 0, draw: 1 }, away: { victory: 0, defeat: 0, draw: 0 } });
            }

            if (fora !== undefined & fora !== null) {
              // console.log('FORA EMPATOU')
              // console.log(fora)
              // se o objeto existe no array, incrementa um atributo
              fora.away.draw += 1;
            } else {
              // console.log('Adicionando ...')
              // console.log(partida.clube_visitante_id)
              // se o objeto não existe no array, adiciona-o
              clubes.push({ club_id: partida.clube_visitante_id, home: { victory: 0, defeat: 0, draw: 0 }, away: { victory: 0, defeat: 0, draw: 1 } });
            }

            // se o clube visitante venceu a partida
          } else {
            if (casa !== undefined & casa !== null) {
              // console.log('CASA PERDEU')
              // console.log(casa)
              // se o objeto existe no array, incrementa um atributo
              casa.home.defeat += 1;
            } else {
              // console.log('Adicionando ...')
              // console.log(partida.clube_casa_id)
              // se o objeto não existe no array, adiciona-o
              clubes.push({ club_id: partida.clube_casa_id, home: { victory: 0, defeat: 1, draw: 0 }, away: { victory: 0, defeat: 0, draw: 0 } });
            }

            if (fora !== undefined & fora !== null) {
              // console.log('FORA GANHOU')
              // console.log(fora)
              // se o objeto existe no array, incrementa um atributo
              fora.away.victory += 1;
            } else {
              // console.log('Adicionando ...')
              // console.log(partida.clube_visitante_id)
              // se o objeto não existe no array, adiciona-o
              clubes.push({ club_id: partida.clube_visitante_id, home: { victory: 0, defeat: 0, draw: 0 }, away: { victory: 1, defeat: 0, draw: 0 } });
            }
          }
        }
      );
    // }
    // );
    // this.setState({clubes: clubes});
    // resolve(clubes);
    return clubes;
    // reject(null);
    // }
    // );
    // }
    // );
  }

  // método para calcular o rendimento de cada time como mandante e como visitante
  clubsPointsHomeAway(clubes) {
    // return new Promise(
    //   (resolve, reject) => {
    // this.accountTeamsStats().then(
    // console.log(clubes)
    // clubes => {
    console.log('CLUBES')
    console.log(clubes)
    clubes.forEach(
      (clube) => {
        console.log('CLUBE')
        console.log(clube)
        clubs.push(
          {
            club_id: clube.club_id,
            home: {
              matches: (clube.home.victory + clube.home.defeat + clube.home.draw),
              points: (3 * clube.home.victory + clube.home.draw),
              throughput: ((3 * clube.home.victory + clube.home.draw) / (3 * (clube.home.victory + clube.home.defeat + clube.home.draw)))
            },
            away: {
              matches: (clube.away.victory + clube.away.defeat + clube.away.draw),
              points: (3 * clube.away.victory + clube.away.draw),
              throughput: ((3 * clube.away.victory + clube.away.draw) / (3 * (clube.away.victory + clube.away.defeat + clube.away.draw)))
            }
          }
        );
      }
    );
    // }
    // );
    return clubs;
    //   }
    // )
    // console.log(clubs);
  }

  // avalia quais os melhores clubes para se apostar
  recommendClubByPosition() {
    var choice = [];
    // var clubes_rend = 0;
    console.log('Entrou recomendClubByPosition')
    this.getHistPartidas().then(
      (clubes_rend) => {
        console.log('Clubes Rend')
        console.log(clubes_rend)
        this.getRodadaAtual().then(
          (rodada_atual) => {
            this.getPartidas(rodada_atual).then((partidas) => {
              // console.log(res.data.partidas)
              partidas.forEach(
                (partida) => {
                  var mandan = clubes_rend.find(
                    (clube) => {
                      return clube.club_id === partida.clube_casa_id
                    }
                  );

                  var visit = clubes_rend.find(
                    (clube) => {
                      return clube.club_id === partida.clube_visitante_id
                    }
                  );
                  console.log('MANDANTE')
                  console.log(mandan)
                  console.log(mandan.home.throughput)
                  console.log('VISITANTE')
                  console.log(visit)
                  console.log(visit.away.throughput)
                  if (mandan.home.throughput >= visit.away.throughput) {
                    choice.push(mandan.club_id);
                  } else {
                    choice.push(visit.club_id);
                  }

                }
              );
            });
          });
        // })
      }
    )
    // console.log(choice)

    return choice;
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
            <RaisedButton label='Stats' primary={true} onClick={this.handleClick = this.accountTeamsStats.bind(this)} />
            <RaisedButton label='Rendimento' primary={true} onClick={this.handleClick = this.clubsPointsHomeAway.bind(this)} />
            <RaisedButton label='Partidas' primary={true} onClick={this.handleClick = this.recommendClubByPosition.bind(this)} />
          </CardActions>
        </Card>
      </div>
    )
  }
}
export default ClubsPerformance;
