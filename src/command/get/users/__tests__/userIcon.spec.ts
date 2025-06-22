import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserIconCommand } from "../userIcon";
import * as withUserIdOption from "../../../../options/userId";
import * as withOutputOption from "../../../../options/output";
import log from "../../../../utils/log";
import * as fs from "fs";
import * as path from "path";
import * as stream from "stream";

import type { DebugOption } from "../../../../options/debug";
import type { OutputOption } from "../../../../options/output";
import type { ArgumentsCamelCase } from "yargs";
import type { Backlog, Entity } from "backlog-js";

const pipelineMock = vi.fn().mockResolvedValue(undefined);

vi.mock("fs", () => ({
  createWriteStream: vi.fn(() => ({})),
}));
vi.mock("path", () => ({
  resolve: vi.fn((...args: string[]) => args.join("/")),
}));
vi.mock("stream", () => ({
  pipeline: vi.fn((...args: any[]) => {
    const cb = args.at(-1);
    if (typeof cb === "function") cb();
  }),
  Readable: class {},
}));
vi.mock("util", () => ({
  promisify: () => pipelineMock,
}));

describe("UserIconCommand", () => {
  const dummyStream = {} as stream.Readable;
  const dummyFilename = "user_icon.gif";
  const mockUserIcon: Entity.File.FileData = {
    body: dummyStream,
    url: "https://example.com",
    filename: dummyFilename,
  };
  const mockClient = {
    getUserIcon: vi.fn().mockResolvedValue(mockUserIcon),
  } as unknown as Backlog;

  const mockWriteStream = {} as unknown as fs.WriteStream;
  const logDebugSpy = vi.spyOn(log, "debug").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have correct command and description", () => {
    const command = new UserIconCommand(mockClient);
    expect(command.command).toBe("userIcon");
    expect(command.describe).toContain(
      "ユーザーのアイコン画像を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user-icon/"
    );
  });

  it("should call withUserIdOption in build", () => {
    const command = new UserIconCommand(mockClient);
    const mockArgv = {
      option: vi.fn().mockReturnThis(),
      check: vi.fn().mockReturnThis(),
    };

    const spy = vi.spyOn(withUserIdOption, "withUserIdOption");
    if (typeof command.builder === "function") {
      command.builder(mockArgv as any);
      expect(spy).toHaveBeenCalledWith(mockArgv);
    }
  });

  it("should call withOutputOption in build", () => {
    const command = new UserIconCommand(mockClient);
    const mockArgv = {
      option: vi.fn().mockReturnThis(),
      check: vi.fn().mockReturnThis(),
    };

    const spy = vi.spyOn(withOutputOption, "withOutputOption");
    if (typeof command.builder === "function") {
      command.builder(mockArgv as any);
      expect(spy).toHaveBeenCalledWith(mockArgv);
    }
  });

  it("should fetch icon and save to default path", async () => {
    const args = {
      _: [],
      $0: "",
      debug: true,
      userId: 1,
    } as ArgumentsCamelCase<DebugOption & OutputOption>;

    const command = new UserIconCommand(mockClient);
    await command["execute"](args);

    expect(mockClient.getUserIcon).toHaveBeenCalledWith(1);
    expect(logDebugSpy).toHaveBeenCalledWith(
      true,
      JSON.stringify(mockUserIcon, null, 2)
    );
    expect(fs.createWriteStream).toHaveBeenCalledWith(
      expect.stringContaining(dummyFilename)
    );
    expect(pipelineMock).toHaveBeenCalledWith(dummyStream, mockWriteStream);
  });

  it("should fetch icon and save to specified path", async () => {
    const args = {
      _: [],
      $0: "",
      debug: false,
      userId: 1,
      output: "./custom/path/icon.gif",
    } as ArgumentsCamelCase<DebugOption & OutputOption>;

    const command = new UserIconCommand(mockClient);
    await command["execute"](args);

    expect(logDebugSpy).toHaveBeenCalledWith(false, "./custom/path/icon.gif");
    expect(path.resolve).toHaveBeenCalledWith("./custom/path/icon.gif");
    expect(fs.createWriteStream).toHaveBeenCalledWith("./custom/path/icon.gif");
    expect(pipelineMock).toHaveBeenCalledWith(dummyStream, mockWriteStream);
  });
});
