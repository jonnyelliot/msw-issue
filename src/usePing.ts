import useSWR, { responseInterface } from "swr";
import { useState, useEffect } from "react";

export interface Status {
  message: string;
  timestamp: Date;
}

export function usePing(): responseInterface<Status, Error> {
  // WORKS WHEN THIS IS UNCOMMENTED
  //
  // const [status, setStatus] = useState<Status>();
  // const [error, setError] = useState<Error>();
  // useEffect(() => {
  //   fetch("/api/v1/ping")
  //     .then((r: Response) => {
  //       if (!r.ok) {
  //         setError(new Error(r.statusText));
  //       }
  //       return r;
  //     })
  //     .then((r) => r.json())
  //     .then((j) => setStatus(j as Status))
  //     .catch((e) => {
  //       setError(new Error("Failed to fetch"));
  //     });
  // }, []);
  // return {
  //   data: status,
  //   error,
  //   isValidating: false,
  //   mutate: () => Promise.resolve(undefined),
  //   revalidate: () => Promise.resolve(false),
  // };

  // OR IF THIS IS UNCOMMENTED
  // const random = React.useRef(Date.now());
  // return useSWR<Status, Error>(["/api/v1/ping", random], fetcher);

  // THIS FAILS THE TESTS
  return useSWR<Status, Error>("/api/v1/ping");
}
