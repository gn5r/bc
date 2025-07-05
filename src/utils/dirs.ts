import fs from "fs";

export const BACKLOG_CONFIG_BASE_DIR = ".backlog";

export function getHomeDir() {
  return process.platform === "win32" ? process.env.USERPROFILE : process.env.HOME;
}

export function getBacklogConfigDir() {
  const homeDir = getHomeDir();
  return `${homeDir}/${BACKLOG_CONFIG_BASE_DIR}`;
}

export function isExistsBacklogConfigDir(dir = getBacklogConfigDir()) {
  return fs.existsSync(dir);
}

export function createBaclogConfigDir(dir = getBacklogConfigDir()) {
  if (!isExistsBacklogConfigDir(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}
