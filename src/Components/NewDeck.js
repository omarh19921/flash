import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

import { Link } from 'react-router-dom';

function NewDeck(){
    const history = useHistory();

    function handleCancel(){
        history.goBack();
    }

    function handleSubmit(deck){
        createDeck(deck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`));
    }

    return (
        <div className="">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" className="btn btn-link">
                            <span>Home</span>
                        </Link>
                        <span className="mt-2"> Create Deck</span>
                    </li>
                </ol>
            </nav>
            <DeckForm 
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
}
export default NewDeck;

