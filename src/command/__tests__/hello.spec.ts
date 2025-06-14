import { helloCommand } from "../hello";
import { vi, describe, it, expect } from "vitest";

describe("hello command", () => {
  it("prints hello world", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await helloCommand.handler({
      _: [],
      $0: "",
    });

    expect(logSpy).toHaveBeenCalledWith("hello world");

    logSpy.mockRestore();
  });
});
