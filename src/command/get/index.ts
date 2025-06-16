import { CommandModule } from "yargs";
import { myselfCommand, usersCommand, getUserCommand } from "./users";

export const getCommand: CommandModule<{}, {}> = {
  command: "get",
  describe: "GETリクエストを実行します",
  builder: (yargs) =>
    yargs
      .wrap(null)
      .usage("使い方: $0 get <subCommand>")
      .command(myselfCommand)
      .command(usersCommand)
      .command(getUserCommand)
      .demandCommand(1, "コマンドを指定してください")
      .strict()
      .showHelpOnFail(true),
  handler: () => {},
};
