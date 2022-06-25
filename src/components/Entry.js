export const Entry = ({ entry }) => {
  return (
    <article>
      <h2>{entry.title}</h2>
      <p>{entry.description}</p>
      {entry.photo ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${entry.photo}`}
          alt={entry.title}
        />
      ) : null}
      <p>Neighborhood: {entry.neighborhood}</p>
      <p>Status: {entry.status}</p>
    </article>
  );
};
