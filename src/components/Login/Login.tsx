import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
} from "@material-ui/core";
import ILoginPageProps from "interfaces/LoginPageInterfaces";
import * as React from "react";

const loginPage = (props: ILoginPageProps) => {
    return (
        <div className="panel">
        <Card className="card">
          <CardMedia
            className="media"
            image={require("./../img/cartrolaBot.png")}
            title="CartrolaBot"
          />
          <form onSubmit={props.submit}>
            <CardContent className="card_content">
              <TextField
                id="email"
                label="Email"
                className="email"
                value={props.email}
                name="email"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                />
              <TextField
                id="psswd"
                label="Password"
                className="password"
                value={props.password}
                name="password"
                type="password"
                onChange={props.handleChange}
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
};

export default loginPage;
