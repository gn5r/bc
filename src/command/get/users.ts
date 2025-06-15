import { CommandModule } from "yargs";
import { withDebugOption, DebugOption } from "../../options/debug";
import client from "../../client";
import log from "../../utils/log";
import { Entity } from "backlog-js";

export const myselfCommand: CommandModule<{}, DebugOption> = {
  command: "myself",
  describe:
    "APIとの認証に使用しているユーザーの情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/",
  builder: (yargs) => withDebugOption(yargs),
  handler: async (argv) => {
    const user = await client.getMyself();
    log.debug(argv.debug, JSON.stringify(user, null, 2));
    log.csv<Entity.User.User>(user);
  },
};
