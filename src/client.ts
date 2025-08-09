import { Backlog } from "backlog-js";
import { isExistsConfigFile, getProfile } from "./utils/profile";

export function createBacklogClient(profileName = "default") {
  const host = process.env.BACKLOG_HOST;
  const apiKey = process.env.BACKLOG_API_KEY;
  const accessToken = process.env.BACKLOG_ACCESS_TOKEN;

  if (host && (apiKey || accessToken)) {
    if (apiKey) {
      return new Backlog({
        host,
        apiKey,
      });
    } else if (accessToken) {
      return new Backlog({
        host,
        accessToken,
      });
    }
  }

  if (!isExistsConfigFile()) {
    console.error("Backlogの認証情報が設定されていません");
    process.exit(1);
  }

  const profile = getProfile(profileName);
  if (!profile) {
    console.error(`"${profileName}"プロファイルが見つかりません`);
    process.exit(1);
  }

  if (profile.apiKey || profile.accessToken) {
    return new Backlog({
      host: profile.host,
      apiKey: profile.apiKey ?? undefined,
      accessToken: profile.accessToken ?? undefined,
    });
  }

  console.error("Backlogクライアントの生成に失敗しました");
  process.exit(1);
}
