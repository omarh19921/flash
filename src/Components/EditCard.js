import React, { useEffect, useState } from 'react'
import { readDeck, readCard, updateCard } from '../utils/api'
import { useParams, useHistory } from 'react-router-dom'
import CardForm from './CardForm'


//------------------------------------------------------------------------

function EditCard(){
    const {deckId, cardId}= useParams()

    // Initialize state for deck and card u
    const [deck, setDeck] = useState({name:""});
    const [card, setCard] = useState({ front: "", back: "" });

//------------------------------------------------------------------------

// useEffect(readDeck().then )
    // need useEffect to use readDeck, and readCard
    useEffect(() => {
      
        // Fetch the deck and card data when the component mounts
        readDeck(deckId)
        
        .then(data => setDeck(data))
        .catch(error => console.error("Error fetching deck:", error));
        readCard(cardId)
        
            .then(data => setCard(data));
    }, [deckId, cardId]);
    


//------------------------------------------------------------------------
    const history = useHistory()
  
    function handleDone(){
      history.goBack();
    }
//------------------------------------------------------------------------

    // Define handleChange function to update card state when input values change
    const handleChange = ({ target }) => {
      setCard({
        ...card,
        [target.name]: target.value,
      });
    };
  
    // Define handleSubmit function to create new card when form is submitted
    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard(card)
            .then((data) => 
                // back to the previous page
                setCard(data)
                // handleDone()
                )
                .then(() => history.push(`/decks/${deckId}`))
            .catch(error => {
                console.error("Error updating card:", error);
                if (error.json) {
                  return error.json().then(err => {
                    console.log("Error details:", err);
                  });
                } else {
                  console.log("Error details:", error.message);
                }
              });
    }
//------------------------------------------------------------------------

    return(
     <CardForm card={card} deck={deck} cardId={cardId} handleSubmit={handleSubmit} handleChange={handleChange} handleDone={handleDone} />
        
    )

}
export default EditCard
