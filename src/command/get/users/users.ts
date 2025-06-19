import { AbstractSubCommand } from "../../abstractSubCommand";
import log from "../../../utils/log";
import { Entity } from "backlog-js";
import { ArgumentsCamelCase } from "yargs";
import { DebugOption } from "../../../options/debug";

export class UsersCommand extends AbstractSubCommand {
  command = "users";
  describe =
    "スペースのユーザーの一覧を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user-list/";
  protected async execute(
    args: ArgumentsCamelCase<DebugOption>
  ): Promise<void> {
    const users = await this.client.getUsers();
    log.debug(args.debug, JSON.stringify(users, null, 2));
    log.csv<Entity.User.User>(users);
  }
}
