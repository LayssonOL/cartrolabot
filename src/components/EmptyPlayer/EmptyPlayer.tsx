import {
    createStyles,
    Grid,
    ListItemText,
    Paper,
    Typography,
    withStyles } from "@material-ui/core";
import IProps from "interfaces/IEmptyPlayer";
import * as React from "react";

const styles = createStyles({
  button: {
    position: "relative",
    top: "30%",
  },
  data: {
    left: "0%",
    position: "relative",
    top: "40%",
  },
  escudo: {
    height: "auto",
    left: "25%",
    position: "relative",
    top: "20%",
    width: "33%",
  },
  gridContainer: {
    height: "auto",
    maxWidth: "100%",
    position: "relative",
    top: "25%",
  },
  grid_container: {
    height: "auto",
    width: "100%",
  },
  img: {
    bottom: "0%",
    height: "auto",
    maxWidth: "100%",
    position: "relative",
  },
  jogador_nome: {
    fontWeight: "bold",
    left: "30%",
    position: "relative",
  },
  jogador_pos: {
    left: "30%",
    position: "relative",
  },
  paper: {
    height: "5%",
    width: "100%",
  },
  text_ranking: {
    fontWeight: "bold",
    position: "relative",
    top: "38%",
  },
});

const EmptyPlayer = (props: IProps) => {
    let foto = null;
    if (props.jog.foto) {
      foto = props.jog.foto.replace("FORMATO", "140x140");
    }
    const { classes } = props;

    return (
    // console.log('POSICAO: '+this.props.pos);
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid className={classes.gridContainer} container={true} spacing={0}>
          <Grid item={true} xs={2}>
            <img
              className={classes.escudo}
              src={String(Object.values(props.clube.escudos)[0])}
              alt={props.clube.nome}
              title={props.clube.nome}
            />
            {/* <ListItemText
                                primary={   <Typography variant="subtitle2" align='justify' gutterBottom>
                                                {props.clube.nome}
                                            </Typography>
                                }
                                >
                            </ListItemText> */}
          </Grid>
          <Grid item={true} xs={2}>
            <Grid container={true}>
              <Grid item={true} xs={6}>
                <img
                  className={classes.img}
                  src={foto}
                  alt={props.jog.apelido}
                  title={props.jog.apelido}
                />
              </Grid>
              <Grid item={true} xs={6}>
                <ListItemText
                  primary={
                    <Typography
                      className={classes.jogador_nome}
                      variant="subtitle2"
                      align="justify"
                      gutterBottom={true}
                    >
                      {props.jog.apelido}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      className={classes.jogador_pos}
                      variant="subtitle2"
                      align="justify"
                      gutterBottom={true}
                    >
                      {props.pos.nome}
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={2}>
            <Typography
              className={classes.data}
              variant="h4"
              align="center"
            >
              {/* {props.jog.pontos_num} */}
            </Typography>
          </Grid>
          <Grid item={true} xs={2}>
            <Typography
              className={classes.data}
              variant="h4"
              align="center"
            >
              {/* {props.jog.media_num} */}
            </Typography>
          </Grid>
          <Grid item={true} xs={2}>
            <Typography
              className={classes.data}
              variant="h4"
              align="center"
            >
              {/* {props.jog.preco_num} */}
            </Typography>
          </Grid>
          <Grid item={true} xs={2}>
            {props.timeAtual ? (
              <Typography
                className={classes.data}
                variant="h4"
                align="center"
              />
            ) : (
              <Grid container={true}>
                <Grid item={true} xs={6}>
                  {/* <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}
                                                disabled={props.inNewTeam || props.inTeam}
                                                onClick={() => {props.addPlayerToNewTeam(props.jog)}}
                                                >
                                                A
                                            </Button>  */}
                </Grid>
                <Grid item={true} xs={6}>
                  {/* <Button variant="fab" mini color="secondary" aria-label="remove" className={classes.button}
                                                disabled={!props.inNewTeam || !props.inNewTeam}
                                                onClick={() => {props.removePlayerFromNewTeam(props.jog)}}
                                                >
                                                R
                                            </Button> */}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
      {/* <Card>
                    <CardHeader
                        title={props.jog.apelido}
                        subtitle={props.pos.nome}
                        avatar={<Avatar alt={props.jog.apelido} src={foto}/>}
                        actAsExpander={true}>
                    </CardHeader> */}
      {/* <CardActions>
                        <Button variant='flat' color='secondary'>Comprar</Button>
                    </CardActions> */}
      {/* <CardContent>
                        <Typography variant="body2">
                            Media = {props.jog.media_num}
                        </Typography>
                        <Typography variant="body2">
                            Variacao = {props.jog.variacao_num}
                        </Typography>
                        <Typography variant="body2">
                            Media Scout = {props.scout_mean}
                        </Typography>
                    </CardContent>
                </Card> */}
    </React.Fragment>
  );
};
export default withStyles(styles)(EmptyPlayer);
