import React, { Component, Fragment } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Jogador from "./Jogador";
import IAlgorithms from "../control/IAlgorithms";
import ClubsPerformance from "../control/ClubsPerformance";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles, Grid } from "@material-ui/core";

const styles = {
    card_layout:{
        // position: 'relative',
        // height: '25%',
        // width: '50%',
    },
}

class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ia: new IAlgorithms(),
            clubes_throughput: new ClubsPerformance(),
            authorized: false,
            rodada_atual: 0,
            clubes: [],
            posicoes: [],
            status: [],
            esquemas: [],
            team: {},
            new_team: { esquema: 3, atletas: [], capitao: 0 },
            jogadores: [],
            token: sessionStorage.getItem('token')
        };
    }

    hideMyTeam() {
        this.setState({
            authorized: false
        });
    }

    // method to choose players by club
    getPlayerClub(clube_id) {
        return (Object.values(this.state.clubes).find((clube) => { return (clube.id === clube_id) }));
    }

    // method to choose players by position
    getPlayerPos(posicao_id) {
        return (Object.values(this.state.posicoes).find((posi) => { return (posi.id === posicao_id) }));
    }

    // to choose players by status
    getPlayerStat(status_id) {
        return (Object.values(this.state.status).find((stat) => { return (status_id === stat.id) }));
    }

    // request to get all players from brasilian championship
    getPlayers() {
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
                if (err) {
                    window.alert(err);
                }
            });
    }

    // method to get all squads from the fantasy game
    getSchemas() {
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
                if (err) {
                    window.alert(err);
                }
            });
    }

    // method to get the profile of that user logged
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
                //   console.log(res);
                this.setState({
                    authorized: true,
                    team: res.data,
                    clubes: Object.values(res.data.clubes),
                    posicoes: Object.values(res.data.posicoes),
                    status: Object.values(res.data.status),
                    rodada_atual: res.data.rodada_atual
                })
                // console.log(res)
                this.scaleTeam();
            })
            .catch(err => {
                if (err) {
                    console.log(err.response);
                }
            });
    }
    componentWillMount() {
        // this.state.clubes_throughput.render()
        this.getSchemas();
        this.getPlayers();
    }

    // method to choose a list of goalkeepers
    chooseGoalKeepers(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, max_price) {
        var count = 0;
        var jogad = null;

        console.log('Escolhendo Goleiro')
        // return all goalkeepers that must to play in the next round passing a list of clubs that they must belong
        // and the max price they can costs
        var goleiros = this.state.ia.calculatePlayerAllMetricsDefense(
        // this.state.ia.getBestDefenders(
            // this.state.ia.getBestAppreciation(
                this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 1, 10, best_clubs_to_beg, rodada_atual, max_price))
                goleiros.map(
                    gol => {
                        
                        console.log(gol.apelido +' - '+ this.getPlayerClub(gol.clube_id).nome)
                        
                    }
                );
        // get the quantity of goalkeepers must be selected
        count = esquema.posicoes['gol'];
        // calculate the quantity of goalkeepers still must be choosed minus that 
        // just is in the team to submit
        var jaTem = this.howMuchAthletesByPos(atletas, 1);
        count = count - jaTem;
        console.log('Quantos: ' + count)
        while (count > 0) {
            console.log(count)
            jogad = goleiros.pop()
            console.log(jogad)
            if(jogad !== null && jogad !== undefined){
                if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
                    console.log('Preco: ' + jogad.preco_num)
                    console.log('Patrimonio: ' + patrimonio.valor)
                    patrimonio.valor -= jogad.preco_num;
                    atletas.push(jogad);
                    count--;
                }
            }else{
                this.removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg);
                this.chooseGoalKeepers(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, patrimonio.valor);
                count--;
            }
        }
        // return patrimonio
    }

    chooseCenterDefenders(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, max_price) {
        var count = 0;
        var jogad = null;
        console.log('Escolhendo Zagueiros')
        var zagueiros = this.state.ia.calculatePlayerAllMetricsDefense(
        // this.state.ia.getBestDefenders(
            // this.state.ia.getBestAppreciation(
                this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 3, 10, best_clubs_to_beg, rodada_atual, max_price))
                zagueiros.map(
                    zag => {
                        console.log(zag.apelido +' - '+ this.getPlayerClub(zag.clube_id).nome)
                    }
                );
        
        count = esquema.posicoes['zag'];
        var jaTem = this.howMuchAthletesByPos(atletas, 3);
        count = count - jaTem;
        console.log('Quantos: ' + count)
        while (count > 0) {
            console.log(count)
            jogad = zagueiros.pop()
            console.log(jogad)
            if(jogad !== null && jogad !== undefined){
                if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
                    console.log('Preco: ' + jogad.preco_num)
                    console.log('Patrimonio: ' + patrimonio.valor)
                    patrimonio.valor -= jogad.preco_num;
                    atletas.push(jogad);
                    count--;
                }
            }else{
                this.removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg);
                this.chooseCenterDefenders(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, patrimonio.valor)
                count--;
            }
        }
        // return patrimonio
    }

    chooseSideDefenders(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, max_price) {
        var count = 0;
        var jogad = null;
        console.log('Escolhendo Laterais')
        var laterais = this.state.ia.calculatePlayerAllMetricsDefense(
        // this.state.ia.getBestDefenders(
            // this.state.ia.getBestAppreciation(
                this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 2, 10, best_clubs_to_beg, rodada_atual, patrimonio.valor, max_price))
        
                laterais.map(
                    lat => {
                        console.log(lat.apelido +' - '+ this.getPlayerClub(lat.clube_id).nome)
                    }
                );
        count = esquema.posicoes['lat'];
        var jaTem = this.howMuchAthletesByPos(atletas, 2);
        count = count - jaTem;
        console.log('Quantos: ' + count)
        while (count > 0) {
            console.log(count)
            jogad = laterais.pop()
            console.log(jogad)
            if(jogad !== null && jogad !== undefined){
                if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
                    console.log('Preco: ' + jogad.preco_num)
                    console.log('Patrimonio: ' + patrimonio.valor)
                    patrimonio.valor -= jogad.preco_num;
                    atletas.push(jogad);
                    count--;
                }
            }else{
                this.removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg);
                this.chooseSideDefenders(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, patrimonio.valor);
                count--;
            }
        }
        // return patrimonio
    }

    chooseMidfielders(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, max_price) {
        var count = 0;
        var jogad = null;
        console.log('Escolhendo Meio-Campistas')
        var meias = this.state.ia.calculatePlayerAllMetricsMidfielders(
        // this.state.ia.getBestAttackers(
            // this.state.ia.getBestAppreciation(
                this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 4, 10, best_clubs_to_beg, rodada_atual, patrimonio.valor, max_price))

                meias.map(
                    meia => {
                        console.log(meia.apelido +' - '+ this.getPlayerClub(meia.clube_id).nome)
                    }
                );
        count = esquema.posicoes['mei'];
        var jaTem = this.howMuchAthletesByPos(atletas, 4);
        count = count - jaTem;
        console.log('Quantos: ' + count)
        while (count > 0) {
            console.log(count)
            jogad = meias.pop()
            console.log(jogad)
            if(jogad !== null && jogad !== undefined){
                if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
                    console.log('Preco: ' + jogad.preco_num)
                    console.log('Patrimonio: ' + patrimonio.valor)
                    patrimonio.valor -= jogad.preco_num;
                    atletas.push(jogad);
                    count--;
                }
            }else{
                this.removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg);
                this.chooseMidfielders(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, patrimonio.valor);
                count--;
            }
        }
        // return patrimonio
    }

    chooseAttackers(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, max_price) {
        var count = 0;
        var jogad = null;
        console.log('Escolhendo Atacantes')
        var atacantes = this.state.ia.calculatePlayerAllMetricsAttack(
        // this.state.ia.getBestAttackers(
            // this.state.ia.getBestAppreciation(
                this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 5, 10, best_clubs_to_beg, rodada_atual, max_price))
        // console.log(atacantes)
        atacantes.map(
            ata => {
                console.log(ata.apelido +' - '+ this.getPlayerClub(ata.clube_id).nome)
            }
        );
        count = esquema.posicoes['ata'];
        var jaTem = this.howMuchAthletesByPos(atletas, 5);
        count = count - jaTem;
        console.log('Quantos: ' + count)
        while (count > 0) {
            console.log(count)
            jogad = atacantes.pop()
            console.log(jogad)
            if(jogad !== null && jogad !== undefined){
                if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
                    console.log('Preco: ' + jogad.preco_num)
                    console.log('Patrimonio: ' + patrimonio.valor)
                    patrimonio.valor -= jogad.preco_num;
                    atletas.push(jogad);
                    count--;
                }
            }else{
                this.removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg);
                this.chooseAttackers(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, patrimonio.valor);
                count--;
            }
        }
        // return patrimonio
    }

    chooseManager(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, max_price) {
        var count = 0;
        var jogad = null;

        console.log('Escolhendo Tecnico')
        var tecnicos = this.state.ia.getBestAppreciation(
            this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 6, 10, best_clubs_to_beg, rodada_atual, max_price))

            tecnicos.map(
                tec => {
                    console.log(tec.apelido +' - '+ this.getPlayerClub(tec.clube_id).nome)
                }
            );
        count = esquema.posicoes['tec'];
        var jaTem = this.howMuchAthletesByPos(atletas, 6);
        count = count - jaTem;
        console.log('Quantos: ' + count)
        while (count > 0) {
            console.log(count)
            jogad = tecnicos.pop()
            console.log(jogad)
            if(jogad !== null && jogad !== undefined){
                if (jogad.preco_num <= patrimonio.valor && !atletas.includes(jogad)) {
                    console.log('Preco: ' + jogad.preco_num)
                    console.log('Patrimonio: ' + patrimonio.valor)
                    patrimonio.valor -= jogad.preco_num;
                    atletas.push(jogad);
                    count--;
                }
            }else{
                this.removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg);
                this.chooseManager(esquema, patrimonio, atletas, best_clubs_to_beg, rodada_atual, patrimonio.valor);
                count--;
            }
        }
        // return patrimonio
    }

    // a method to change a expensive player by other more cheaper to mount a complete team
    removeExpensivePlayer(atletas, patrimonio, rodada_atual, best_clubs_to_beg){
        console.log('SUBSTITUINDO JOGADOR:')
        var jogad = null;
        var expen = {preco_num: 0};
        var count = 1;
        atletas.map(
            (atleta) => {
                // console.log(atleta)
                // console.log(expen)
                if(atleta.preco_num > expen.preco_num){
                    console.log('TROCOU')
                    expen = atleta
                }
            }
        );
        console.log('JOGADOR MAIS CARO:')
        console.log(expen)
        patrimonio.valor += expen.preco_num
        //get the index to put a new player
        var indexToPush = atletas.indexOf(expen);
        console.log(atletas)
        console.log('INDEX TO PUSH')
        console.log(indexToPush)

        if(expen.posicao_id === 1){
            //goleiros
            console.log('VAI COLOCAR GOLEIRO')
            var goleiros = this.state.ia.calculatePlayerAllMetricsDefense(
                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 1, 10, best_clubs_to_beg, rodada_atual, expen.preco_num))
                    while(count > 0){
                        jogad = goleiros.pop()
                        console.log(jogad)
                        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Patrimonio: ' + patrimonio.valor)
                            patrimonio.valor -= jogad.preco_num;
                            atletas[indexToPush] = jogad;
                            count--;
                        }
                    }
        }else if(expen.posicao_id === 2){
            //laterais
            console.log('VAI COLOCAR LATERAL')
            var laterais = this.state.ia.calculatePlayerAllMetricsDefense(
                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 2, 10, best_clubs_to_beg, rodada_atual, expen.preco_num))
                    
                    while(count > 0){
                        jogad = laterais.pop()
                        console.log(jogad)
                        console.log("JOGADOR JA ESTA NA LISTA?")
                        console.log(atletas.includes(jogad))
                        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Patrimonio: ' + patrimonio.valor)
                            patrimonio.valor -= jogad.preco_num;
                            atletas[indexToPush] = jogad;
                            count--;
                        }
                    }
        }else if(expen.posicao_id === 3){
            //zagueiros
            console.log('VAI COLOCAR ZAGUEIROS')
            var zagueiros = this.state.ia.calculatePlayerAllMetricsDefense(
                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 3, 10, best_clubs_to_beg, rodada_atual, expen.preco_num))
                    
                    while(count > 0){
                        jogad = zagueiros.pop()
                        console.log(jogad)
                        console.log("JOGADOR JA ESTA NA LISTA?")
                        console.log(atletas.includes(jogad))
                        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Patrimonio: ' + patrimonio.valor)
                            patrimonio.valor -= jogad.preco_num;
                            atletas[indexToPush] = jogad;
                            count--;
                        }
                    }
        }else if(expen.posicao_id === 4){
            //meias
            console.log('VAI COLOCAR MEIAS')
            var meias = this.state.ia.calculatePlayerAllMetricsMidfielders(
                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 4, 10, best_clubs_to_beg, rodada_atual, expen.preco_num))
                    
                    while(count > 0){
                        jogad = meias.pop()
                        console.log(jogad)
                        console.log("JOGADOR JA ESTA NA LISTA?")
                        console.log(atletas.includes(jogad))
                        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Patrimonio: ' + patrimonio.valor)
                            patrimonio.valor -= jogad.preco_num;
                            atletas[indexToPush] = jogad;
                            count--;
                        }
                    }
        }else if(expen.posicao_id === 5){
            //atacantes
            console.log('VAI COLOCAR ATACANTES')
            var atacantes = this.state.ia.calculatePlayerAllMetricsAttack(
                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 5, 10, best_clubs_to_beg, rodada_atual, expen.preco_num))
                    
                    while(count > 0){
                        jogad = atacantes.pop()
                        console.log(jogad)
                        console.log("JOGADOR JA ESTA NA LISTA?")
                        console.log(atletas.includes(jogad))
                        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Patrimonio: ' + patrimonio.valor)
                            patrimonio.valor -= jogad.preco_num;
                            atletas[indexToPush] = jogad;
                            count--;
                        }
                    }
        }else{
            //tecnicos
            console.log('VAI COLOCAR TECNICO')
            var tecnicos = this.state.ia.getBestAppreciation(
                        this.state.ia.getBestMeanPlayersByPosition(this.state.jogadores, 6, 10, best_clubs_to_beg, rodada_atual, expen.preco_num))
                    
                    while(count > 0){
                        jogad = tecnicos.pop()
                        console.log(jogad)
                        if (jogad.preco_num < expen.preco_num && !atletas.includes(jogad)) {
                            console.log('Preco: ' + jogad.preco_num)
                            console.log('Patrimonio: ' + patrimonio.valor)
                            patrimonio.valor -= jogad.preco_num;
                            atletas[indexToPush] = jogad;
                            count--;
                        }
                    }
        }
        console.log('ATLETAS')
        console.log(atletas)
    }



    convertAthletesArray(atletas){
        var attas = [];
        atletas.map(
            (atleta) => {
                attas.push(atleta.atleta_id)
            }
        );
        return attas;
    }

    howMuchAthletesByPos(atletas, pos){
        var count = 0;
        atletas.map(
            (atleta) => {
                if(atleta.posicao_id === pos){
                    count++;
                }
            }
        );
        return count
    }

    scaleTeam() {
        console.log('Inicio Escala Time')
        this.state.clubes_throughput.orderingChoiceByPosition().then(
            best_clubs_to_beg => {
                console.log('Promessa Resolvida')
                console.log(best_clubs_to_beg);
                var atletas = [];
                var esquema = this.state.esquemas.find(
                    (sch) => {
                        return (sch.esquema_id === 3)
                    }
                )
                var patrimonio = {valor: this.state.team.patrimonio};
                var const_max_price = patrimonio.valor;
                console.log(this.state.team.patrimonio)

                this.chooseAttackers(esquema, patrimonio, atletas, best_clubs_to_beg, this.state.rodada_atual, const_max_price);
                this.chooseGoalKeepers(esquema, patrimonio, atletas, best_clubs_to_beg, this.state.rodada_atual, const_max_price);
                this.chooseMidfielders(esquema, patrimonio, atletas, best_clubs_to_beg, this.state.rodada_atual, const_max_price);
                this.chooseCenterDefenders(esquema, patrimonio, atletas, best_clubs_to_beg, this.state.rodada_atual, const_max_price);
                this.chooseSideDefenders(esquema, patrimonio, atletas, best_clubs_to_beg, this.state.rodada_atual, const_max_price);
                this.chooseManager(esquema, patrimonio, atletas, best_clubs_to_beg, this.state.rodada_atual, const_max_price);

                var ordered_ply_captain = this.state.ia.calculatePlayerAllMetricsAttack(atletas);
                console.log('Possíveis Captães')
                console.log(ordered_ply_captain)

                console.log(atletas);
                atletas = this.convertAthletesArray(atletas);

                this.state.new_team.atletas = atletas;
                if(ordered_ply_captain.pop().posicao_id !== 6){
                    this.state.new_team.capitao = ordered_ply_captain.pop().atleta_id;
                }else{
                    this.state.new_team.capitao = ordered_ply_captain.pop().atleta_id;
                }
                console.log(require('util').inspect(this.state.new_team));
            }
        );
        // console.log('Best Begs')
        // console.log(best_clubs_to_beg)
        // console.log(this.state.clubes_throughput.orderingChoiceByPosition(best_clubs_to_beg))
    }

    saveTeam() {
        const saveTeamConfig = axios.create(
            {
                baseURL: "https://api.cartolafc.globo.com/auth/time/salvar",
                headers: {
                    'X-GLB-Token': this.state.token,
                },
                config: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Accept": "application/json, text/javascript",
                }
            }
        );

        saveTeamConfig(
            {
                method: 'post',
                url: this.baseURL,
                data: this.state.new_team,
                // headers: this.config,
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
        const { classes } = this.props
        if (this.state.authorized) {
            return (
                <Fragment>
                    <Button variant='raised' color='primary' onClick={this.handleClick = this.saveTeam.bind(this)}>Salvar Time</Button>
                    <Button variant='raised' color='primary' onClick={this.handleClick = this.hideMyTeam.bind(this)}> Esconder </Button>
                    <h5>Patrimônio</h5>
                    <p>{this.state.team.patrimonio.toFixed(2)}</p>
                    <h5>Pontos</h5>
                    <p>{this.state.team.pontos.toFixed(2)}</p>
                    <h5>Valor do Time</h5>
                    <p>{this.state.team.valor_time.toFixed(2)}</p>
                    <h3>Escalação</h3>
                    <Grid container spacing={8}>
                        {this.state.team.atletas.map((athlt) => {
                            // console.log(athlt);
                            return (
                                <Grid item key={athlt.atleta_id}>
                                    <Jogador
                                        apelido={athlt.apelido}
                                        foto={athlt.foto}
                                        clube={this.getPlayerClub(athlt.clube_id)}
                                        pos={this.getPlayerPos(athlt.posicao_id)}
                                        status={this.getPlayerStat(athlt.status_id)}
                                        media={athlt.media_num}
                                        variacao={athlt.variacao_num}
                                        scout_mean={this.state.ia.weightedAverageScouts(athlt)}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Card>
                        <CardHeader
                            title="Meu Time"
                            subtitle="Vejamos como estamos"
                            actAsExpander={true}
                        />
                        <CardActions>
                            <Button variant='raised' color="primary" onClick={this.handleClick = this.getMyProfile.bind(this)}>
                                Ver Time
                            </Button>
                        </CardActions>
                    </Card>
                </Fragment>
            )
        }
    }
}
export default withStyles(styles)(MyTeam);
