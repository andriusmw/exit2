import "./style.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteEntryService } from "../../services";
//import { editEntryService } from "../services";

export const Entry = ({ entry, removeEntry }) => {
  //importamos el contexto del usuario
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  //const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  //creamos funcion deleteEntry
  const deleteEntry = async (id) => {
    try {
      //primero lo borra usando el service
      await deleteEntryService({ id, token });

      //removeEntry lo quita del estado de entries
      if (removeEntry) {
        removeEntry(id);
        //Si estamos en entrieslist significa que le hemos pasado removeEntry a la linea 6 y entra al IF
      } else {
        navigate("/");
        //Sino, significa que estamos en EntryPage y no lo puede sacar de ninguna lista asi que hacemos navigate al homepage
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="card">
      <img
        src="https://images.unsplash.com/photo-1657397658615-5334c00cac92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        alt="dummy for dev"
      />

      <div className="info">
        <h2>
          <Link to={`/entry/${entry.id}`}> {entry.title} </Link>
        </h2>
        <p>Description: {entry.description}</p>
        <p>City: {entry.city}</p>
        <Link to={`/entries/${entry.neighborhood}`}>
          <p>Neighborhood: {entry.neighborhood}</p>
        </Link>
        <p>Status: {entry.status}</p>
      </div>

      {/* {entry.photo ? (
        <img
          className="img"
          src={`${process.env.REACT_APP_BACKEND}/uploads/${entry.photo}`}
          alt={entry.title}
        />
      ) : null} */}

      <div className="buttons">
        <p>Votes: {entry.votes} </p>

        {/*       Delete Entry Button        */}
        {user && user.role === "admin" ? (
          <section>
            <button onClick={() => deleteEntry(entry.id)}>Delete Entry</button>
            {error ? <p>{error} </p> : null}
          </section>
        ) : null}

        {/*       Edit Entry Button         */}
        {user && user.role === "admin" ? (
          <section>
            <button onClick={<Link to={`/entry/${entry.id}/edit`}></Link>}>
              Edit Entry
            </button>
          </section>
        ) : null}
      </div>
    </article>
  );
};
