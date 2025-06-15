import { describe, it, expect, vi } from "vitest";
import yargs from "yargs";
import { getCommand } from "../";
import { myselfCommand } from "../users";

describe("getCommand", () => {
  it("should have correct command and description", () => {
    expect(getCommand.command).toBe("get");
    expect(getCommand.describe).toBe("GETリクエストを実行します");
  });

  it("should register the myselfCommand subcommand", () => {
    const cmd = yargs();

    const commandSpy = vi.spyOn(cmd, "command");

    if (typeof getCommand.builder === "function") {
      getCommand.builder(cmd);
    }

    expect(commandSpy).toHaveBeenCalledWith(myselfCommand);
  });

  it("should apply yargs options like demandCommand and strict", () => {
    const cmd = yargs();

    const demandSpy = vi.spyOn(cmd, "demandCommand");
    const strictSpy = vi.spyOn(cmd, "strict");
    const showHelpSpy = vi.spyOn(cmd, "showHelpOnFail");

    if (typeof getCommand.builder === "function") {
      getCommand.builder(cmd);
    }

    expect(demandSpy).toHaveBeenCalledWith(1, "コマンドを指定してください");
    expect(strictSpy).toHaveBeenCalled();
    expect(showHelpSpy).toHaveBeenCalledWith(true);
  });
});
