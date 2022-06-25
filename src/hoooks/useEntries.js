import { useEffect, useState } from "react";
import { getEntriesService } from "../services";

const useEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);

        const data = await getEntriesService();
        setEntries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  return { entries, loading, error };
};

export default useEntries;
