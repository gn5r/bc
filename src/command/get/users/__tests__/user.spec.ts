import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserCommand } from "../user";
import { DebugOption } from "../../../../options/debug";
import * as withUserIdOption from "../../../../options/userId";
import log from "../../../../utils/log";

import type { ArgumentsCamelCase } from "yargs";
import type { Backlog } from "backlog-js";

describe("UserCommand", () => {
  const mockUser: any = {
    id: 1,
    userId: "admin",
    name: "admin",
    roleType: 1,
    lang: "ja",
    nulabAccount: {
      nulabId: "Prm9ZD9DQD5snNWcSYSwZiQoA9WFBUEa2ySznrSnSQRhdC2X8G",
      name: "admin",
      uniqueId: "admin",
    },
    mailAddress: "eguchi@nulab.example",
    lastLoginTime: "2022-09-01T06:35:39Z",
  };
  const mockClient = {
    getUser: vi.fn().mockResolvedValue(mockUser),
  } as unknown as Backlog;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have correct command and description", () => {
    const command = new UserCommand(mockClient);
    expect(command.command).toBe("user");
    expect(command.describe).toContain(
      "ユーザー情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user/",
    );
  });

  it("should call withUserIdOption in build", () => {
    const command = new UserCommand(mockClient);
    const mockArgv = {
      option: vi.fn().mockReturnThis(),
      check: vi.fn().mockReturnThis(),
    };

    const spy = vi.spyOn(withUserIdOption, "withUserIdOption");
    if (typeof command.builder === "function") {
      command.builder(mockArgv as any);
      expect(spy).toHaveBeenCalledWith(mockArgv);
    }
  });

  it("should call client.getUser and log output", async () => {
    const args = {
      _: [],
      $0: "",
      debug: true,
      userId: 1,
    } as ArgumentsCamelCase<DebugOption>;
    const command = new UserCommand(mockClient);

    const logDebugSpy = vi.spyOn(log, "debug").mockImplementation(() => {});
    const logCsvSpy = vi.spyOn(log, "csv").mockImplementation(() => {});

    await command["execute"](args);

    expect(mockClient.getUser).toHaveBeenCalledWith(1);
    expect(logDebugSpy).toHaveBeenCalledWith(true, JSON.stringify(mockUser, null, 2));
    expect(logCsvSpy).toHaveBeenCalledWith(mockUser);
  });
});
