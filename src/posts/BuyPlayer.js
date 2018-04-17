import React, { Component } from "react";
import axios from "axios";

class BuyPLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marketStatus: ''
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
        this.getHostsAndGuests();
        // console.log(this.state.partidas)
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

  render() {}
}
export default BuyPlayer;
