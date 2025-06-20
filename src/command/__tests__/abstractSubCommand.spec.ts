import { AbstractSubCommand } from "../abstractSubCommand";
import { describe, it, expect, vi } from "vitest";
import { ArgumentsCamelCase, Argv } from "yargs";
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

  it("should log generic error and exit", async () => {
    const cmd = new DummyCommand(client);

    vi.spyOn(cmd as any, "execute").mockImplementation(() => {
      throw new Error("fail");
    });

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit called");
    });

    await expect(() => cmd.handler({ debug: false } as any)).rejects.toThrow(
      "exit called"
    );

    expect(errorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(exitSpy).toHaveBeenCalledWith(1);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  // TODO: Uncomment this test when BacklogError is properly defined
  // it("should log BacklogError and exit", async () => {
  //   const cmd = new DummyCommand(client);

  //   const backlogError = new BacklogError.BacklogApiError(
  //     {
  //       status: 404,
  //       statusText: "Not Found",
  //       url: "https://example.com/api",
  //       headers: new Headers({ "Content-Type": "application/json" }),
  //       ok: false,
  //     } as unknown as Response,
  //     {
  //       errors: [
  //         { message: "User not found", code: 6, errorInfo: "", moreInfo: "" },
  //       ],
  //     }
  //   );

  //   vi.spyOn(cmd as any, "execute").mockImplementation(() => {
  //     throw backlogError;
  //   });

  //   const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  //   const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
  //     throw new Error("exit called");
  //   });

  //   await expect(() => cmd.handler({ debug: false } as any)).rejects.toThrow(
  //     "exit called"
  //   );

  //   expect(errorSpy).toHaveBeenCalledWith(backlogError.body);
  //   expect(exitSpy).toHaveBeenCalledWith(1);

  //   errorSpy.mockRestore();
  //   exitSpy.mockRestore();
  // });

  it("should log BacklogError.body.errors and exit", async () => {
    const cmd = new DummyCommand(client);

    const backlogError = {
      _name: "BacklogApiError",
      _status: 404,
      _url: "https://example.com/api",
      _body: {
        errors: [{ message: "User not found", code: 6, moreInfo: "" }],
      },
    };

    vi.spyOn(cmd as any, "execute").mockImplementation(() => {
      throw backlogError;
    });

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit called");
    });

    await expect(() => cmd.handler({ debug: false } as any)).rejects.toThrow(
      "exit called"
    );

    expect(errorSpy).toHaveBeenCalledWith(backlogError._body);
    expect(exitSpy).toHaveBeenCalledWith(1);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
