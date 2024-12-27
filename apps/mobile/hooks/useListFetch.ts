import { api } from "@/api";
import { useState, useEffect, useCallback } from "react";

const useListFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(url);
        setData((prevData) =>
          page === 1
            ? response.data.results
            : [...prevData, ...response.data.results]
        );
        setHasMore(!!response.data.next);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const loadNext = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { data, loading, error, hasMore, page, loadNext };
};

export default useListFetch;
