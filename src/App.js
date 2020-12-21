import React from 'react';
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
      <Switch>
        <Route exact path ="/pokedex" render= {(props) => <Pokedex {...props} />} />
        <Route 
          exact
          path ="/pokedex/:pokemonId" 
          render= {(props) => <Pokemon {...props} />}
        />
      </Switch>
    );
}

export default App;