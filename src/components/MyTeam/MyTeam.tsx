import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import axios from "axios";
import * as React from "react";
import { Component, Fragment } from "react";
import ClubsPerformance from "../../control/ClubsPerformance";
import IAlgorithms from "../../control/IAlgorithms";
import SearchPlayer from "../SearchPlayer/SearchPlayer";
import BuscarJogMaisEscalados from "../../components/MostScaledPlayers/MostScaledPlayers";
import requests from "../../services/Requests";
import PanelMyTeam from "../MyTeamPlayersPanel/MyTeamPlayersPanel";
import Jogador from "../Player/Player";
import Team_Info from "../TeamInfo/Team_Info";

const styles = {
  brasao: {
    left: "44%",
    position: "relative",
  },
  buttonSaveTeam: {
    left: "86%",
    position: "relative",
  },
  card_layout: {
    // position: 'relative',
    // height: '25%',
    // width: '50%',
  },
  pageTitle: {
    left: "47%",
    position: "absolute",
  },
  title: {
    fontWeight: "bold",
  },
};

class MyTeam extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      authorized: false,
      clubes: [],
      clubes_throughput: new ClubsPerformance(),
      esquemas: [],
      ia: new IAlgorithms(),
      jogadores: [],
      new_team: {
        atletas: [],
        capitao: {},
        esquema: { esquema_id: 0, posicoes: [] },
      },
      posicoes: [],
      rodada_atual: 0,
      status: [],
      team: {},
      team_to_submit: {},
      token: sessionStorage.getItem("token"),
    };
  }

  public hideMyTeam() {
    this.setState({
      authorized: false,
    });
  }

  public componentDidMount() {
    // this.state.clubes_throughput.render()
    const schemas$ = requests.getSchemas(this.state.token);
    const schemas = schemas$.subscribe({
      complete: () => console.log("Getting schemas complete!"),
      error: (err: any) => window.alert(err),
      next: (data: any) => {
        this.setState({
          esquemas: data,
        });
      }
    });

    const players$ = requests.getPlayers(this.state.token);
    const players = players$.subscribe({
      complete: () => console.log("Getting players complete!"),
      error: (err: any) => window.alert(err),
      next: (data: any) => {
        this.setState({
          jogadores: data,
        });
      }
    });
    // console.log(this.state)

    const profile$ = requests.getMyProfile(this.state.token);
    const profile = profile$.subscribe({
      complete: () => console.log("Getting profile complete!"),
      error: (err: any) => window.alert(err),
      next: (data: any) => {
        this.setState({
          authorized: true,
          clubes: Object.values(data.clubes),
          new_team_view: data.atletas,
          posicoes: Object.values(data.posicoes),
          rodada_atual: data.rodada_atual,
          status: Object.values(data.status),
          team: data,
        });
        // this.shouldComponentUpdate();
        // return Promise.resolve(res);
        console.log("MEUS DADOS");
        console.log(this.state);
        this.scaleTeam();
      }
    });
    // setTimeout(
    //     () => {
    //         this.setState({new_team: sessionStorage.getItem('newTeam')});
    //         console.log(this.state.new_team)
    //     }, 1000
    // )
  }

  public chooseGoalKeepers(
    atletas: any,
    bestClubsToBeg: any,
    esquema: any,
    maxPrice: any,
    rodadaAtual: any,
    patrimonio: any,
  ) {
    let count = 0;
    let jogad = null;

    console.log("Escolhendo Goleiro");
    // return all goalkeepers that must to play in the next round passing a list of clubs that they must belong
    // and the max price they can costs
    const goleiros = this.state.ia.calculatePlayerAllMetricsDefense(
      // this.state.ia.getBestDefenders(
      // this.state.ia.getBestAppreciation(
      this.state.ia.getBestMeanPlayersByPosition(
        this.state.jogadores,
        1,
        10,
        bestClubsToBeg,
        rodadaAtual,
        maxPrice,
      )
    );
    goleiros.map((gol: any) => {
      console.log(gol.apelido + " - " + requests.getPlayerClub(this.state.clubes, gol.clube_id).nome);
    });
    // get the quantity of goalkeepers must be selected
    count = esquema.posicoes.gol;
    // calculate the quantity of goalkeepers still must be choosed minus that
    // just is in the team to submit
    const jaTem = this.howMuchAthletesByPos(atletas, 1);
    count = count - jaTem;
    console.log("Quantos: " + count);
    while (count > 0) {
      console.log(count);
      jogad = goleiros.pop();
      console.log(jogad);
      if (jogad !== null && jogad !== undefined) {
        if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas.push(jogad);
          count--;
        }
      } else {
        this.removeExpensivePlayer(
          atletas,
          patrimonio,
          rodadaAtual,
          bestClubsToBeg,
        );
        this.chooseGoalKeepers(
          esquema,
          patrimonio,
          atletas,
          bestClubsToBeg,
          rodadaAtual,
          patrimonio.valor,
        );
        count--;
      }
    }
    // return patrimonio
  }

  public chooseCenterDefenders(
    esquema: any,
    patrimonio: any,
    atletas: any,
    best_clubs_to_beg: any,
    rodada_atual: any,
    max_price: any,
  ) {
    let count = 0;
    let jogad = null;
    console.log("Escolhendo Zagueiros");
    let zagueiros = this.state.ia.calculatePlayerAllMetricsDefense(
      // this.state.ia.getBestDefenders(
      // this.state.ia.getBestAppreciation(
      this.state.ia.getBestMeanPlayersByPosition(
        this.state.jogadores,
        3,
        10,
        best_clubs_to_beg,
        rodada_atual,
        max_price
      )
    );
    zagueiros.map((zag: any) => {
      console.log(zag.apelido + " - " + requests.getPlayerClub(zag.clube_id).nome);
    });

    count = esquema.posicoes.zag;
    let jaTem = this.howMuchAthletesByPos(atletas, 3);
    count = count - jaTem;
    console.log("Quantos: " + count);
    while (count > 0) {
      console.log(count);
      jogad = zagueiros.pop();
      console.log(jogad);
      if (jogad !== null && jogad !== undefined) {
        if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas.push(jogad);
          count--;
        }
      } else {
        this.removeExpensivePlayer(
          atletas,
          patrimonio,
          rodada_atual,
          best_clubs_to_beg,
        );
        this.chooseCenterDefenders(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          rodada_atual,
          patrimonio.valor,
        );
        count--;
      }
    }
    // return patrimonio
  }

  public chooseSideDefenders(
    esquema,
    patrimonio,
    atletas,
    best_clubs_to_beg,
    rodada_atual,
    max_price
  ) {
    let count = 0;
    let jogad = null;
    console.log("Escolhendo Laterais");
    let laterais = this.state.ia.calculatePlayerAllMetricsDefense(
      // this.state.ia.getBestDefenders(
      // this.state.ia.getBestAppreciation(
      this.state.ia.getBestMeanPlayersByPosition(
        this.state.jogadores,
        2,
        10,
        best_clubs_to_beg,
        rodada_atual,
        patrimonio.valor,
        max_price
      )
    );

    laterais.map(lat => {
      console.log(lat.apelido + " - " + this.getPlayerClub(lat.clube_id).nome);
    });
    count = esquema.posicoes.lat;
    let jaTem = this.howMuchAthletesByPos(atletas, 2);
    count = count - jaTem;
    console.log("Quantos: " + count);
    while (count > 0) {
      console.log(count);
      jogad = laterais.pop();
      console.log(jogad);
      if (jogad !== null && jogad !== undefined) {
        if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas.push(jogad);
          count--;
        }
      } else {
        this.removeExpensivePlayer(
          atletas,
          patrimonio,
          rodada_atual,
          best_clubs_to_beg
        );
        this.chooseSideDefenders(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          rodada_atual,
          patrimonio.valor
        );
        count--;
      }
    }
    // return patrimonio
  }

  public chooseMidfielders(
    esquema,
    patrimonio,
    atletas,
    best_clubs_to_beg,
    rodada_atual,
    max_price
  ) {
    let count = 0;
    let jogad = null;
    console.log("Escolhendo Meio-Campistas");
    let meias = this.state.ia.calculatePlayerAllMetricsMidfielders(
      // this.state.ia.getBestAttackers(
      // this.state.ia.getBestAppreciation(
      this.state.ia.getBestMeanPlayersByPosition(
        this.state.jogadores,
        4,
        10,
        best_clubs_to_beg,
        rodada_atual,
        patrimonio.valor,
        max_price
      )
    );

    meias.map(meia => {
      console.log(
        meia.apelido + " - " + this.getPlayerClub(meia.clube_id).nome
      );
    });
    count = esquema.posicoes.mei;
    let jaTem = this.howMuchAthletesByPos(atletas, 4);
    count = count - jaTem;
    console.log("Quantos: " + count);
    while (count > 0) {
      console.log(count);
      jogad = meias.pop();
      console.log(jogad);
      if (jogad !== null && jogad !== undefined) {
        if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas.push(jogad);
          count--;
        }
      } else {
        this.removeExpensivePlayer(
          atletas,
          patrimonio,
          rodada_atual,
          best_clubs_to_beg
        );
        this.chooseMidfielders(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          rodada_atual,
          patrimonio.valor
        );
        count--;
      }
    }
    // return patrimonio
  }

  public chooseAttackers(
    esquema,
    patrimonio,
    atletas,
    best_clubs_to_beg,
    rodada_atual,
    max_price
  ) {
    let count = 0;
    let jogad = null;
    console.log("Escolhendo Atacantes");
    // console.log(this.state.jogadores)
    // console.log(best_clubs_to_beg)
    // console.log(rodada_atual)
    // console.log(max_price)
    let atacantes = this.state.ia.calculatePlayerAllMetricsAttack(
      // this.state.ia.getBestAttackers(
      // this.state.ia.getBestAppreciation(
      this.state.ia.getBestMeanPlayersByPosition(
        this.state.jogadores,
        5,
        10,
        best_clubs_to_beg,
        rodada_atual,
        max_price
      )
    );
    console.log(atacantes);
    atacantes.map(ata => {
      console.log(ata.apelido + " - " + this.getPlayerClub(ata.clube_id).nome);
    });
    count = esquema.posicoes.ata;
    let jaTem = this.howMuchAthletesByPos(atletas, 5);
    count = count - jaTem;
    console.log("Quantos: " + count);
    while (count > 0) {
      console.log(count);
      jogad = atacantes.pop();
      console.log(jogad);
      if (jogad !== null && jogad !== undefined) {
        if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas.push(jogad);
          count--;
        }
      } else {
        this.removeExpensivePlayer(
          atletas,
          patrimonio,
          rodada_atual,
          best_clubs_to_beg
        );
        this.chooseAttackers(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          rodada_atual,
          patrimonio.valor
        );
        count--;
      }
    }
    // return patrimonio
  }

  public chooseManager(
    esquema,
    patrimonio,
    atletas,
    best_clubs_to_beg,
    rodada_atual,
    max_price
  ) {
    let count = 0;
    let jogad = null;
    console.log("Escolhendo Tecnico");

    let tecnicos = this.state.ia.getBestAppreciation(
      this.state.ia.getBestMeanPlayersByPosition(
        this.state.jogadores,
        6,
        10,
        best_clubs_to_beg,
        rodada_atual,
        max_price
      )
    );
    tecnicos.map(tec => {
      console.log(tec.apelido + " - " + this.getPlayerClub(tec.clube_id).nome);
    });
    count = esquema.posicoes.tec;
    let jaTem = this.howMuchAthletesByPos(atletas, 6);
    count = count - jaTem;
    console.log("Quantos: " + count);
    while (count > 0) {
      console.log(count);
      jogad = tecnicos.pop();
      console.log(jogad);
      if (jogad !== null && jogad !== undefined) {
        if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas.push(jogad);
          count--;
        }
      } else {
        this.removeExpensivePlayer(
          atletas,
          patrimonio,
          rodada_atual,
          best_clubs_to_beg
        );
        this.chooseManager(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          rodada_atual,
          patrimonio.valor
        );
        count--;
      }
    }
    // return patrimonio
  }

  // a method to change a expensive player by other more cheaper to mount a complete team
  public removeExpensivePlayer(
    atletas,
    patrimonio,
    rodada_atual,
    best_clubs_to_beg
  ) {
    console.log("SUBSTITUINDO JOGADOR:");
    let jogad = null;
    let expen = { preco_num: 0 };
    let count = 1;
    // console.log(atletas)
    atletas.map(atleta => {
      // console.log(atleta)
      // console.log(expen)
      if (atleta.preco_num > expen.preco_num) {
        console.log("TROCOU");
        expen = atleta;
      }
    });
    console.log("JOGADOR MAIS CARO:");
    console.log(expen);
    patrimonio.valor += expen.preco_num;
    // get the index to put a new player
    let indexToPush = atletas.indexOf(expen);
    console.log(atletas);
    console.log("INDEX TO PUSH");
    console.log(indexToPush);

    if (expen.posicao_id === 1) {
      // goleiros
      console.log("VAI COLOCAR GOLEIRO");
      let goleiros = this.state.ia.calculatePlayerAllMetricsDefense(
        this.state.ia.getBestMeanPlayersByPosition(
          this.state.jogadores,
          1,
          10,
          best_clubs_to_beg,
          rodada_atual,
          expen.preco_num
        )
      );
      while (count > 0) {
        jogad = goleiros.pop();
        console.log(jogad);
        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas[indexToPush] = jogad;
          count--;
        }
      }
    } else if (expen.posicao_id === 2) {
      // laterais
      console.log("VAI COLOCAR LATERAL");
      let laterais = this.state.ia.calculatePlayerAllMetricsDefense(
        this.state.ia.getBestMeanPlayersByPosition(
          this.state.jogadores,
          2,
          10,
          best_clubs_to_beg,
          rodada_atual,
          expen.preco_num
        )
      );

      while (count > 0) {
        jogad = laterais.pop();
        console.log(jogad);
        console.log("JOGADOR JA ESTA NA LISTA?");
        console.log(atletas.includes(jogad));
        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas[indexToPush] = jogad;
          count--;
        }
      }
    } else if (expen.posicao_id === 3) {
      // zagueiros
      console.log("VAI COLOCAR ZAGUEIROS");
      let zagueiros = this.state.ia.calculatePlayerAllMetricsDefense(
        this.state.ia.getBestMeanPlayersByPosition(
          this.state.jogadores,
          3,
          10,
          best_clubs_to_beg,
          rodada_atual,
          expen.preco_num
        )
      );

      while (count > 0) {
        jogad = zagueiros.pop();
        console.log(jogad);
        console.log("JOGADOR JA ESTA NA LISTA?");
        console.log(atletas.includes(jogad));
        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas[indexToPush] = jogad;
          count--;
        }
      }
    } else if (expen.posicao_id === 4) {
      // meias
      console.log("VAI COLOCAR MEIAS");
      let meias = this.state.ia.calculatePlayerAllMetricsMidfielders(
        this.state.ia.getBestMeanPlayersByPosition(
          this.state.jogadores,
          4,
          10,
          best_clubs_to_beg,
          rodada_atual,
          expen.preco_num
        )
      );

      while (count > 0) {
        jogad = meias.pop();
        console.log(jogad);
        console.log("JOGADOR JA ESTA NA LISTA?");
        console.log(atletas.includes(jogad));
        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas[indexToPush] = jogad;
          count--;
        }
      }
    } else if (expen.posicao_id === 5) {
      // atacantes
      console.log("VAI COLOCAR ATACANTES");
      let atacantes = this.state.ia.calculatePlayerAllMetricsAttack(
        this.state.ia.getBestMeanPlayersByPosition(
          this.state.jogadores,
          5,
          10,
          best_clubs_to_beg,
          rodada_atual,
          expen.preco_num
        )
      );

      while (count > 0) {
        jogad = atacantes.pop();
        console.log(jogad);
        console.log("JOGADOR JA ESTA NA LISTA?");
        console.log(atletas.includes(jogad));
        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas[indexToPush] = jogad;
          count--;
        }
      }
    } else {
      // tecnicos
      console.log("VAI COLOCAR TECNICO");
      let tecnicos = this.state.ia.getBestAppreciation(
        this.state.ia.getBestMeanPlayersByPosition(
          this.state.jogadores,
          6,
          10,
          best_clubs_to_beg,
          rodada_atual,
          expen.preco_num
        )
      );

      while (count > 0) {
        jogad = tecnicos.pop();
        console.log(jogad);
        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
          console.log("Preco: " + jogad.preco_num);
          console.log("Patrimonio: " + patrimonio.valor);
          patrimonio.valor -= jogad.preco_num;
          atletas[indexToPush] = jogad;
          count--;
        }
      }
    }
    console.log("ATLETAS");
    console.log(atletas);
  }

  public convertAthletesArray(atletas) {
    let attas = [];
    atletas.map(atleta => {
      if (atleta !== null && atleta !== undefined) {
        attas.push(atleta.atleta_id);
      } else {
        attas.push(null);
      }
    });
    return attas;
  }

  public howMuchAthletesByPos(atletas, pos) {
    let count = 0;
    atletas.map(atleta => {
      if (atleta.posicao_id === pos) {
        count++;
      }
    });
    return count;
  }

  public thereIsSpace(pos_id) {
    let pos = this.state.posicoes.find(position => {
      return position.id === pos_id;
    });
    let pos_name = pos.abreviacao;
    console.log(pos_name);
    let needed = this.state.new_team.esquema.posicoes[pos_name];
    // retorna a quantidade de jogadores da posicao que existem no time
    let thereis = this.state.new_team.atletas.filter(jogador => {
      if (jogador !== null && jogador !== undefined) {
        return jogador.posicao_id === pos_id;
      }
    }).length;
    console.log(thereis);
    console.log(needed);

    return needed - thereis > 0 ? true : false;
  }

  public qntPlayers() {
    let count = 0;
    this.state.new_team.atletas.map(atleta => {
      if (atleta !== null && atleta !== undefined) {
        count++;
      }
    });
    return count;
  }

  public addPlayer = player => {
    this.state.new_team.atletas.map(atleta => {
      if (atleta) {
      } else {
        this.state.new_team.atletas[
          this.state.new_team.atletas.indexOf(atleta)
        ] = player;
        this.setState({ new_team: this.state.new_team });
        this.configTeamToSubmit(this.state.new_team);
      }
    });
  };

  public addPlayerToNewTeam = newPlayer => {
    console.log("ADICIONAR JOGADOR AO TIME PROPOSTO");
    console.log(newPlayer);
    console.log(this);
    // console.log('QNT DE JOGADORES:')
    // console.log(this.qntPlayers())
    let qntP = this.qntPlayers();
    if (this.state.team.patrimonio >= newPlayer.preco_num) {
      if (qntP < 12) {
        if (this.thereIsSpace(newPlayer.posicao_id)) {
          this.addPlayer(newPlayer);
        } else {
          window.alert("Time com o máximo de jogadores para a posição!");
        }
      } else {
        window.alert("Time já está completo!");
      }
    } else {
      window.alert("Você não possui dinheiro suficiente!");
    }
  };
  // parei na necessidade de aplicar essa funcao de conversao sempre apos a insercao de um jogador no time
  // depois tem que verificar se, no ato de submeter o time o time possui 12 atletas e um capitao definido
  public configTeamToSubmit = team => {
    let ordered_ply_captain = this.state.ia.calculatePlayerAllMetricsAttack(
      team.atletas
    );
    let capita = null;
    // this.state.new_team.atletas = atletas;
    if (ordered_ply_captain.pop().posicao_id !== 6) {
      capita = ordered_ply_captain.pop();
      // capita = ordered_ply_captain.pop().atleta_id;
    } else {
      capita = ordered_ply_captain.pop();
      // capita = ordered_ply_captain.pop().atleta_id;
    }
    let atletas_ids = this.convertAthletesArray(team.atletas);
    this.setState({
      team_to_submit: {
        esquema: team.esquema.esquema_id,
        atletas: atletas_ids,
        capitao: capita.atleta_id
      }
    });
  };

  public removePlayerFromNewTeam = player => {
    console.log("REMOVER JOGADOR DO TIME PROPOSTO");
    console.log(player);
    console.log(this);
    if (this.state.new_team.atletas.includes(player)) {
      this.state.new_team.atletas[
        this.state.new_team.atletas.indexOf(player)
      ] = null;
      this.state.new_team.patrimonio += player.preco_num;
      this.setState({
        new_team: this.state.new_team
      });
      this.configTeamToSubmit(this.state.new_team);
    } else {
      window.alert("Jogador não está escalado!");
    }
  };

  public scaleTeam() {
    console.log("Inicio Escala Time");
    this.state.clubes_throughput
      .orderingChoiceByPosition()
      .then(best_clubs_to_beg => {
        // return this.getPlayers().then(
        //     (players) => {
        // return this.getSchemas().then(
        //     (esquemas) => {
        console.log("Promessa Resolvida");
        console.log(best_clubs_to_beg);
        console.log(this.state.esquemas);
        console.log(this.state.rodada_atual);
        let atletas = [];
        // var esq_id = this.state.team.esquema_id
        let esquema = this.state.esquemas.find(sch => {
          return sch.esquema_id === this.state.team.esquema_id;
        });
        console.log(esquema);
        let patrimonio = { valor: this.state.team.patrimonio };
        let const_max_price = patrimonio.valor;
        console.log(this.state.team.patrimonio);

        this.chooseAttackers(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          this.state.rodada_atual,
          const_max_price
        );
        Goalkeeper.chooseGoalKeepers(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          this.state.rodada_atual,
          const_max_price
        );
        this.chooseMidfielders(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          this.state.rodada_atual,
          const_max_price
        );
        this.chooseCenterDefenders(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          this.state.rodada_atual,
          const_max_price
        );
        this.chooseSideDefenders(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          this.state.rodada_atual,
          const_max_price
        );
        this.chooseManager(
          esquema,
          patrimonio,
          atletas,
          best_clubs_to_beg,
          this.state.rodada_atual,
          const_max_price
        );

        // calculate the general score of all team
        let ordered_ply_captain = this.state.ia.calculatePlayerAllMetricsAttack(
          atletas
        );
        console.log("Possíveis Captães");
        console.log(ordered_ply_captain);

        console.log(atletas);
        // var athelets = atletas;
        // this.setState({new_team: {esquema: esquema, atletas: atletas} })

        let capita = null;
        // this.state.new_team.atletas = atletas;
        if (ordered_ply_captain.pop().posicao_id !== 6) {
          capita = ordered_ply_captain.pop();
          // capita = ordered_ply_captain.pop().atleta_id;
        } else {
          capita = ordered_ply_captain.pop();
          // capita = ordered_ply_captain.pop().atleta_id;
        }
        this.setState({
          new_team: { esquema, atletas, capitao: capita }
        });
        // sessionStorage.setItem('newTeam', { new_team: { esquema: esquema, atletas: atletas, capitao: capita } })
        let atletas_ids = this.convertAthletesArray(atletas);
        this.setState({
          team_to_submit: {
            esquema: esquema.esquema_id,
            atletas: atletas_ids,
            capitao: capita.atleta_id
          }
        });
        // return Promise.resolve({ atletas: athelets, capitao: capita });
        console.log(this.state.new_team);
        // console.log(require('util').inspect(this.state.new_team));
        // return atle
        // })
        // })
      });
    // console.log('Best Begs')
    // console.log(best_clubs_to_beg)
    // console.log(this.state.clubes_throughput.orderingChoiceByPosition(best_clubs_to_beg))
  }

  public saveTeam() {
    const saveTeamConfig = axios.create({
      baseURL: "proxy/https://api.cartolafc.globo.com/auth/time/salvar",
      // baseURL: "https://api.cartolafc.globo.com/auth/time/salvar",
      headers: {
        "X-GLB-Token": this.state.token
      },
      config: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json, text/javascript"
      }
    });

    saveTeamConfig({
      method: "post",
      url: this.baseURL,
      data: this.state.team_to_submit,
      // headers: this.config,
      config: this.headers
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if (err) {
          window.alert(err.response);
        }
      });
  }

  public render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Avatar
              className={classes.brasao}
              src={require("../img/cartrolaBot.png")}
              alt={"CartrolaBot"}
            />
            <Typography
              className={classes.pageTitle}
              variant="title"
              color="inherit"
              align="center"
            >
              CartrolaBot
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container={true} xs={12}>
          <Grid item={true} xs={6}>
            <BuscarJogMaisEscalados className={classes.searchMostScaled} />
          </Grid>
          <Grid item={true} xs={6}>
            <SearchPlayer
              className={classes.secondCard}
              new_team={this.state.new_team}
              addPlayerToNewTeam={this.addPlayerToNewTeam}
              removePlayerFromNewTeam={this.removePlayerFromNewTeam}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <Card>
              {/* <CardHeader
                                title="Meu Time"
                                subtitle="Vejamos como estamos"
                            // actAsExpander={true}
                            /> */}
              {/* <CardActions> */}
              {/* <Button variant='raised' color="primary" onClick={this.handleClick = this.getMyProfile.bind(this)}>
                                        Ver Time
                                    </Button> */}
              {/* </CardActions> */}
              <CardContent>
                {this.state.authorized ? (
                  <Fragment>
                    {/* <Button variant='raised' color='primary' onClick={this.handleClick = this.hideMyTeam.bind(this)}> Esconder </Button> */}
                    <Team_Info
                      patrimonio={this.state.team.patrimonio}
                      valor_time={this.state.team.valor_time}
                      pontos={this.state.team.pontos}
                    />
                    <br />
                    <Grid container={true} spacing={8}>
                      <Grid item={true} xs={6}>
                        <Typography
                          className={classes.title}
                          variant="title"
                          align="left"
                        >
                          Escalação Atual
                        </Typography>
                        <br />
                        <PanelMyTeam className="position: -webkit-sticky, position: sticky" />
                        <List spacing={8}>
                          {this.state.team.atletas.map(athlt => {
                            // console.log(athlt);
                            // console.log(this.state)
                            if (athlt !== null && athlt !== undefined) {
                              // if(this.getPlayerClub(athlt.clube_id) != null && this.getPlayerClub(athlt.clube_id) != undefined ){
                              return (
                                <ListItem key={athlt.atleta_id}>
                                  <Jogador
                                    jog={athlt}
                                    clube={this.getPlayerClub(athlt.clube_id)}
                                    pos={this.getPlayerPos(athlt.posicao_id)}
                                    status={this.getPlayerStat(athlt.status_id)}
                                    scout_mean={this.state.ia.weightedAverageScouts(
                                      athlt
                                    )}
                                    inTeam={this.state.team.atletas.includes(
                                      athlt
                                    )}
                                    inNewTeam={this.state.new_team.atletas.includes(
                                      athlt
                                    )}
                                    timeAtual={true}
                                  />
                                </ListItem>
                              );
                              // }
                            } else {
                              // <EmptyPlayer />
                            }
                          })}
                        </List>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography
                          className={classes.title}
                          variant="title"
                          align="left"
                        >
                          Sugestão para próxima rodada
                        </Typography>
                        <br />
                        <PanelMyTeam />
                        <List spacing={8}>
                          {this.state.new_team.atletas.map(athlt => {
                            // console.log(athlt);
                            if (athlt !== null && athlt !== undefined) {
                              return (
                                <ListItem key={athlt.atleta_id}>
                                  <Jogador
                                    jog={athlt}
                                    clube={this.getPlayerClub(athlt.clube_id)}
                                    pos={this.getPlayerPos(athlt.posicao_id)}
                                    status={this.getPlayerStat(athlt.status_id)}
                                    scout_mean={this.state.ia.weightedAverageScouts(
                                      athlt
                                    )}
                                    inTeam={this.state.team.atletas.includes(
                                      athlt
                                    )}
                                    inNewTeam={this.state.new_team.atletas.includes(
                                      athlt
                                    )}
                                    timeAtual={false}
                                    addPlayerToNewTeam={this.addPlayerToNewTeam}
                                    removePlayerFromNewTeam={
                                      this.removePlayerFromNewTeam
                                    }
                                  />
                                </ListItem>
                              );
                            } else {
                              // <EmptyPlayer />
                            }
                          })}
                        </List>
                        <Button
                          className={classes.buttonSaveTeam}
                          variant="raised"
                          color="primary"
                          onClick={
                            (this.handleClick = this.saveTeam.bind(this))
                          }
                        >
                          Salvar Time
                        </Button>
                      </Grid>
                    </Grid>
                  </Fragment>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default withStyles(styles)(MyTeam);
