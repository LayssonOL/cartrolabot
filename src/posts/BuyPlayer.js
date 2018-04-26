import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton } from "material-ui";

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
    return (
      <div className='container'>
          <Card >
              <CardHeader
                  title="Market Status"
                  subtitle=""
                  actAsExpander={true}
              />
              <CardActions>
                  <RaisedButton label='Market' primary={true} onClick={this.handleClick = this.getMarketStatus.bind(this)}/>
              </CardActions>
          </Card>
      </div>
    )
  }
}
export default BuyPlayer;
