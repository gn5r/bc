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
      expect.stringContaining("使い方: backlog <command> [args]")
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("コマンドを指定してください")
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
