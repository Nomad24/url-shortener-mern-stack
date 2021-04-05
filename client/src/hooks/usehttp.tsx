import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url: string,
      method: string,
      body: any,
      headers: any
    ) => {
      setLoading(true);
      localStorage.setItem("load", "load");

      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setLoading(false);
        localStorage.removeItem("load");

        return data;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    []
  );

  return { loading, request };
};

export default useHttp;
