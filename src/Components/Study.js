import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import { readDeck } from "../utils/api";
import { useParams,  useHistory, Link } from "react-router-dom";

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const history = useHistory()

    //sets an initial state as an object
    const initialState = {
        index:0,
        flipped: false,
        viewed: false
    }

    const [session, setSession] = useState({...initialState})
    
    const handleFlipped = event => {
        setSession({
            ...session,
            flipped: !session.flipped,
            viewed: true
        })
    }
// function for incrementing through cards by means up increasing state + 1
    const handleNext = event => {
        setSession({
            ...session,
            index:session.index + 1,
            flipped:false,
            viewed: false
        })
    }
// if reset it will display the initial state of cards/ otherwise pushes to home page
    const handleReset = () => {
        window.confirm(`Reset?`)
        ? setSession(initialState)
        : history.push("/")
    }


    useEffect(() => {
        readDeck(deckId).then(data => setDeck(data));
    }, [deckId]);


  
    if (!deck.cards) return <p>Loading...</p>;
    
    if(deck.cards.length <= 2){
     return (
        <div className="container ">
            <h2 className="text-center">{deck.name}</h2>
            <h2>Not enough cards.</h2>
            <p>
                "You need at least 3 cards to study. There are {deck.cards.length} cards in this deck."
            </p>
         
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                <span className="oi oi-plus" /> Add Cards
            </Link>
        </div>
        )
    }


    return (
        <div>
            <Breadcrumb deckName={deck.name} deckId={deck.id} />
          
            <h2>Study: {deck.name}</h2>
            <div className="card-deck justify-content-center  mt-4 w-100">
      
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Card {session.index + 1} of {deck.cards.length}
            </h4>
            <p className="card-text">
              {session.flipped
                ? deck.cards[session.index].back
                : deck.cards[session.index].front}
            </p>
          </div>
          <div className="card-footer">
            <div className="btn-wrapper">
              <button
                className="btn btn-secondary mx-1 float-left"
                style={{ width: "5rem" }}
                onClick={handleFlipped}
              >
                Flip
              </button>
              {session.viewed && session.index < deck.cards.length - 1 ? (
                <button
                  className="btn btn-primary mx-1 float-right"
                  style={{ width: "5rem" }}
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                session.viewed && (
                  <button
                    className="btn btn-primary mx-1 float-right"
                    style={{ width: "5rem" }}
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
  
    </div>
    )
}

export default Study;
