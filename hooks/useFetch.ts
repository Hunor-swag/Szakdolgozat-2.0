import { error } from "console";
import Error from "next/error";
import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };

    fetchData()
      .then()
      .catch((error) => console.log(error));
  }, [url]);

  return [data];
};
