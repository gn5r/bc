import { Backlog } from "backlog-js";
import { MyselfCommand } from "./myself";
import { UsersCommand } from "./users";
import { UserCommand } from "./user";
import { UserIconCommand } from "./userIcon";

export function createGetUsersCommands(client: Backlog) {
  return [
    new MyselfCommand(client),
    new UsersCommand(client),
    new UserCommand(client),
    new UserIconCommand(client),
  ];
}
