import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createBacklogClient } from "../client";
import { Backlog } from "backlog-js";
import * as profileUtils from "../utils/profile";

vi.mock("backlog-js", () => ({
  Backlog: vi.fn(),
}));

vi.mock("../utils/profile", () => ({
  isExistsConfigFile: vi.fn(),
  getProfile: vi.fn(),
}));

describe("createBacklogClient", () => {
  const OLD_ENV = process.env;
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("exit called");
  });

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    delete process.env.BACKLOG_HOST;
    delete process.env.BACKLOG_API_KEY;
    delete process.env.BACKLOG_ACCESS_TOKEN;
  });

  afterEach(() => {
    process.env = OLD_ENV;
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("uses apiKey when both apiKey and accessToken are set", () => {
    process.env.BACKLOG_HOST = "example.backlog.jp";
    process.env.BACKLOG_API_KEY = "fake-api-key";
    process.env.BACKLOG_ACCESS_TOKEN = "fake-access-token";

    createBacklogClient();

    expect(Backlog).toHaveBeenCalledWith({
      host: "example.backlog.jp",
      apiKey: "fake-api-key",
      accessToken: undefined,
    });
  });

  it("uses accessToken if only accessToken is set", () => {
    process.env.BACKLOG_HOST = "example.backlog.jp";
    delete process.env.BACKLOG_API_KEY;
    process.env.BACKLOG_ACCESS_TOKEN = "fake-access-token";

    createBacklogClient();

    expect(Backlog).toHaveBeenCalledWith({
      host: "example.backlog.jp",
      apiKey: undefined,
      accessToken: "fake-access-token",
    });
  });

  it("exits process if BACKLOG_HOST is not set and config file does not exist", () => {
    (profileUtils.isExistsConfigFile as ReturnType<typeof vi.fn>).mockReturnValue(false);

    expect(() => createBacklogClient()).toThrow("exit called");
    expect(errorSpy).toHaveBeenCalledWith("Backlogの認証情報が設定されていません");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
