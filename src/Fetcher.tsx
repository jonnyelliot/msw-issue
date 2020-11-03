import React, { useEffect, useState } from "react";

interface FetcherProps {}

export const Fetcher: React.FC<FetcherProps> = () => {
  const [status, setStatus] = useState<string>();
  useEffect(() => {
    fetch("/hello")
      .then((r: Response) => {
        setStatus(`${r.status}`);
      })
      .catch((e) => {
        setStatus("Failed to fetch");
      });
  }, []);

  return <div>{status}</div>;
};
