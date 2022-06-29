import { useEffect, useState } from "react";
import { getAllEntriesWithVotesService } from "../services";

const useEntries = () => {
    //estado
    const [entries, setEntries] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const loadEntries = async () => {
            try {
                setLoding(true);

                const data = await getAllEntriesWithVotesService();

                setEntries(data);
               
            } catch (error) {
                setError(error.message);
            } finally {
                setLoding(false);
            }
        }

        loadEntries();
    }, []);

    return { entries, loading, error};
        
};

export default useEntries;