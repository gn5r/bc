import { describe, it, expect, vi, beforeEach } from "vitest";
import { createConfigureCommand } from "../index";
import * as dirs from "../../../utils/dirs";
import * as profile from "../../../utils/profile";
import inquirer from "inquirer";

describe("createConfigureCommand", () => {
  const mockArgs = { _: [], $0: "", profile: "test" };

  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(inquirer, "prompt")
      .mockResolvedValueOnce({
        host: "example.backlog.com",
        authType: "apiKey",
      } as any)
      .mockResolvedValueOnce({
        apiKey: "dummy-key",
      } as any);

    vi.spyOn(dirs, "isExistsBacklogConfigDir").mockReturnValue(false);
    vi.spyOn(dirs, "createBaclogConfigDir").mockImplementation(() => "");
    vi.spyOn(profile, "isExistsConfigFile").mockReturnValue(false);
    vi.spyOn(profile, "createConfigFile").mockImplementation(() => "/mock/path/config.json");
    vi.spyOn(profile, "createProfile").mockImplementation(() => ({ host: "", apiKey: "" }));
  });

  it("prompts user and creates profile with apiKey", async () => {
    const command = createConfigureCommand();
    await command.handler(mockArgs);

    expect(inquirer.prompt).toHaveBeenCalledTimes(2);
    expect(profile.createProfile).toHaveBeenCalledWith("test", {
      host: "example.backlog.com",
      apiKey: "dummy-key",
    });
  });

  it("creates profile with accessToken when selected", async () => {
    (inquirer.prompt as unknown as ReturnType<typeof vi.fn>).mockReset();
    vi.spyOn(inquirer, "prompt")
      .mockResolvedValueOnce({
        host: "example.backlog.com",
        authType: "accessToken",
      } as any)
      .mockResolvedValueOnce({
        accessToken: "dummy-token",
      } as any);

    const command = createConfigureCommand();
    await command.handler(mockArgs);

    expect(profile.createProfile).toHaveBeenCalledWith("test", {
      host: "example.backlog.com",
      accessToken: "dummy-token",
    });
  });
});
