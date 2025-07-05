import { describe, it, expect } from "vitest";
import yargs from "yargs";
import { withProfileOption } from "../profile";

describe("withProfileOption", () => {
  it("sets profile when --profile is passed", async () => {
    const parser = withProfileOption(yargs());
    const argv = await parser.parse(["--profile", "test-profile"]);

    expect(argv).toHaveProperty("profile", "test-profile");
  });

  it("does not set profile when --profile is not passed", async () => {
    const parser = withProfileOption(yargs());
    const argv = await parser.parse([]);

    expect(argv).not.toHaveProperty("profile");
  });
});
