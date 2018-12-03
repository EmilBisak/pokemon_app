import React from "react";
import { Switch, Route } from "react-router-dom";
import SinglePokemon from "./SinglePokemon";
import Pokemons from "./Pokemons";


const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Pokemons} />
      <Route path="/singlePokemon/:name" component={SinglePokemon} />
    </Switch>
  </main>
);

export default Main;