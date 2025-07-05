import { getBacklogConfigDir } from "./dirs";
import fs from "fs";

const BACKLOG_CONFIG_FILE_NAME = "config.json";

export type Profile =
  | { host: string; apiKey: string; accessToken?: never }
  | { host: string; apiKey?: never; accessToken: string };

export interface Profiles {
  [key: string]: Profile | null;
  default: Profile | null;
}

export function getConfigFile(dir = getBacklogConfigDir()) {
  return `${dir}/${BACKLOG_CONFIG_FILE_NAME}`;
}

export function readConfigFile(dir = getBacklogConfigDir()): Profiles {
  const configFile = getConfigFile(dir);
  return JSON.parse(fs.readFileSync(configFile, "utf-8"));
}

export function isExistsConfigFile(dir = getBacklogConfigDir()) {
  const configFile = getConfigFile(dir);
  return fs.existsSync(configFile);
}

export function createConfigFile(dir = getBacklogConfigDir()) {
  const configFile = getConfigFile(dir);
  if (!isExistsConfigFile(dir)) {
    fs.writeFileSync(configFile, JSON.stringify({}, null, 2));
  }
  return configFile;
}

export function createProfile(name: string, profile: Profile, dir = getBacklogConfigDir()) {
  const configFile = getConfigFile(dir);
  const profiles: Profiles = isExistsConfigFile(dir) ? readConfigFile(dir) : { default: null };
  profiles[name] = profile;
  fs.writeFileSync(configFile, JSON.stringify(profiles, null, 2));
  return profiles[name];
}

export function getProfile(name: string, dir = getBacklogConfigDir()): Profile | null {
  const profiles = readConfigFile(dir);
  return profiles[name] || null;
}

export function getDefaultProfile(dir = getBacklogConfigDir()): Profile | null {
  const profiles = readConfigFile(dir);
  return profiles.default || null;
}
