import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle/migrations",
  schema: "./src/schemas/index.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
