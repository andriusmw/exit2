import { EntriesList } from "../components/EntriesList";
import useEntries from "../hoooks/useEntries";

export const HomePage = () => {
  const { entries, loading, error } = useEntries();
  console.log(entries, loading, error);

  if (loading) return <p>Cargando Entries...</p>;
  if (error) return <p>{error}</p>;

  console.log(entries);

  return (
    <section>
      <h1>Últimos Entradas</h1>
      <EntriesList entries={entries} />
    </section>
  );
};
