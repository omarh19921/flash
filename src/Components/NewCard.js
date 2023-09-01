import React, { useState, useEffect } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import { readDeck, createCard } from "../utils/api";
import CardForm from './CardForm';

function NewCard() {
  // Get deckId from useParams hook
  const { deckId, cardId } = useParams();

  const history = useHistory()

  function handleDone(){
    history.goBack();
}

  // Initialize state for deck and card using useState hook
  const [deck, setDeck] = useState({ name:""});
  const [card, setCard] = useState({ front: "", back: "" });


  // useEffect hook to fetch deck data when component mounts
  useEffect(() => {
    // Call readDeck function and handle promise
    readDeck(deckId)
      .then(response => {
        // When promise resolves, set deck state
        setDeck(response);
      })

  }, [deckId]);

  // update card state when input values change
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };



  const handleSubmit = (event) => {
    
    event.preventDefault();
  
    // create new card using createCard function
    createCard(deckId, card)
      .then(() => {
        // Reset card state to initial state
        setCard({ front: "", back: "" });
      })
      .catch((error) => {
        // Catch any errors
        console.error(error);
      });
  };

  return (
    <CardForm card={card} deck={deck} cardId={cardId} handleSubmit={handleSubmit} handleChange={handleChange} handleDone={handleDone} />
  );
}

export default NewCard;
