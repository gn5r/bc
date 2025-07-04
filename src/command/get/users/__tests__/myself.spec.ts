import { describe, it, expect, vi, beforeEach } from "vitest";
import { MyselfCommand } from "../myself";
import { DebugOption } from "../../../../options/debug";
import log from "../../../../utils/log";

import type { ArgumentsCamelCase } from "yargs";
import type { Backlog } from "backlog-js";

describe("MyselfCommand", () => {
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
    getMyself: vi.fn().mockResolvedValue(mockUser),
  } as unknown as Backlog;

  const args = {
    _: [],
    $0: "",
    debug: true,
  } as ArgumentsCamelCase<DebugOption>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have correct command and description", () => {
    const command = new MyselfCommand(mockClient);
    expect(command.command).toBe("myself");
    expect(command.describe).toContain(
      "APIとの認証に使用しているユーザーの情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/",
    );
  });

  it("should call client.getMyself and log output", async () => {
    const command = new MyselfCommand(mockClient);

    const logDebugSpy = vi.spyOn(log, "debug").mockImplementation(() => {});
    const logCsvSpy = vi.spyOn(log, "csv").mockImplementation(() => {});

    await command["execute"](args);

    expect(mockClient.getMyself).toHaveBeenCalled();
    expect(logDebugSpy).toHaveBeenCalledWith(true, JSON.stringify(mockUser, null, 2));
    expect(logCsvSpy).toHaveBeenCalledWith(mockUser);
  });
});
