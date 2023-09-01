import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {

    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ name: "", description: ""});

    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId])

    function handleCancel() {
        history.goBack();
    }

    function handleSubmit( updatedDeck) {
        updateDeck(updatedDeck)
        .then((savedDeck) => history.push(`/decks/${savedDeck.id}`))
    }
    const editedDeck = deck.id ? (
        <DeckForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialFormState={deck}
        />
    ) : (
        <p>loading...</p>
    )
    return (
        <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        {editedDeck}
        </>
        )
}

export default EditDeck