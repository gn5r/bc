import { MyselfCommand } from "./myself";
import { UsersCommand } from "./users";
import { UserCommand } from "./user";
import { UserIconCommand } from "./userIcon";

export function createGetUsersCommands() {
  return [new MyselfCommand(), new UsersCommand(), new UserCommand(), new UserIconCommand()];
}
