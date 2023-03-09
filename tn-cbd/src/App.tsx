import "./index.css";
import React, { VFC } from "react";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { DAppProvider, Config } from "@usedapp/core";
import Issuer from "./components/Pages/Issuer";
import Holder from "./components/Pages/Holder";
import Verifier from "./components/Pages/Verifier";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const App: VFC = () => {
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

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="mumbai">
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

export default App;
