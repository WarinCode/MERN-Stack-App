import { useState, useEffect } from "react";

export default function useConnection() {
  const [connectionSuccessfully, setConnectionSuccessfully] = useState(false);
  const { VITE_API_URL } = import.meta.env;

  useEffect(() => {
    async function test() {
      const response = await fetch(VITE_API_URL + "/connect");
      const { databaseStatus } = await response.json();
      setConnectionSuccessfully(databaseStatus.ok);
    }
    test();
  }, []);

  return connectionSuccessfully;
}
