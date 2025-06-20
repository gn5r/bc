import { describe, it, expect, vi, beforeEach } from "vitest";
import { UsersCommand } from "../users";
import { DebugOption } from "../../../../options/debug";
import log from "../../../../utils/log";
import type { ArgumentsCamelCase } from "yargs";
import type { Backlog } from "backlog-js";

describe("UsersCommand", () => {
  const mockUser: any[] = [
    {
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
    },
  ];
  const mockClient = {
    getUsers: vi.fn().mockResolvedValue(mockUser),
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
    const command = new UsersCommand(mockClient);
    expect(command.command).toBe("users");
    expect(command.describe).toContain(
      "スペースのユーザーの一覧を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user-list/"
    );
  });

  it("should call client.getUsers and log output", async () => {
    const command = new UsersCommand(mockClient);

    const logDebugSpy = vi.spyOn(log, "debug").mockImplementation(() => {});
    const logCsvSpy = vi.spyOn(log, "csv").mockImplementation(() => {});

    await command["execute"](args);

    expect(mockClient.getUsers).toHaveBeenCalled();
    expect(logDebugSpy).toHaveBeenCalledWith(
      true,
      JSON.stringify(mockUser, null, 2)
    );
    expect(logCsvSpy).toHaveBeenCalledWith(mockUser);
  });
});
