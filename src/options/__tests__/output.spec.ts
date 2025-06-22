import { describe, it, expect } from "vitest";
import yargs from "yargs";
import { withOutputOption } from "../output";

describe("withOutputOption", () => {
  it("sets output file when --output is passed", async () => {
    const parser = withOutputOption(yargs());
    const argv = await parser.parse(["--output", "file.txt"]);

    expect(argv).toHaveProperty("output", "file.txt");
  });
});
