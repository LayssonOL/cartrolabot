import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Card, CardActions, Button, TextField, CardMedia, CardContent } from '@material-ui/core';
import MyTeam from '../components/MyTeam';
import "./auth_styles.css";


class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            serviceId: 438,
            baseURL: window.location.origin,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                //"Host": "login.globo.com",
                //"Origin": "https://login.globo.com",
                "Accept": "application/json, text/javascript",
                //"Referer": "https://login.globo.com/login/438?url=https://cartolafc.globo.com",
              //  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"

            },
            url: `${window.location.origin}/proxy/https://login.globo.com/api/authentication`,
            token: '',
            connected: false,
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
                window.alert(err);
            }
        )
    }

    submit = event => {
        event.preventDefault();
        this.getAuthentication();
        // console.log("CHAMOU")
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        // const { classes } = this.props
        if (this.state.connected) {
            return (
                <Fragment>
                    <MyTeam className="myTeam"/>
                </Fragment>
            )
        } else {
            return (
                <div className="panel" >
                    <Card className="card">
                        <CardMedia
                            className="media"
                            image={require('./../img/cartrolaBot.png')}
                            title="CartrolaBot"
                        />
                        <form onSubmit={this.submit.bind(this)}>
                        <CardContent className="card_content">
                            <TextField id="email"
                                label="Email"
                                className="email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal" />
                            <TextField id="psswd"
                                label="Password"
                                className="password"
                                value={this.state.password}
                                type="password"
                                onChange={this.handleChange('password')}
                                margin="normal" />
                                {/* <form onSubmit={this.handleSubmit}>
                                    <label>
                                    Name:
                                    <input type="text" value="Nada" onChange={this.handleChange} />
                                    </label>
                                    <input type="submit" value="Submit" />
                                </form> */}
                        </CardContent>
                        <CardActions className="card_actions">
                            <Button className="connect_button" type="submit" variant="raised" color="primary">
                                Conectar
                            </Button>
                        </CardActions>
                        </form>
                    </Card>
                </div>
            );
        }
    }
}
// export default withStyles(styles)(Auth);
export default Auth;