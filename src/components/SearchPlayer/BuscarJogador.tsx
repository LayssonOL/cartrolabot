import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  withStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ISearchPlayerProps from "interfaces/ISearchPlayer";
import ISearchPlayerState from "interfaces/ISearchPlayer";
import * as React from "react";
import ClubsPerformance from "../../control/ClubsPerformance";
import IAlgorithms from "../../control/IAlgorithms";
import requests from "../../services/Requests";
import Filters from "../Filters/Filters";
import PanelMyTeam from "../MyTeamPlayersPanel/MyTeamPlayersPanel";
import PlayersList from "../PlayersList";

const styles = {
  card_layout: {
    position: "relative",
    width: "100%"
  },
  filter_button: {
    float: "right"
  },
  titles: {
    fontWeight: "bold"
  }
};

class BuscarJogador extends React.Component<
  ISearchPlayerProps,
  ISearchPlayerState
> {
    readonly state = {
        best_clubs: [],
        clubes: {},
        clubesThroughput: new ClubsPerformance(),
        expanded: false,
        ia: new IAlgorithms(),
        jogadores: [],
        posicoes: {},
        rodada_atual: null,
        status: {},
        token: sessionStorage.getItem("token"),
      };
  constructor(props: ISearchPlayerProps) {
    super(props);
    
  }

  public getPlayers() {
    const players$ = requests.getPlayers(this.state.token);
    const playersSubscription = players$
      .subscribe((data: any) => {
        this.setState({
          clubes: data.clubes,
          jogadores: data.atletas,
          posicoes: data.posicoes,
          status: data.status,
        });
      })
      .add(() => {
        this.setState({
          expanded: !this.state.expanded,
        });
      });
    playersSubscription.unsubscribe();
  }

  public componentDidMount() {
    this.state.clubesThroughput.getRodadaAtual().then((resolve: any) => {
      this.setState({ rodada_atual: resolve });
    });

    this.state.clubesThroughput
      .orderingChoiceByPosition()
      .then((resolve: any) => {
        this.setState({ best_clubs: resolve });
      });
  }

  public hidePlayers() {
    this.setState({ expanded: false });
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card_layout}>
          <CardHeader
            title="Boas Opções"
            subtitle="Estatísticas de cada Jogador"
          />
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={(this.handleClick = this.getPlayers.bind(this))}
            >
              Jogadores
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={(this.handleClick = this.hidePlayers.bind(this))}
            >
              Esconder
            </Button>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto">
            <CardContent>
              <Grid container={true} spacing={8}>
                <Grid item={true} xs={12} />
                <Grid item={true} xs={12}>
                  <Typography className={classes.titles} variant="h4">
                    Goleiros
                  </Typography>
                  <PanelMyTeam />
                  <PlayersList
                    jogadores={this.state.ia.calculatePlayerAllMetricsDefense(
                      this.state.ia.getBestMeanPlayersByPositionWithoutPrice(
                        this.state.jogadores,
                        1,
                        10,
                        this.state.best_clubs,
                        this.state.rodada_atual
                      )
                    )}
                    clubes={this.state.clubes}
                    posicoes={this.state.posicoes}
                    status={this.state.status}
                    newTeam={this.props.new_team}
                    addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                    removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Typography className={classes.titles} variant="h4">
                    Laterais
                  </Typography>
                  <PanelMyTeam />
                  <PlayersList
                    jogadores={this.state.ia.calculatePlayerAllMetricsDefense(
                      this.state.ia.getBestMeanPlayersByPositionWithoutPrice(
                        this.state.jogadores,
                        2,
                        10,
                        this.state.best_clubs,
                        this.state.rodada_atual
                      )
                    )}
                    clubes={this.state.clubes}
                    posicoes={this.state.posicoes}
                    status={this.state.status}
                    newTeam={this.props.new_team}
                    addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                    removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Typography className={classes.titles} variant="h4">
                    Zagueiros
                  </Typography>
                  <PanelMyTeam />
                  <PlayersList
                    jogadores={this.state.ia.calculatePlayerAllMetricsDefense(
                      this.state.ia.getBestMeanPlayersByPositionWithoutPrice(
                        this.state.jogadores,
                        3,
                        10,
                        this.state.best_clubs,
                        this.state.rodada_atual
                      )
                    )}
                    clubes={this.state.clubes}
                    posicoes={this.state.posicoes}
                    status={this.state.status}
                    newTeam={this.props.new_team}
                    addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                    removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Typography className={classes.titles} variant="h4">
                    Meio-Campistas
                  </Typography>
                  <PanelMyTeam />
                  <PlayersList
                    jogadores={this.state.ia.calculatePlayerAllMetricsMidfielders(
                      this.state.ia.getBestMeanPlayersByPositionWithoutPrice(
                        this.state.jogadores,
                        4,
                        10,
                        this.state.best_clubs,
                        this.state.rodada_atual
                      )
                    )}
                    clubes={this.state.clubes}
                    posicoes={this.state.posicoes}
                    status={this.state.status}
                    newTeam={this.props.new_team}
                    addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                    removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Typography className={classes.titles} variant="h4">
                    Atacantes
                  </Typography>
                  <PanelMyTeam />
                  <PlayersList
                    jogadores={this.state.ia.calculatePlayerAllMetricsAttack(
                      this.state.ia.getBestMeanPlayersByPositionWithoutPrice(
                        this.state.jogadores,
                        5,
                        10,
                        this.state.best_clubs,
                        this.state.rodada_atual
                      )
                    )}
                    clubes={this.state.clubes}
                    posicoes={this.state.posicoes}
                    status={this.state.status}
                    newTeam={this.props.new_team}
                    addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                    removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Typography className={classes.titles} variant="h4">
                    Técnicos
                  </Typography>
                  <PanelMyTeam />
                  <PlayersList
                    jogadores={this.state.ia.getBestAppreciation(
                      this.state.ia.getBestMeanPlayersByPositionWithoutPrice(
                        this.state.jogadores,
                        6,
                        10,
                        this.state.best_clubs,
                        this.state.rodada_atual
                      )
                    )}
                    clubes={this.state.clubes}
                    posicoes={this.state.posicoes}
                    status={this.state.status}
                    newTeam={this.props.new_team}
                    addPlayerToNewTeam={this.props.addPlayerToNewTeam}
                    removePlayerFromNewTeam={this.props.removePlayerFromNewTeam}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(BuscarJogador);
