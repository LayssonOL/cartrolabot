import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const styles = {
  card_layout:{
  },
}

class BuyPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marketStatus: 2
    };
  }
  
  getMarketStatus() {
    axios
      .get("https://api.cartolafc.globo.com/mercado/status",
        )
      .then(res => {
        this.setState({
          marketStatus: res.data.status_mercado
        });
        
        this.state.marketStatus === 1 ? window.alert('Mercado Aberto!'):window.alert('Mercado Fechado!')
        
      })
      .catch(err => {
        if (err) {
          window.alert(err);
        }
      });
  }

  postTeam() {
    axios
      .post("https://api.cartolafc.globo.com/auth/time/salvar",
        )
      .then(res => {
        this.setState({
          partidas: res.data.partidas
        });
        this.getHostsAndGuests();
        // console.log(this.state.partidas)
      })
      .catch(err => {
        if (err) {
          window.alert(err);
        }
      });
  }

  render() {
    const { classes } = this.props
    return (
      <div>
          <Card className={classes.card_layout}>
              <CardHeader
                  title="Market Status"
                  subtitle=""
                  actAsExpander={true}
              />
              <CardActions>
                  <Button variant='raised' color='primary' onClick={this.handleClick = this.getMarketStatus.bind(this)}>Market</Button>
              </CardActions>
          </Card>
      </div>
    )
  }
}
export default withStyles(styles)(BuyPlayer);
