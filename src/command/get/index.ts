import { createGetUsersCommands } from "./users/index";
import { Backlog } from "backlog-js";

import type { CommandModule } from "yargs";

export function createGetCommand(client: Backlog) {
  return {
    command: "get",
    describe: "GETリクエストを実行します",
    builder: (yargs) =>
      yargs
        .wrap(null)
        .usage("使い方: $0 get <subCommand>")
        .command(createGetUsersCommands(client))
        .demandCommand(1, "コマンドを指定してください")
        .strict()
        .showHelpOnFail(true),
    handler: () => {},
  } as CommandModule<unknown, unknown>;
}
