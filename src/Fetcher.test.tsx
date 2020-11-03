import React from "react";
import { render } from "@testing-library/react";
import { Fetcher } from "./Fetcher";
import { server } from "./mocks/server";
import { rest } from "msw";

it("renders mock", async () => {
  const { findByText } = render(<Fetcher />);
  await findByText("200");
});

it("renders error", async () => {
  // override the handler in mocks/handlers
  server.use(
    rest.get("/hello", (_req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const { findByText } = render(<Fetcher />);
  await findByText("500");
});
