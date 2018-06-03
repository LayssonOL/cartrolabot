import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardActions, Button, TextField, CardText, ActionLabel, CardMedia, CardContent, Grid } from '@material-ui/core';
import BuscarJogador from '../requests/BuscarJogador';
import BuscarJogMaisEscalados from '../requests/BuscarJogMaisEscalados';
import MyTeam from '../components/MyTeam';
import BuyPlayer from './BuyPlayer';
import ClubsPerformance from '../control/ClubsPerformance';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    card: {
        position: 'relative',
        top: '10%',
        left: '30%',
        width: '37%',
        bottom: '20%',
        padding: '10',
    },
    email:{
        position: 'relative',
        top: '-25%',
        left: '-2%',
    },
    password:{
        position: 'relative',
        top: '-25%',
        left: '15%',
    },
    media: {
        position: 'relative',
        width: '50%',
        left: '28%',
        height: 'auto',
        paddingTop: '56.25%', // 16:9
    },
    myTeam: {
        position: 'relative',
        height: '25%',
        width: '50%',
    },
    searchMostScaled:{
        position: 'relative',
        height: '25%',
        width: '50%',
    },
    firstCard:{

    },
    secondCard:{

    }


}

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
    componentWillMount() {
        const myToken = sessionStorage.getItem('token');
        if (myToken) {
            this.setState({ token: myToken, connected: true })
        }
    }
    getAuthentication() {
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
                this.setState({ token: response.data.glbId });
                this.setState({ statusText: response.statusText });
                this.setState({ connected: true });
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props
        if (this.state.connected) {
            return (
                <Fragment>
                    <MyTeam className={classes.myTeam}/>
                </Fragment>
            )
        } else {
            return (
                <div >
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={require('./../img/cartrolaBot.png')}
                            title="CartrolaBot"
                        />
                        <CardContent>
                            <TextField id="email"
                                label="Email"
                                className={classes.email}
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal" />
                            <TextField id="psswd"
                                label="Password"
                                className={classes.password}
                                value={this.state.password}
                                type="password"
                                onChange={this.handleChange('password')}
                                margin="normal" />
                        </CardContent>
                        <CardActions>
                            <Button variant="raised" color="primary" onClick={this.handleClick = this.getAuthentication.bind(this)}>
                                Conectar
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            );
        }
    }
}
export default withStyles(styles)(Auth);