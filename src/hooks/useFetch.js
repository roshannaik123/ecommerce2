import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataFromApi(endpoint);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, handle the error (e.g., set an error state)
      }
    };

    fetchData();
  }, [endpoint]);

  return { data };
};

export default useFetch;
