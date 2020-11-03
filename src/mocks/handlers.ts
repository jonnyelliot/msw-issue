import { rest } from "msw";
export const handlers = [
  rest.get("/hello", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/v1/ping", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Server OK",
        timestamp: Date.now(),
      })
    );
  }),
];
