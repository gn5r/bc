import { Backlog } from "backlog-js";
import { MyselfCommand } from "./myself";
import { UsersCommand } from "./users";
import { UserCommand } from "./user";

export function createGetUsersCommands(client: Backlog) {
  return [
    new MyselfCommand(client),
    new UsersCommand(client),
    new UserCommand(client),
  ];
}
