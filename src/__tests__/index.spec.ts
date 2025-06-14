import { describe, it, expect, vi } from "vitest";
import { createCli } from "../index";

describe("index.ts", () => {
  it("shows help and error when no command is given", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });

    try {
      await createCli().parse([], { from: "user" });
    } catch {
      // Catch the error thrown by process.exit
    }

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("usage: backlog <command> [args]")
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("You need at least one command before moving on")
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("prints hello world when 'hello' command is used", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await createCli().parse(["hello"]);

    expect(logSpy).toHaveBeenCalledWith("hello world");
    expect(errorSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
