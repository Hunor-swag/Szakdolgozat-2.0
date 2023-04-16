import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const jsonData = text ? JSON.parse(text) : null;
        setData(jsonData);
      } catch (error: any) {
        console.log(error.message);
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
