import { describe, it, expect, vi, beforeEach } from "vitest";
import * as dirs from "../dirs";
import fs from "fs";

describe("dirs.ts", () => {
  const mockDir = "/mock/home/.backlog";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns correct home directory on non-Windows", () => {
    vi.spyOn(process, "platform", "get").mockReturnValue("linux");
    process.env.HOME = "/mock/home";
    const home = dirs.getHomeDir();
    expect(home).toBe("/mock/home");
  });

  it("returns correct home directory on Windows", () => {
    vi.spyOn(process, "platform", "get").mockReturnValue("win32");
    process.env.USERPROFILE = "C:\\mock\\home";
    const home = dirs.getHomeDir();
    expect(home).toBe("C:\\mock\\home");
  });

  it("returns correct backlog config directory path", () => {
    vi.spyOn(dirs, "getHomeDir").mockReturnValue("/mock/home");
    const dir = dirs.getBacklogConfigDir();
    expect(dir).toBe("/mock/home/.backlog");
  });

  it("returns true if backlog config directory exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const exists = dirs.isExistsBacklogConfigDir(mockDir);
    expect(exists).toBe(true);
  });

  it("creates backlog config directory if not exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const mkdirMock = vi.spyOn(fs, "mkdirSync").mockImplementation(() => "");
    const result = dirs.createBaclogConfigDir(mockDir);
    expect(result).toBe(mockDir);
    expect(mkdirMock).toHaveBeenCalledWith(mockDir, { recursive: true });
  });

  it("does not create backlog config directory if exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const mkdirMock = vi.spyOn(fs, "mkdirSync").mockImplementation(() => "");
    const result = dirs.createBaclogConfigDir(mockDir);
    expect(result).toBe(mockDir);
    expect(mkdirMock).not.toHaveBeenCalled();
  });
});
