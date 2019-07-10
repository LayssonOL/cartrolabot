import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import * as React from "react";
import { Fragment } from "react";
import MyTeam from "../components/MyTeam";
import IAuthProps from "../interfaces/auth-interfaces";
import IAuthState from "../interfaces/auth-interfaces";
import "./auth_styles.css";

class Auth extends React.Component<IAuthProps, IAuthState> {
  public state: IAuthState = {
    baseURL: `${window.location.origin}`,
    connected: false,
    email: "",
    headers: {
      "Accept": "application/json, text/javascript",
      "Content-Type": "application/json; charset=UTF-8",
      // "Host": "login.globo.com",
      // "Origin": "https://login.globo.com",
      // "Referer": "https://login.globo.com/login/438?url=https://cartolafc.globo.com",
      //  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"
    },
    password: "",
    serviceId: 438,
    statusText: "",
    token: "",
    url: `${
      window.location.origin
    }/proxy/https://login.globo.com/api/authentication`,
    // url: 'https://login.globo.com/api/authentication',
  };

  public render() {
    // const { classes } = this.props
    if (this.state.connected) {
      return (
        <Fragment>
          <MyTeam className="myTeam" />
        </Fragment>
      );
    } else {
      return (
        <div className="panel">
          <Card className="card">
            <CardMedia
              className="media"
              image={require("./../img/cartrolaBot.png")}
              title="CartrolaBot"
            />
            <form onSubmit={this.submit}>
              <CardContent className="card_content">
                <TextField
                  id="email"
                  label="Email"
                  className="email"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                  margin="normal"
                />
                <TextField
                  id="psswd"
                  label="Password"
                  className="password"
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange("password")}
                  margin="normal"
                />
                {/* <form onSubmit={this.handleSubmit}>
                                    <label>
                                    Name:
                                    <input type="text" value="Nada" onChange={this.handleChange} />
                                    </label>
                                    <input type="submit" value="Submit" />
                                </form> */}
              </CardContent>
              <CardActions className="card_actions">
                <Button
                  className="connect_button"
                  type="submit"
                  // variant="raised"
                  variant="outlined"
                  color="primary"
                >
                  Conectar
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      );
    }
  }

  public componentWillMount() {
    const myToken = sessionStorage.getItem("token");
    if (myToken) {
      this.setState({ token: myToken, connected: true });
    }
  }

  protected getAuthentication() {
    const getAuth = axios.create({
      headers: this.state.headers,
      withCredentials: false,
    });
    getAuth
      .post(this.state.url, {
        payload: {
          email: this.state.email,
          password: this.state.password,
          serviceId: 438,
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response));

        sessionStorage.setItem("token", response.data.glbId);
        this.setState({ token: response.data.glbId });
        this.setState({ statusText: response.statusText });
        this.setState({ connected: true });
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  protected submit = (event: React.FormEvent) => {
    event.preventDefault();
    this.getAuthentication();
    // console.log("CHAMOU")
  }

  protected handleChange<T, K extends keyof IAuthState> = (name: K) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value,
    });
  };
}

// export default withStyles(styles)(Auth);
export default Auth;
