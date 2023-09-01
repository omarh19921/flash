import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck, deleteCard, readDeck } from "../utils/api";

function ViewDeck() {
  const history = useHistory();

  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(loadDeck, [deckId]);

  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this deck?"
    );
    if (confirmed) {
      deleteDeck(deck.id).then(() => history.push("/decks"));
    }
  }

  function deletingCard(cardId) {
    const confirmed = window.confirm(
      "Delete this Card?"
    );
    if (confirmed) {
      deleteCard(cardId).then(() => loadDeck());;
    }
  }

 
  return (
    <main className="container deck-view">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="media mb-2">
        <div className="media-body">
          <h5 className="mt-0">{deck.name}</h5>
          {deck.description}
        </div>
      </div>
      <Link
        to={`/decks/${deck.id}/edit`}
        className="btn btn-secondary mr-2"
        title="Edit deck"
      >
        <span className="oi oi-pencil" /> Edit
      </Link>
      <Link
        to={`/decks/${deck.id}/study`}
        className="btn btn-primary mr-2"
        title="Study deck"
      >
        <span className="oi oi-book" /> Study
      </Link>
      <Link
        to={{
          pathname: `/decks/${deck.id}/cards/new`,
          state: { deckName: deck.name }
        }}
        className="btn btn-primary"
        title="Add Card"
      >
        <span className="oi oi-plus" /> Add Cards
      </Link>
      <button className="btn btn-danger float-right oi oi-trash" onClick={handleDelete} title="Delete deck"></button>
      {deck.cards.map((card) =>

        <div className="container card mt-4 p-4" key={card.id}>
          <div className="row">
            <div className="col-5">
          {card.front}
          </div>
          <div className="col-7">
          {card.back}
          </div>
          </div>
          <div className="d-flex flex-column align-items-end justify-content-end">
            <button className="btn btn-danger mb-2 oi oi-trash " onClick={() => deletingCard(card.id)}  ></button>
            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
          </div>
        </div>

      )}
    </main>
  )
}

export default ViewDeck;