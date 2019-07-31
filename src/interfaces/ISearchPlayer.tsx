import ClubsPerformance from "control/ClubsPerformance";
import IAlgorithms from "control/IAlgorithms";

export default interface ISearchPlayerProps {
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

export default interface ISearchPlayerState {
  ia?: IAlgorithms;
  clubes?: object;
  clubesThroughput?: ClubsPerformance;
  posicoes?: object;
  status?: object;
  jogadores?: any[];
  rodada_atual?: any;
  best_clubs?: any[];
  token?: string;
  expanded?: boolean;
}
