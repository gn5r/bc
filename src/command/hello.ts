import { CommandModule } from "yargs";
import { DebugOption, withDebugOption } from "../options/debug";
import log from "../utils/log";

export const helloCommand: CommandModule<{}, DebugOption> = {
  command: "hello",
  describe: "Prints 'hello world' to the console",
  builder: (yargs) => withDebugOption(yargs),
  handler: (argv) => {
    log.debug(argv.debug, "Debug mode is enabled");
    console.log("hello world");
  },
};
