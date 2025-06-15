import { CommandModule } from "yargs";
import { withDebugOption, DebugOption } from "../../options/debug";
import client from "../../client";
import log from "../../utils/log";

export const myselfCommand: CommandModule<{}, DebugOption> = {
  command: "myself",
  describe:
    "Get information about the current user\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/",
  builder: (yargs) => withDebugOption(yargs),
  handler: async (argv) => {
    const user = await client.getMyself();
    log.csv(user);
  },
};
