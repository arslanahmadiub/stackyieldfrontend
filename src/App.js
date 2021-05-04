import "./custom.scss";
import { Route, Switch } from "react-router-dom";

import MainRecmondationScreen from "./Components/Recmondation/MainRecmondationScreen";
import Chat from "./Components/Chat/Chat";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Chat />
        </Route>
        <Route exact path="/crypto">
          <MainRecmondationScreen />
        </Route>
      </Switch>
    </>
  );
}

export default App;
