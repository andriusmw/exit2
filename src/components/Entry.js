
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import { deleteEntryService } from "../services"
import { editEntryService } from "../services"

export const Entry = ({entry, removeEntry}) => {
  //importamos el contexto del usuario
  const {user, token} = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //estado visibilidad formulario editar
  const [visible, setVisible] = useState(false)
  const [sending, setSending] = useState(false);
 

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


        //*---------------------------------------------FUNCION EDIT ENTRY ------------------------------------------------

        const EditEntry = async (e) => {
          e.preventDefault();
         let idEntry = entry.id
  
        //  console.log("title: "+ title);
     
          try{
              setSending(true);
        
            
              const data = new FormData(e.target);
              const entry = await editEntryService({idEntry, data,token});
              
              console.log(entry);
           
          } catch (error) {
              console.log(error)
              console.log(error.message)
              setError(error.message);
          } finally {
              setSending(false);
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

        {/*cargar boton delete */}
        {user && user.role === "admin" ? (
        <section>
          <button onClick={() => deleteEntry(entry.id)} >Delete Entry</button>
          {error ? <p>{error} </p> : null }
        </section>
        ) : null}

        {/*Cargar boton editar */}
        {user && user.role === "admin" ? (
          <section>
            <button onClick={() => { setVisible(true)}} >EDITAR</button>
            {error ? <p>{error} </p> : null }
          </section>
        ): null}

          {/*FORMULARIO EDITAR */}
        {visible ? (
            <form onSubmit={EditEntry} >
            <h1>EDITAR ENTRADA</h1>
    
            <fieldset>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title"  />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" />
            </fieldset>    
            <fieldset>
                <label htmlFor="image">Image (optional): </label>
                <input type="file" id="image" name="image"  />
            </fieldset>
            <fieldset> 
                <label htmlFor="city">City: </label>
                <input type="text" id="city" name="city" />
           </fieldset>
           <fieldset>
                <label htmlFor="neighborhood">Neighbourhood: </label>
                <input type="text" id="neighborhood" name="neighborhood"  />
            </fieldset>    
            <fieldset>
                <label htmlFor="status">Status: </label>
                <input type="text" id="status" name="status"  />
            </fieldset>
            
                <button>Send Entry</button>
                {sending ? <p>Sending Entry</p> : null}
                {error ? <p>{error} </p> : null}
    
           
    
        </form>

        ) : null}
        
    </article>

}