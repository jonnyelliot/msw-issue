import React from "react";
import { Ping } from "./Ping";
import { render } from "@testing-library/react";
import { SWRConfig, cache } from "swr";

const swrConfig = {
  dedupingInterval: 0,
  focusThrottleInterval: 0,
  errorRetryInterval: 0,
};

afterEach(() => {
  cache.clear();
});

it("renders mock ping", async () => {
  const { findByText } = render(
    <SWRConfig
      value={{
        ...swrConfig,
        fetcher: async () => {
          return Promise.resolve({
            message: "Server OK",
            timestamp: Date.now(),
          });
        },
      }}
    >
      <Ping />
    </SWRConfig>
  );
  await findByText("Server OK");
});

it("renders mock ping override", async () => {
  // should override the handler in mocks/handlers and return "Mock Override" instead of "Server OK"
  // FAILS

  const { findByText } = render(
    <SWRConfig
      value={{
        ...swrConfig,
        fetcher: async () => {
          return Promise.resolve({
            message: "Mock Override",
            timestamp: Date.now(),
          });
        },
      }}
    >
      <Ping />
    </SWRConfig>
  );
  await findByText("Mock Override");
});

it("renders error ping", async () => {
  // should override the handler in mocks/handlers and return 500 instead of 200
  // FAILS

  const { findByText } = render(
    <SWRConfig
      value={{
        ...swrConfig,
        fetcher: async () => {
          return Promise.reject();
        },
      }}
    >
      <Ping />
    </SWRConfig>
  );
  await findByText("Server error");
});
