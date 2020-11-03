import React from "react";
import { usePing } from "./usePing";
/**
 * Ping component gets server status and displays
 */
export const Ping: React.FC = () => {
  const { data, error } = usePing();
  if (!error && !data) return <div>Loading</div>;
  if (error) return <div color="error">Server error</div>;
  console.log(data?.message);
  return <div>{data?.message}</div>;
};
