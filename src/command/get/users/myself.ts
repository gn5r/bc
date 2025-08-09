import { AbstractSubCommand } from "../../abstractSubCommand";
import log from "../../../utils/log";

import type { Entity } from "backlog-js";
import type { ArgumentsCamelCase } from "yargs";
import type { DebugOption } from "../../../options/debug";
import type { ProfileOption } from "../../../options/profile";

export class MyselfCommand extends AbstractSubCommand {
  command = "myself";
  describe =
    "APIとの認証に使用しているユーザーの情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/";
  protected async execute(args: ArgumentsCamelCase<DebugOption & ProfileOption>): Promise<void> {
    const user = await this.client.getMyself();
    log.debug(args.debug, JSON.stringify(user, null, 2));
    log.csv<Entity.User.User>(user);
  }
}
