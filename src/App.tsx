import * as React from "react";
import "./App.css";
import IAppProps from "./interfaces/app-interfaces";
import Auth from "./posts/Auth";

const App: React.FC<IAppProps> = () => {
  return (
    <div id="request-query-result">
      <div className="container">
        <Auth />
      </div>
      <br />
    </div>
  );
};
