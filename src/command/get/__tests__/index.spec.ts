import { describe, it, expect, vi } from "vitest";
import yargs from "yargs";
import { createGetCommand } from "../";
import type { Backlog } from "backlog-js";

describe("createGetCommands", () => {
  const mockClient = {} as unknown as Backlog;

  it("should have correct command and description", () => {
    const getCommand = createGetCommand(mockClient);

    expect(getCommand.command).toBe("get");
    expect(getCommand.describe).toBe("GETリクエストを実行します");
  });

  it("should register the user sub commands", () => {
    const cmd = yargs();
    const commandSpy = vi.spyOn(cmd, "command");
    const getCommand = createGetCommand(mockClient);

    if (typeof getCommand.builder === "function") {
      getCommand.builder(cmd);
    }

    const actualCommands = commandSpy.mock.calls[0][0];
    expect(actualCommands.map((c) => c.command)).toEqual([
      "myself",
      "users",
      "user",
      "userIcon",
    ]);
  });

  it("should apply yargs options like demandCommand and strict", () => {
    const cmd = yargs();

    const demandSpy = vi.spyOn(cmd, "demandCommand");
    const strictSpy = vi.spyOn(cmd, "strict");
    const showHelpSpy = vi.spyOn(cmd, "showHelpOnFail");
    const getCommand = createGetCommand(mockClient);

    if (typeof getCommand.builder === "function") {
      getCommand.builder(cmd);
    }

    expect(demandSpy).toHaveBeenCalledWith(1, "コマンドを指定してください");
    expect(strictSpy).toHaveBeenCalled();
    expect(showHelpSpy).toHaveBeenCalledWith(true);
  });
});
