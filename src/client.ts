import { Backlog } from "backlog-js";

const host = process.env.BACKLOG_HOST;
if (!host) {
  console.error(
    "BACKLOG_HOST is set, but it should not be. Please check your environment variables."
  );
  process.exit(1);
}

export default new Backlog({
  host: host,
  apiKey: process.env.BACKLOG_API_KEY,
  accessToken: process.env.BACKLOG_ACCESS_TOKEN,
});
