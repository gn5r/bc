import { describe, it, expect } from "vitest";
import { createGetUsersCommands } from "../index";
import { MyselfCommand } from "../myself";
import { UsersCommand } from "../users";
import { UserCommand } from "../user";
import { UserIconCommand } from "../userIcon";

describe("createGetUsersCommands", () => {
  it("should return instances of expected command classes", () => {
    const mockClient = {} as any;
    const result = createGetUsersCommands(mockClient);

    expect(result).toHaveLength(4);
    expect(result[0]).toBeInstanceOf(MyselfCommand);
    expect(result[1]).toBeInstanceOf(UsersCommand);
    expect(result[2]).toBeInstanceOf(UserCommand);
    expect(result[3]).toBeInstanceOf(UserIconCommand);
  });
});
