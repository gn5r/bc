import { describe, it, vi, expect, beforeEach } from "vitest";
import { createListCommand } from "../list";
import * as profileModule from "../../../utils/profile";

describe("createListCommand", () => {
  const command = createListCommand();

  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.restoreAllMocks();

    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("does nothing if config file does not exist", async () => {
    vi.spyOn(profileModule, "isExistsConfigFile").mockReturnValue(false);

    await command.handler({ _: [], $0: "" });

    expect(logSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("logs specific profile if it exists", async () => {
    vi.spyOn(profileModule, "isExistsConfigFile").mockReturnValue(true);
    vi.spyOn(profileModule, "getProfile").mockReturnValue({
      host: "example.backlog.com",
      apiKey: "dummy-key",
    });

    await command.handler({ _: [], $0: "", profile: "test" });

    expect(logSpy).toHaveBeenCalledWith({
      host: "example.backlog.com",
      apiKey: "dummy-key",
    });
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("logs error if specific profile does not exist", async () => {
    vi.spyOn(profileModule, "isExistsConfigFile").mockReturnValue(true);
    vi.spyOn(profileModule, "getProfile").mockReturnValue(null);

    await command.handler({ _: [], $0: "", profile: "notfound" });

    expect(errorSpy).toHaveBeenCalledWith('Profile "notfound" does not exist.');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("logs all profiles if no profile name is given", async () => {
    const mockProfiles = {
      default: { host: "example.backlog.com", apiKey: "dummy-key" },
      test: { host: "test.backlog.com", accessToken: "token" },
    };

    vi.spyOn(profileModule, "isExistsConfigFile").mockReturnValue(true);
    vi.spyOn(profileModule, "readProfiles").mockReturnValue(mockProfiles);

    await command.handler({ _: [], $0: "" });

    expect(logSpy).toHaveBeenCalledWith(mockProfiles);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
