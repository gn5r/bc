import { AbstractSubCommand } from "../../abstractSubCommand";
import { withUserIdOption, UserIdOption } from "../../../options/userId";
import log from "../../../utils/log";

import type { Entity } from "backlog-js";
import type { Argv, ArgumentsCamelCase } from "yargs";
import type { DebugOption } from "../../../options/debug";

export class UserCommand extends AbstractSubCommand<unknown, UserIdOption> {
  command = "user";
  describe =
    "ユーザー情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user/";
  protected build = (argv: Argv<unknown>) => withUserIdOption(argv);
  protected async execute(args: ArgumentsCamelCase<UserIdOption & DebugOption>): Promise<void> {
    const user = await this.client.getUser(args.userId!);
    log.debug(args.debug, JSON.stringify(user, null, 2));
    log.csv<Entity.User.User>(user);
  }
}
