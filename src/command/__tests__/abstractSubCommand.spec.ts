import { AbstractSubCommand } from "../abstractSubCommand";
import { describe, it, expect, vi } from "vitest";
import { ArgumentsCamelCase, Argv } from "yargs";
import { DebugOption } from "../../options/debug";
import { Backlog } from "backlog-js";

class DummyCommand extends AbstractSubCommand {
  command = "dummy";
  describe = "dummy command";
  protected async execute(args: ArgumentsCamelCase<{ debug: boolean }>) {
    // noop
  }
}

describe("AbstractSubCommand", () => {
  const client = {} as Backlog;
  const command = new DummyCommand(client);

  it("should apply withDebugOption in builder", async () => {
    const mockArgv = {
      option: vi.fn().mockReturnThis(),
    } as unknown as Argv<{}>;
    if (typeof command.builder === "function") {
      const result = await command.builder(mockArgv);
      expect(result.option).toHaveBeenCalledWith(
        "debug",
        expect.objectContaining({ type: "boolean", default: false })
      );
    }
  });

  it("should call execute in handler", async () => {
    const cmd = new DummyCommand(client);
    const executeSpy = vi.spyOn(cmd as any, "execute");
    const args = { _: [], $0: "", debug: false };
    await cmd.handler(args);
    expect(executeSpy).toHaveBeenCalledWith(args);
  });

  it("should exit on error in handler", async () => {
    const cmd = new DummyCommand(client);
    vi.spyOn(cmd as any, "execute").mockImplementation(() => {
      throw new Error("fail");
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit called");
    });
    expect(() => cmd.handler({ debug: false } as any)).toThrow("exit called");
    expect(exitSpy).toHaveBeenCalledWith(1);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
