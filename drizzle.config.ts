import type { Config } from 'drizzle-kit'

export default {
  out: "./server/migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: "pglite://",
  },
} satisfies Config;
