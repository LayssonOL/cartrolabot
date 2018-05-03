import React, { Component } from 'react';

class IAlgorithms extends Component{
    constructor(props){
        super(props);
        this.state = {
            attack_scout: {
                G: 8,
                A: 5,
                FT: 3,
                FD: 1.2,
                FF: 0.8,
                FS: 0.5,
                PP: -4,
                I: -0.5,
                PE: -0.3
            },
            defense_scout:{
                SG: 5,
                DP: 7,
                DD: 3,
                RB: 1.5,
                GC: -5,
                CV: -5,
                CA: -2,
                GS: -2,
                FC: -0.5
            }
        }
    }

    //pega os jogadores com as melhores medias por posicao
    getBestMeanPlayersByPosition(jogadores, pos, qnt){
        //ordenar os goleiros de maior média
        var plrs = jogadores.filter(
            (jog) => {
                return (jog.posicao_id === pos && jog.status_id === 7)
            }
        );

        //ordena o array de goleiros de forma decrescente de acordo com a media de pontos
        var peers = plrs.map(
            (plr) => {
                return [plr.atleta_id, plr.media_num]
            }
        );

        //ordena da pior media para a melhor
        peers.sort(
            (first, second) => {
                return first[1] - second[1];
            }
        );

        //ordena o array de objetos jogador
        var plrs_ordered = [];
        peers.map(
            (p) => {
                plrs.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );

        //retorna os qnt melhores goleiros
        return plrs_ordered.slice(0,(qnt+1));
    }

    //recuperar os jogadores com pior variação, para ganhar mais cartoletas
    getBestAppreciation(jogadores){
        //lista tuplas de jogadores com o [id, variacao]
        var peers = jogadores.map(
            (jog) => {
                if(jog){
                    return [jog.atleta_id, jog.variacao_num]
                }
            }
        );

        //ordena da melhor variacao para a pior
        peers.sort(
            (first, second) => {
                return second[1] - first[1];
            }
        );

        //ordena o array de objetos de acordo com o array de tuplas
        var plrs_ordered = [];
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );

        return plrs_ordered;
    }

    // calcula a média dos scouts do jogador
    weightedAverageScouts(player){
        // console.log(player.scout);
        var valores = 0;
        var pesos = 0;
        //verifica se o objeto scout do objeto jogador não é um objeto vazio
        if(player.scout){
            //varre o objeto scout procurando seus scouts acumulando os pesos e os valores
            //para fazer uma media ponderada
            Object.keys(player.scout).map(
                (chv) => {
                    if(Object.keys(this.state.attack_scout).includes(chv)){
                        valores += (player.scout[chv]*this.state.attack_scout[chv]);
                        pesos += this.state.attack_scout[chv];
                    }else{
                        valores += (player.scout[chv]*this.state.defense_scout[chv]);
                        pesos += this.state.defense_scout[chv];
                    }
                }
            );
            // console.log('# '+ player.apelido)
            // console.log(player.scout)
            // console.log(Object.keys(player.scout))
            // console.log(Object.values(player.scout))
            // console.log(valores)
            // console.log(pesos)
            // console.log((valores/pesos).toFixed(2))
            return (valores/pesos).toFixed(2);
        }else{
            return 0;
        }
    }

    // calcula a média dos scouts do jogador
    weightedAverageAttackScouts(player){
        var valores = 0;
        var pesos = 0;
        //verifica se o objeto scout do objeto jogador não é um objeto vazio
        if(player.scout){
            //varre o objeto scout procurando seus scouts acumulando os pesos e os valores
            //para fazer uma media ponderada
            Object.keys(player.scout).map(
                (chv) => {
                    if(Object.keys(this.state.attack_scout).includes(chv)){
                        valores += (player.scout[chv]*this.state.attack_scout[chv]);
                        pesos += this.state.attack_scout[chv];
                    }
                }
            );
            // console.log('# '+ player.apelido)
            // console.log(player.scout)
            // console.log(Object.keys(player.scout))
            // console.log(Object.values(player.scout))
            // console.log(valores)
            // console.log(pesos)
            // console.log((valores/pesos).toFixed(2))
            return (valores/pesos).toFixed(2);
        }else{
            return 0;
        }
    }

    // calcula a média dos scouts do jogador
    weightedAverageDefenseScouts(player){
        var valores = 0;
        var pesos = 0;
        //verifica se o objeto scout do objeto jogador não é um objeto vazio
        if(player.scout){
            //varre o objeto scout procurando seus scouts acumulando os pesos e os valores
            //para fazer uma media ponderada
            Object.keys(player.scout).map(
                (chv) => {
                    if(Object.keys(this.state.defense_scout).includes(chv)){
                        valores += (player.scout[chv]*this.state.defense_scout[chv]);
                        pesos += this.state.defense_scout[chv];
                    }
                }
            );
            // console.log('# '+ player.apelido)
            // console.log(player.scout)
            // console.log(Object.keys(player.scout))
            // console.log(Object.values(player.scout))
            // console.log(valores)
            // console.log(pesos)
            // console.log((valores/pesos).toFixed(2))
            return (valores/pesos).toFixed(2);
        }else{
            return 0;
        }
    }

    //ordena um array de jogadores de acordo com as medias de scouts de defesa
    getBestDefenders(jogadores){
        //lista tuplas de jogadores com o [id, scout_mean]
        var peers = jogadores.map(
            (jog) => {
                return [jog.atleta_id, this.weightedAverageDefenseScouts(jog)]
            }
        );

        //ordena da melhor variacao para a pior
        peers.sort(
            (first, second) => {
                return first[1] - second[1];
            }
        );

        //ordena o array de objetos de acordo com o array de tuplas
        var plrs_ordered = [];
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );

        return plrs_ordered;
    }
    
    //ordena um array de jogadores de acordo com as medias de scouts de ataque
    getBestAttackers(jogadores){
        //lista tuplas de jogadores com o [id, scout_mean]
        var peers = jogadores.map(
            (jog) => {
                return [jog.atleta_id, this.weightedAverageAttackScouts(jog)]
            }
        );

        //ordena da pior variacao para a melhor
        peers.sort(
            (first, second) => {
                return first[1] - second[1];
            }
        );

        //ordena o array de objetos de acordo com o array de tuplas
        var plrs_ordered = [];
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );

        return plrs_ordered;
    }


}
export default IAlgorithms;