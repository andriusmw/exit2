import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import { deleteEntryService } from "../services"

export const Entry = ({entry, removeEntry}) => {
  //importamos el contexto del usuario
  const {user, token} = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //creamos funcion deleteEntry
  const deleteEntry = async (id) => {
      try {
        //primero lo borra usando el service
        await deleteEntryService({id, token})

        //removeEntry lo quita del estado de entries
       if(removeEntry) {
        removeEntry(id);
        //Si estamos en entrieslist significa que le hemos pasado removeEntry a la linea 6 y entra al IF
        
       }  else {
        navigate("/"); 
       //Sino, significa que estamos en EntryPage y no lo puede sacar de ninguna lista asi que hacemos navigate al homepage
       }
      

      } catch (error) {
        setError(error.message)
      } 
  }


    //Función votes
    const VoteEntry = async ({user.id, entry.id}) => {
      try {
          //lo pasamos al service
          await voteEntryService({user.id, entry.id});
      } catch (error) {
        setError(error.message)
      }
    }




    return <article>
        <h2> 
            <Link to={`/entry/${entry.id}`}>  {entry.title} </Link>  
        </h2>
        <p>{entry.description}</p>
      {entry.photo ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${entry.photo}`}
          alt={entry.title}
        />
      ) : null}
      <p>Neighborhood: {entry.neighborhood}</p>
      <p>Votes: {entry.votes} </p>
      <p>Status: {entry.status}</p>

        {/*función delete entry */}
        {user && user.role === "admin" ? (
        <section>
          <button onClick={() => deleteEntry(entry.id)} >Delete Entry</button>
          {error ? <p>{error} </p> : null }
        </section>
        ) : null}

          {/*botón de votes */}
          {user ? (
            <section>
              <button onClick={() => VoteEntry(user.id, entry.id)} >Votar</button>
            </section>
          ) : null}

        
    </article>
}