import axios from "axios";
import { Observable } from "rxjs";

const baseURL = "proxy/https://api.cartolafc.globo.com";

const requests = {
  // method to choose players by club
  getPlayerClub: (clubes: any[], clubeId: number) => {
    // console.log(clube_id)
    // console.log('CLUBES')
    // console.log(Object.values(this.state.clubes).find((clube) => { return (clube.id === clube_id) }))
    // console.log(this.state.clubes)
    return Object.values(clubes).find((clube: any) => {
      return clube.id === clubeId;
    });
  },

  // method to choose players by position
  getPlayerPos: (posicoes: any[], posicaoId: any) => {
    return Object.values(posicoes).find((posi: any) => {
      return posi.id === posicaoId;
    });
  },

  // to choose players by status
  getPlayerStat: (status: any[], statusId: any) => {
    return Object.values(status).find((stat: any) => {
      return statusId === stat.id;
    });
  },

  // request to get all players from brasilian championship
  getPlayers: (token: string): Observable<any> => {
    const gPlayers = axios.create({
      headers: {
        "X-GLB-Token": token,
      },
    });
    return Observable.create((observer: any) => {
      gPlayers
        .get(
          `${baseURL}/atletas/mercado`,
          // axios.get('https://api.cartolafc.globo.com/atletas/mercado',
        )
        .then((res: any) => {
          observer.next(res.data.atletas);
          observer.complete();
        })
        .catch((err: Error) => {
          observer.error(err);
        });
    });
  },

  // method to get all squads from the fantasy game
  getSchemas: (token: string): Observable<any> => {
    const gSchemas = axios.create({
      headers: {
        "X-GLB-Token": token,
      },
    });
    return Observable.create((observer: any) => {
      gSchemas
        .get(
          `${baseURL}/esquemas`,
          // axios.get('https://api.cartolafc.globo.com/esquemas',
        )
        .then((res: any) => {
          observer.next(res.data);
          observer.complete();
          // return Promise.resolve(res.data)
          // console.log(res.data);
          // console.log(this.state.status);
          // console.log(this.state.clubes);
          // console.log(Object.values(this.state.posicoes));
          // console.log(this.state.jogadores);
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  },

  // method to get the profile of that user logged
  getMyProfile: (token: string): Observable<any> => {
    const getMyTeamConfig = axios.create({
      headers: {
        "X-GLB-Token": token,
        "withCredentials": true,
        // id: "Authenticated",
        // timeout: 10000,
        // responseType: 'json',
        // xsrfCookieName: 'XSRF-TOKEN',
        // xsrfHeaderName: 'X-XSRF-TOKEN',
        // validateStatus: (status) => status >= 200 && status < 300,
      },
    });
    return Observable.create((observer: any) => {
        getMyTeamConfig({
            method: "get",
            url: `${baseURL}/auth/time`,
            // headers: this.headers
          })
            .then((res: any) => {
              //   console.log(res);
              observer.next(res.data);
              observer.complete();
            })
            .catch((err: any) => {
              observer.error(err);
            });
    });
  },
};

export default requests;
