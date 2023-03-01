import "./index.css";
import React, { VFC } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import { DAppProvider, Config } from "@usedapp/core";
import Issuer from "./components/Pages/Issuer";
import Holder from "./components/Pages/Holder";
import Verifier from "./components/Pages/Verifier";

const App: VFC = () => {
  const [decryptedMessages, setDecryptedMessages] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/issuer'>
            <Issuer />
          </Route>
          <Route path='/holder'>
            <Holder />
          </Route>
          <Route path='/verifier'>
            <Verifier />
          </Route>
          <Route path='/'>
            <Issuer />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const config: Config = {
  autoConnect: false,
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export default App;
