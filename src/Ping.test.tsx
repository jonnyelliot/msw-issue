import React from "react";
import { Ping } from "./Ping";
import { rest } from "msw";
import { render } from "@testing-library/react";
import { server } from "./mocks/server";
import { SWRConfig } from "swr";

const swrConfig = {
  dedupingInterval: 0,
  focusThrottleInterval: 0,
  errorRetryInterval: 0,
};

it("renders mock ping", async () => {
  const { findByText } = render(<Ping />);
  await findByText("Server OK");
});

it("renders mock ping override", async () => {
  // should override the handler in mocks/handlers and return "Mock Override" instead of "Server OK"

  server.use(
    rest.get("/api/v1/ping", (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Mock Override",
          timestamp: Date.now(),
        })
      );
    })
  );

  const { findByText } = render(
    <SWRConfig value={swrConfig}>
      <Ping />
    </SWRConfig>
  );
  await findByText("Mock Override");
});

it("renders error ping", async () => {
  // should override the handler in mocks/handlers and return 500 instead of 200
  server.use(
    rest.get("/api/v1/ping", (_req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const { findByText } = render(
    <SWRConfig value={swrConfig}>
      <Ping />
    </SWRConfig>
  );
  await findByText("Server error");
});
