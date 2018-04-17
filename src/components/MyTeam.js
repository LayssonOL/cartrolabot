import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardActions, RaisedButton } from "material-ui";

class MyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: null,
        team: {},
        token: sessionStorage.getItem('token')
    };
  }
  
  getMyProfile() {
    const getMyTeamConfig = axios.create(
        {
            baseURL: "https://api.cartolafc.globo.com/auth/time",
            headers: {
                'X-GLB-Token': this.state.token,
                // withCredentials: true,
                // id: "Authenticated",
                // timeout: 10000,
                // responseType: 'json',
                // xsrfCookieName: 'XSRF-TOKEN',
                // xsrfHeaderName: 'X-XSRF-TOKEN',
                // validateStatus: (status) => status >= 200 && status < 300,
            }
        }
    );
    getMyTeamConfig(
        {
            method: 'get',
            url: this.baseURL
            // headers: this.headers
        }
      )
      .then(res => {
          console.log(res);
      })
      .catch(err => {
        if (err) {
          console.log(err.response);
        }
      });
  }

  saveTeam(){
    axios
    .post("https://api.cartolafc.globo.com/auth/time/salvar",
            {
                'payload': this.state.team
            },
            {
                'X-GLB-Token': this.state.token,
                timeout: 10000,
            }
        )
      .then(res => {
          console.log(res);
      })
      .catch(err => {
        if (err) {
          console.log(err.response);
        }
      });
  }

  render() {
      return(
        <div className='container'>
            <Card >
                <CardHeader
                    title="Meu Time"
                    subtitle="Vejamos como estamos"
                    actAsExpander={true}
                />
                <CardActions>
                    <RaisedButton label='Ver Time' primary={true} onClick={this.handleClick = this.getMyProfile.bind(this)}/>
                    <RaisedButton label='Salvar Time' primary={true} onClick={this.handleClick = this.saveTeam.bind(this)}/>
                </CardActions>
            </Card>
        </div>
      )
  }
}
export default MyTeam;
