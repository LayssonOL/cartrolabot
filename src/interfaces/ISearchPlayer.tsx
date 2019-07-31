export default interface IProps {
  classes: any;
  new_team: {
    atletas: any[];
    capitao: object;
    esquema: {
      esquema_id: number;
      posicoes: any[];
    };
  };
  addPlayerToNewTeam: (newPlayer: any) => void;
  removePlayerFromNewTeam: (newPlayer: any) => void;
}

export default interface IState {
  ia?: any;
  clubes?: object;
  clubesThroughput?: any;
  posicoes?: object;
  status?: object;
  jogadores?: any[];
  rodada_atual?: any;
  best_clubs?: any[];
  token?: string;
  expanded?: boolean;
}
