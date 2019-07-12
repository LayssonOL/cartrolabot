import {
  Button,
  Card,
  CardActions,
  CardHeader,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import IBuyPlayerProps from "interfaces/buyPlayerInterfaces";
import IBuyPlayerState from "interfaces/buyPlayerInterfaces";
import * as React from "react";
import { useState } from "react";


const styles = {
  card_layout: {},
};

const BuyPlayer = (props: IBuyPlayerProps) => {
  const [marketStatus, setMarketStatus] = useState(2);

  const getMarketStatus = () => {
    axios
      .get(
        "proxy/https://api.cartolafc.globo.com/mercado/status",
        // .get("https://api.cartolafc.globo.com/mercado/status",
      )
      .then((res) => {
        this.setState({
          marketStatus: res.data.status_mercado,
        });

        this.state.marketStatus === 1
          ? window.alert("Mercado Aberto!")
          : window.alert("Mercado Fechado!");
      })
      .catch((err) => {
        if (err) {
          window.alert(err);
        }
      });
  }

  const postTeam = () => {
    axios
      .post(
        "proxy/https://api.cartolafc.globo.com/auth/time/salvar",
        // .post("https://api.cartolafc.globo.com/auth/time/salvar",
      )
      .then((res) => {
        this.setState({
          partidas: res.data.partidas,
        });
        this.getHostsAndGuests();
        // console.log(this.state.partidas)
      })
      .catch((err) => {
        if (err) {
          window.alert(err);
        }
      });
  }

  const render = () => {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card_layout}>
          <CardHeader title="Market Status" subtitle="" actAsExpander={true} />
          <CardActions>
            <Button
              variant="raised"
              color="primary"
              onClick={(this.handleClick = this.getMarketStatus.bind(this))}
            >
              Market
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(BuyPlayer);
