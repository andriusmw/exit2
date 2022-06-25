import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendEntryService } from "../services";

export const NewEntry = () => {
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const {token} = useContext(AuthContext)
    
    const handleForm = async (e) => {
        e.preventDefault();

        try{
            setSending(true);

            const data = new FormData(e.target);
            const entry = await sendEntryService({data,token});
            
            console.log(entry);
        } catch (error) {
            console.log(error)
            console.log(error.message)
            setError(error.message);
        } finally {
            setSending(false);
        }
    }
 

   return (
    
    <form onSubmit={handleForm} >
        <h1>Add new Entry</h1>

        <fieldset>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" required />
       
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" required />
      
            <label htmlFor="photo">Photo (optional): </label>
            <input type="file" id="photo" name="photo" />
        
            <label htmlFor="city">City: </label>
            <input type="text" id="city" name="city" required />
       
            <label htmlFor="Neighbourhood">Neighbourhood: </label>
            <input type="text" id="Neighbourhood" name="Neighbourhood" required />
      
            <label htmlFor="Status">Status: </label>
            <input type="text" id="Status" name="Status" required />

            <button>Send Entry</button>
            {sending ? <p>Sending Entry</p> : null}
            {error ? <p>{error} </p> : null}

        </fieldset>

    </form>
   ) 
}