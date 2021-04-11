import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Voting from "./Voting";

const Routes = () => {
  const [nameList, setNameList] = useState([]);

  function nameListHandler(item) {
    setNameList(item);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/puppy-name-picker">
          <App nameListHandler={nameListHandler} nameList={nameList} />
        </Route>
        <Route exact path="/puppy-name-picker/Voting">
          <Voting nameListHandler={nameListHandler} nameList={nameList} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
