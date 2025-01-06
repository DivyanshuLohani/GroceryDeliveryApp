import { api } from "@/api";
import { useState, useEffect, useCallback } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (changeLoading: boolean = true) => {
      if (changeLoading) setLoading(true);
      setError(null);
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
};

export default useFetch;
