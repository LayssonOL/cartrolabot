
import axios from "axios";
import * as React from "react";
import { Fragment } from "react";
import LoginPage from "../../components/Login/Login";
import MyTeam from "../../components/MyTeam/MyTeam";
import IAuthProps from "../../interfaces/AuthInterfaces";
import IAuthState from "../../interfaces/AuthInterfaces";
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

  public componentWillMount() {
    const myToken = sessionStorage.getItem("token");
    if (myToken) {
      this.setState({ token: myToken, connected: true });
    }
  }

  public submit = (event: React.FormEvent) => {
    event.preventDefault();
    this.getAuthentication();
    // console.log("CHAMOU")
  }

  public handleChange = <T extends keyof IAuthState>(event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { [event.target.name]: event.target.value };
    this.setState( newState as { [P in T]: IAuthState[P]; });
  }

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
        <LoginPage
                   id="loginPage"
                   email={this.state.email}
                   password={this.state.password}
                   submit={this.submit}
                   handleChange={this.handleChange}
        />
      );
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
}

// export default withStyles(styles)(Auth);
export default Auth;
