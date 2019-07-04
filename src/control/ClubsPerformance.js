import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

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
    axios.get("proxy/https://api.cartolafc.globo.com/clubes")
    // axios.get("https://api.cartolafc.globo.com/clubes")
      .then((res) => {
        this.setState({ clubes: Object.values(res.data) });
        // console.log(this.state.clubes);
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
        axios.get("proxy/https://api.cartolafc.globo.com/partidas/" + rodada).then(
        // axios.get("https://api.cartolafc.globo.com/partidas/" + rodada).then(
          (res) => {
            resolve({ rodada: rodada, partidas: res.data.partidas })
          }
        ).catch(
          (err) => {
            reject(err);
          }
        );
      }
    );
  }

  componentWillMount() {
    // this.getClubs();
    // this.getHistPartidas();
  }


  // método para capturar a rodada atual
  getRodadaAtual() {
    return new Promise(
      (resolve, reject) => {
        // console.log('Get Rodada Atual')
        axios.get("proxy/https://api.cartolafc.globo.com/mercado/status").then(res => {
        // axios.get("https://api.cartolafc.globo.com/mercado/status").then(res => {
          resolve(res.data.rodada_atual);
          // this.setState({
          //   // recebe a info de em que rodada se encontra
          //   rodada_atual: res.data.rodada_atual
          // });
        }).catch(err => {
          reject(err)
        });
      }
    );
  }

  getHistPartidas() {
    return new Promise(
      (resolve, reject) => {
        // console.log('Get Hist Partidas')
        this.getRodadaAtual().then(
          (rodada_atual) => {
            // console.log('Rodada Atual')
            // console.log(rodada_atual)
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
                // console.log(this.getPartidas(i).then());
                hist_part.push(this.getPartidas(i).then());
              }
            }
            // this.setState({hist_partidas: hist_part});
            // console.log(require('util').inspect(hist_part))
            // console.log(hist_part);
            resolve(Promise.all(hist_part))
          }
        ).catch(
          (err) => {
            reject(err)
          }
        );
      }
    );
  }

  // método para contabilizar vitórias, derrotas e empates como mandante e como visitante para cada clube
  accountTeamsStats(hist_partidas) {
    return new Promise(
      (resolve, reject) => {
        var casa;
        var fora;
        var clubes = [];
        // console.log('ENTROU accountTeamStats')
        // console.log(hist_partidas)
        // console.log('HIST_PARTIDAS')
        // console.log(hist_partidas)

        hist_partidas.map(
          (rodada) => {
            // console.log('RODADA')
            // console.log(rodada)
            if (rodada.partidas)
              rodada.partidas.forEach(
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
            resolve(clubes);
          }
        );
      });
  }

  // método para calcular o rendimento de cada time como mandante e como visitante
  clubsPointsHomeAway(clubes) {
    return new Promise(
      (resolve, reject) => {
        var clubs = [];
        // console.log('CLUBES')
        // console.log(clubes)
        clubes.forEach(
          (clube) => {
            // console.log('CLUBE')
            // console.log(clube)
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
        resolve(clubs);
      }
    )
    // console.log(clubs);
  }

  // avalia quais os melhores clubes para se apostar
  recommendClubByPosition() {
    // var clubes_rend = 0;
    // console.log('Entrou recomendClubByPosition')
    return new Promise(
      (resolve, reject) => {
        var choice = [];
        this.getHistPartidas().then(
          (hist_partidas) => {
            // console.log('Hist_Part')
            // console.log(hist_partidas)
            // console.log(require('util').inspect(hist_partidas))
            this.accountTeamsStats(hist_partidas).then(
              (clubes) => {
                this.clubsPointsHomeAway(clubes).then(
                  (clubes_rend) => {
                    // console.log('Clubes Rend')
                    // console.log(clubes_rend)
                    this.getRodadaAtual().then(
                      (rodada_atual) => {
                        this.getPartidas(rodada_atual).then((rodada) => {
                          // console.log(res.data.partidas)
                          rodada.partidas.forEach(
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
                              // console.log('MANDANTE')
                              // console.log(mandan)
                              // console.log(mandan.home.throughput)
                              // console.log('VISITANTE')
                              // console.log(visit)
                              // console.log(visit.away.throughput)
                              if (mandan.home.throughput >= visit.away.throughput) {
                                choice.push({club_id: mandan.club_id, score: (mandan.home.throughput - visit.away.throughput) });
                                // console.log('ESCOLHIDO');
                                // console.log(mandan);
                              } else {
                                choice.push({ club_id: visit.club_id, score: (visit.away.throughput - mandan.home.throughput) });
                                // console.log('ESCOLHIDO');
                                // console.log(visit);
                              }

                            }
                          );
                          //sempre observar se o resolve é feito quando o objeto a ser retornado está atualizado (IMPORTANTE)
                          resolve(choice)
                        });
                      });
                  })
              })
          }
        )
        // console.log('CHOICE')
        // console.log(choice)

        // resolve(choice);
      })
  }

  orderingChoiceByPosition() {
    return this.recommendClubByPosition().then(
      (choice) => {
        // console.log('DENTRO')
        // console.log(choice)
        //lista tuplas de times com o [id, score]
        var teams = choice.map(
          (team) => {
            return [team.club_id, team.score]
          }
        );
        // console.log(teams)
        //ordena do melhor score para o pior
        teams.sort(
          (first, second) => {
            return second[1] - first[1];
          }
        );
        
        // console.log(teams)
        //ordena o array de objetos de acordo com o array de tuplas
        var choice_ordered = [];
        teams.map(
          (t) => {
            choice.map(choi => {
              if (choi.score === t[1] && !choice_ordered.includes(choi.club_id)) {
                choice_ordered.push(choi.club_id)
              }
            });
          }
        );
        // console.log(choice_ordered)
        return choice_ordered
      })
      
    // console.log(choice_ordered)
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
            <Button variant='raised' color='primary' onClick={this.handleClick = this.accountTeamsStats.bind(this)}>Stats</Button>
            <Button variant='raised' color='primary' onClick={this.handleClick = this.clubsPointsHomeAway.bind(this)}>Rendimento</Button>
            <Button variant='raised' color='primary' onClick={this.handleClick = this.recommendClubByPosition.bind(this)}>Partidas</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
export default ClubsPerformance;
