import { Hono } from "hono";

import { db } from "@/lib/db";

const app = new Hono();

app.get("/projects", async (c) => {
  const projects = await db.query.showcases.findMany({
    with: {
      user: true,
    },
  });

  return c.json(projects);
});

export default app;
