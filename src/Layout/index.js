import React from "react";
import Header from "./Header";
import Home from "../Home/Home";
import NotFound from "./NotFound";
import Study from "../Components/Study";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../Components/NewDeck";
import EditDeck from "../Components/EditDeck";
import ViewDeck from "../Components/ViewDeck";
import EditCard from "../Components/EditCard"
import NewCard from "../Components/NewCard"
import CardForm from "../Components/CardForm";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container ">
        <Switch>

        <Route exact path="/"> <Home /> </Route>

            <Route path="/decks/new"> <CreateDeck /> </Route>

            <Route path="/decks/:deckId/study"> <Study /> </Route>

            <Route path="/decks/:deckId/edit"> <EditDeck /> </Route>

            <Route exact path="/decks/:deckId"><ViewDeck /></Route>

            <Route path="/decks/:deckId/cards/:cardId/edit"> <EditCard /> </Route>

            <Route path="/decks/:deckId/cards/new"> <NewCard /> </Route>

            <Route > <NotFound /> </Route>

        </Switch>
      </div>
    </div>
  );
}

export default Layout;
