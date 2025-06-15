import { describe, it, expect } from "vitest";
import yargs from "yargs";
import { withDebugOption } from "../debug";

describe("withDebugOption", () => {
  it("adds the debug option with default false", async () => {
    const parser = withDebugOption(yargs());

    const argv = await parser.parse([]);

    expect(argv).toHaveProperty("debug", false);
  });

  it("enables debug mode when --debug is passed", async () => {
    const parser = withDebugOption(yargs());

    const argv = await parser.parse(["--debug"]);

    expect(argv).toHaveProperty("debug", true);
  });
});
