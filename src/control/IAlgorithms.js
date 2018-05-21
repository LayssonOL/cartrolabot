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
    getBestMeanPlayersByPosition(jogadores, pos, qnt, clubs, rodada_atual, max_price){
        // calcula um limite minimo para a quantidade de partidas do jogador
        var qnt_matches = (rodada_atual/2)
        // console.log("RODADA")
        // console.log(rodada_atual)
        // console.log("QUANTIDADE DE PARTIDAS!")
        // console.log(qnt_matches)
        //ordenar os jogadores de maior média
        var plrs = jogadores.filter(
            (jog) => {
                return (jog.posicao_id === pos // captura jogadores pela position passada
                        && jog.status_id === 7 // só jogadores prováveis
                        && jog.preco_num <= max_price
                        && clubs.includes(jog.clube_id) // ,  e que pertencam a um dos clubes recomendados
                        && jog.jogos_num > qnt_matches // jogadores que jogaram pelo menos metade do numero de rodadas
                        && jog.media_num >= 2.5) // jogadores com media superior a 2,5
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
        console.log('JOGADORES DE MELHOR MEDIA')
        console.log(plrs_ordered)
        //retorna os qnt melhores goleiros
        return plrs_ordered;
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
        console.log('JOGADORES COM A PIOR VARIACAO')
        console.log(plrs_ordered)
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

        console.log(peers)
        console.log(jogadores)
        
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
        
        console.log('MELHORES JOGADORES DE DEFESA')
        console.log(plrs_ordered)
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
        console.log(peers)
        console.log(jogadores)
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );
        console.log('MELHORES JOGADORES DE ATAQUE')
        console.log(plrs_ordered)
        return plrs_ordered;
    }

    calculatePlayerAllMetricsAttack(jogadores){
        //lista tuplas de jogadores com o [id, scout_mean]
        var peers = jogadores.map(
            (jog) => {
                return [jog.atleta_id, 
                        (((this.weightedAverageAttackScouts(jog)*3) + (jog.media_num*2) - (jog.variacao_num))/6)
                        ]
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
        console.log(peers)
        console.log(jogadores)
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );
        console.log('MELHORES JOGADORES DE ATAQUE')
        console.log(plrs_ordered)
        return plrs_ordered;
    }

    calculatePlayerAllMetricsDefense(jogadores){
        //lista tuplas de jogadores com o [id, scout_mean]
        var peers = jogadores.map(
            (jog) => {
                return [jog.atleta_id, 
                        (((this.weightedAverageDefenseScouts(jog)*3) + (jog.media_num*2) - (jog.variacao_num))/6)
                        ]
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
        console.log(peers)
        console.log(jogadores)
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );
        console.log('MELHORES JOGADORES DE DEFESA')
        console.log(plrs_ordered)
        return plrs_ordered;
    }

    calculatePlayerAllMetricsMidfielders(jogadores){
        //lista tuplas de jogadores com o [id, scout_mean]
        var peers = jogadores.map(
            (jog) => {
                return [jog.atleta_id, 
                        (((this.weightedAverageScouts(jog)*3) + (jog.media_num*2) - (jog.variacao_num))/6)
                        ]
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
        console.log(peers)
        console.log(jogadores)
        peers.map(
            (p) => {
                jogadores.map(plr => {
                    if(plr.atleta_id === p[0]){
                        plrs_ordered.push(plr)
                    }
                });
            }
        );
        console.log('MELHORES JOGADORES DE MEIO')
        console.log(plrs_ordered)
        return plrs_ordered;
    }
    
    
}
export default IAlgorithms;