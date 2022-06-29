import { Entry } from "./Entry";

export const EntriesList = ({entries}) => {
    return entries.length ? (
    <ul>
        {entries.map((entry) => (
        <li key={entry.id}>
            <Entry entry={entry} /> 
        </li>
        ))}
    </ul>
    ) :( 
    <p>No hay entradas disponibles...</p>
    );
};