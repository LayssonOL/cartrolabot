import React, { Component } from "react";
import axios from "axios";

class BuyPLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

//   getAuth(){
//       axios.get()
//   }

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
