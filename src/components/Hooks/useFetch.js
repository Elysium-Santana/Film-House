import { useState } from 'react';
function useFetch(url) {
  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);

  const request = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setJson(json);
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return { json, error, request };
}

export default useFetch;
