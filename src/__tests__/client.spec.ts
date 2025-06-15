import { describe, it, expect, vi, beforeEach } from "vitest";
import { createBacklogClient } from "../client";
import { Backlog } from "backlog-js";

vi.mock("backlog-js", () => ({
  Backlog: vi.fn(),
}));

describe("createClient", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV }; // 環境変数をリセット
  });

  it("should throw if BACKLOG_HOST is not set", () => {
    process.env.BACKLOG_HOST = undefined;
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
    const mockError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => createBacklogClient()).toThrow("process.exit called");
    expect(mockError).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should create Backlog client with environment variables", () => {
    process.env.BACKLOG_HOST = "example.backlog.jp";
    process.env.BACKLOG_API_KEY = "fake-api-key";
    process.env.BACKLOG_ACCESS_TOKEN = "fake-access-token";

    createBacklogClient();

    expect(Backlog).toHaveBeenCalledWith({
      host: "example.backlog.jp",
      apiKey: "fake-api-key",
      accessToken: "fake-access-token",
    });
  });
});
