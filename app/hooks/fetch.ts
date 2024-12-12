import { useState, useEffect } from 'react';

const useFetch = <T>(url: string, options: RequestInit = {}): { data: T | null; loading: boolean; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const result: T = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);
  return { data, loading, error };
};

export default useFetch;
