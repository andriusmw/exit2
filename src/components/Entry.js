import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteEntryService } from "../services";
import { editEntryService } from "../services";

export const Entry = ({ entry, removeEntry }) => {
  //importamos el contexto del usuario
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);
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
    <article>
      <h2>
        <Link to={`/entry/${entry.id}`}> {entry.title} </Link>
      </h2>
      <p>{entry.description}</p>
      {entry.photo ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${entry.photo}`}
          alt={entry.title}
        />
      ) : null}
      {/* Un link que nos lleve a getEntriesByNeighborhood */}
      <Link to={`/entries/${entry.neighborhood}`}>
        <p>Neighborhood: {entry.neighborhood}</p>
      </Link>
      <p>Votes: {entry.votes} </p>
      <p>Status: {entry.status}</p>
      {user && user.role === "admin" ? (
        <section>
          <button onClick={() => deleteEntry(entry.id)}>Delete Entry</button>
          {error ? <p>{error} </p> : null}
        </section>
      ) : null}
      {/*       Edit Entry Button         */}
      {user && user.role === "admin" ? (
        <section>
          <Link to={`/entry/${entry.id}/edit`}>Edit Entry</Link>
        </section>
      ) : null}
    </article>
  );
};
