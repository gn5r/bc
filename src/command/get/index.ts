import { CommandModule } from "yargs";
import { myselfCommand } from "./users";

export const getCommand: CommandModule<{}, {}> = {
  command: "get",
  describe: "Get information from Backlog",
  builder: (yargs) =>
    yargs
      .wrap(null)
      .usage("usage: $0 get <subComamand>")
      .command(myselfCommand)
      .demandCommand(1, "You need at least one command before moving on")
      .strict()
      .showHelpOnFail(true),
  handler: () => {},
};
