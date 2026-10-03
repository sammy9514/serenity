import { defineConfig } from "vitest/config";

// the services import the stripe client, which refuses to load without a key,
// so tests read the same .env the app does
export default defineConfig({
  test: {
    setupFiles: ["dotenv/config"],
  },
});
