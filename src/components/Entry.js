
import { useContext, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import { deleteEntryService } from "../services"
import { editEntryService } from "../services"
import { voteEntryService } from "../services"
import swal from "sweetalert"

export const Entry = ({entry, removeEntry}) => {
  //importamos el contexto del usuario
  const {user, token} = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //estado visibilidad formulario editar
  const [visible, setVisible] = useState(false)
  const [sending, setSending] = useState(false);
  //CREAMOS ESTADOS DE LOS CAMPOS DE LA ENTRADA
  const [titleEntry, setTitleEntry] = useState("");
  const [descrEntry, setDescrEntry] = useState("");
  //const [photoEntry, setPhotoEntry] = useState("");
  let imageInputRef = useRef();
  const [cityEntry, setCityEntry] = useState("");
  const [neighEntry, setNeighEntry] = useState("");
  const [statusEntry, setStatusEntry] = useState("");

 

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
    const VoteEntry = async () => {

      console.log("user.id en boton votar =" + user.id )
      console.log("entry.id en boton votar =" + entry.id )

  
      let userId = user.id;
      let entryId = entry.id;
      console.log("userid en boton votar =" + userId )
      console.log("entryid en boton votar =" + entryId )
      try {
          //lo pasamos al service
          //console.log("userid en voteentry=" + userId )
          //console.log("entryid en voteentry=" + entryId )
          await voteEntryService({userId, entryId, token});
      } catch (error) {
        swal(`Error`,`${error.message}`,`error` )
        setError("")
      }
    }



        //*---------FUNCION EDIT ENTRY ------------

        const EditEntry = async (e) => {
          e.preventDefault();
         let idEntry = entry.id

        
  
        //  console.log("title: "+ title);
     
          try{
              setSending(true);
        
            
              const data = new FormData(e.target);
              console.log("data:")
              console.log(data)
              const entry = await editEntryService({idEntry, data,token});
              
              console.log(entry);
              setError("");
              navigate(0);
          } catch (error) {
              console.log(error)
              console.log(error.message)
              swal(`Error`,`${error.message}`,`error` )
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
      <p>City: {entry.city} </p>
      <p>Neighborhood: {entry.neighborhood}</p>
      <p>Votes: {entry.votes || "0"} </p>
      <p>Status: {entry.status}</p>


         {/*botón de votes */}
         {user ? (
            <section>
              <button onClick={() => {
                
                VoteEntry()}} >Votar</button>
              
            </section>
          ) : null}


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
            <button onClick={() => { 
              
              setVisible(true)
               //SET ESTADOS para que aparezcan los campos rellenos en el form editar
               setTitleEntry(entry.title);
               setDescrEntry(entry.description);
              // setPhotoEntry(entry.photo);
              // imageInputRef = entry.photo
               setCityEntry(entry.city);
               setNeighEntry(entry.neighborhood);
               setStatusEntry(entry.status);

              
              
              }} >EDITAR</button>
            {error ? <p>{error} </p> : null }
          </section>
        ): null}

          {/*FORMULARIO EDITAR */}
        {visible ? (
            <form onSubmit={EditEntry} >
            <h1>EDITAR ENTRADA</h1>
    
            <fieldset>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" defaultValue={titleEntry}  />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" defaultValue={descrEntry} />
            </fieldset>    
            <fieldset>
                <label htmlFor="image">Image (optional): </label>
                <input type="file" id="image" name="image" /*defaultValue={photoEntry} */ />
            </fieldset>
            <fieldset> 
                <label htmlFor="city">City: </label>
                <input type="text" id="city" name="city" defaultValue={cityEntry} />
           </fieldset>
           <fieldset>
                <label htmlFor="neighborhood">Neighbourhood: </label>
                <input type="text" id="neighborhood" name="neighborhood" defaultValue={neighEntry} />
            </fieldset>    
            <fieldset>
                <label htmlFor="status">Status: </label>
                <input type="text" id="status" name="status" defaultValue={statusEntry}  />
            </fieldset>
            
                <button>Send Entry</button>
                {sending ? <p>Sending Entry</p> : null}
                {error ? <p>{error} </p> : null}
    
           
    
        </form>

        ) : null}
        
    </article>

}