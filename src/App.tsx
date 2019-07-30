import * as React from "react";
import "./App.css";
import IAppProps from "./interfaces/AppInterfaces";
import Auth from "./posts/Auth/Auth";

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

export default App;
