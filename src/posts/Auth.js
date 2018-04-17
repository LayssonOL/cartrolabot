import React, { Component } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardText, CardActions, RaisedButton } from 'material-ui';
import BuscarJogador from '../requests/BuscarJogador';
import BuscarJogMaisEscalados from '../requests/BuscarJogMaisEscalados';
import App from '../App';
import MyTeam from '../components/MyTeam';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: 'layssonol@hotmail.com',
            password: 'n0th1ng1mp',
            serviceId: 438,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Host": "login.globo.com",
                "Origin": "https://login.globo.com",
                "Accept": "application/json, text/javascript",
                "Referer": "https://login.globo.com/login/438?url=https://cartolafc.globo.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"

            },
            url: 'https://login.globo.com/api/authentication',
            token: '',
            connected: false
        }
    }
    componentWillMount(){
        const myToken = sessionStorage.getItem('token');
        if(myToken){
            this.setState({token: myToken, connected: true})
        }
    }
    getAuthentication(){
        axios.post(
            this.state.url,
            {
                'payload':
                {
                    "email": this.state.email,
                    "password": this.state.password,
                    "serviceId": 438
                }
            },
            this.state.headers,
            
        ).then(
            (response) => {
                console.log(response);
                sessionStorage.setItem('token', response.data.glbId);
                this.setState({token: response.data.glbId});
                this.setState({statusText: response.statusText});
                this.setState({connected: true});
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    render(){
        if(this.state.connected){
            return(
                <div className='container'>
                    <div className="row">
                        <div className="col-sm-6 ">
                            <BuscarJogador />
                        </div>
                        <div className="col-sm-6 ">
                            <BuscarJogMaisEscalados />
                        </div>
                        <div className="col-sm-6 ">
                            <MyTeam />
                        </div>
                    </div>        
                </div>
            )
        }else{
            return(
                <div className='container'>
                    <Card >
                        <CardHeader
                            title="Conectar com o Cartola"
                            subtitle=""
                            actAsExpander={true}
                        />
                        <CardActions>
                            <RaisedButton label='Conectar' primary={true} onClick={this.handleClick = this.getAuthentication.bind(this)}/>
                        </CardActions>
                    </Card>
                </div>
            );
        }
    }
}
export default Auth;