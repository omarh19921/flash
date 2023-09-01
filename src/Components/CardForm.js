import React from 'react';
import { Link } from 'react-router-dom';

function CardForm({card, deck, handleSubmit, cardId, handleDone, handleChange}) {

  // const [card, setCard] = useState(initialFormState)

  // function handleChange(event){
  //     const {target} = event
  //     const {name, value} = target
  //     setCard((previousState) =>({
  //         ...previousState,
  //         [name]:value
  //     }))
  // }

  // function handleSubmit(event){
  //     event.preventDefault()
  //     onSubmit(deck);
  // }

  return (
    <>
         <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="btn btn-link">Home</Link>
              <Link to="/decks/:deckId/study" className="btn btn-link"> {deck.name} </Link>
              <Link to="/decks/:deckId/study" className="breadcrumb-item active"> Add Card</Link>
            </li>
          </ol>
        </nav>
    
    <h2> {deck.name}: {cardId ? "" : "Add Card"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={card.front}
        />
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={card.back}
        />
        <button type="submit" className="btn btn-primary mt-2" onClick={handleDone}>Save</button>
        <button className="btn btn-secondary mt-2" onClick={handleDone}>{cardId ? "Done" : "Cancel"}</button>
      </form>
    </>
  );
}

export default CardForm;
