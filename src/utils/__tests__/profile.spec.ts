import { describe, it, expect, vi, beforeEach } from "vitest";
import * as profileModule from "../profile";
import fs from "fs";

describe("profile.ts", () => {
  const mockDir = "/mock/home/.backlog";
  const mockConfigPath = `${mockDir}/config.json`;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns correct config file path", () => {
    const path = profileModule.getConfigFile(mockDir);
    expect(path).toBe(mockConfigPath);
  });

  it("returns true if config file exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const exists = profileModule.isExistsConfigFile(mockDir);
    expect(exists).toBe(true);
  });

  it("creates config file if not exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const writeFileSyncMock = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const path = profileModule.createConfigFile(mockDir);
    expect(path).toBe(mockConfigPath);
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      mockConfigPath,
      JSON.stringify({ default: null }, null, 2),
    );
  });

  it("creates profile correctly", () => {
    const existingProfiles = { default: null };
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(existingProfiles));
    const writeFileSyncMock = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});

    const profile = { host: "example.backlog.com", apiKey: "testkey" };
    const result = profileModule.createProfile("test", profile, mockDir);

    expect(result).toEqual(profile);
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      mockConfigPath,
      JSON.stringify({ ...existingProfiles, test: profile }, null, 2),
    );
  });

  it("returns correct profile by name", () => {
    const profiles = {
      default: null,
      work: { host: "example.backlog.com", accessToken: "token123" },
    };
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(profiles));
    const result = profileModule.getProfile("work", mockDir);
    expect(result).toEqual(profiles.work);
  });

  it("returns default profile", () => {
    const profiles = {
      default: { host: "example.backlog.com", apiKey: "apikey" },
    };
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(profiles));
    const result = profileModule.getDefaultProfile();
    expect(result).toEqual(profiles.default);
  });
});
