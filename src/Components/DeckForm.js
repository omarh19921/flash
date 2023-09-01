import React, {useState} from "react";

//reusable form component
function DeckForm({
    onSubmit,
    onCancel,
    initialFormState = {name:"",
     description:""},
    })

    {
    const [deck, setDeck] = useState(initialFormState)

    function handleChange(event){
        const {target} = event
        const {name, value} = target
        // const name = event.target.name 
        setDeck((previousState) =>({
            ...previousState,
            [name]:value
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
        onSubmit(deck);
    }

    return(
        <>   
            <form className="" onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"> Name</label>
                        <input className="form-control" value={deck.name} placeholder="Name" type="text" name="name" id="name" onChange={handleChange} required={true}/>
                    </div>
            
                    <div className="form-group">
                        <label htmlFor="description"> Description</label>
                        <textarea className="form-control" value={deck.description}  placeholder="Description" rows="4" type="textarea" name="description" id="description" onChange={handleChange} required={true}/> 
                    </div>
                    <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </fieldset>       
            </form>
         </>
    )
}
export default DeckForm