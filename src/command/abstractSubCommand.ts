import { ArgumentsCamelCase, CommandBuilder, CommandModule, Argv } from "yargs";
import { withDebugOption, DebugOption } from "../options/debug";
import { Backlog } from "backlog-js";

export abstract class AbstractSubCommand<T = {}, U = {}>
  implements CommandModule<T, U & DebugOption>
{
  protected client: Backlog;
  abstract command: string;
  abstract describe: string;
  constructor(client: Backlog) {
    this.client = client;
  }
  protected build?: (argv: Argv<T>) => Argv<U & DebugOption>;
  public builder: CommandBuilder<T, U & DebugOption> = (yargs) => {
    if (this.build) {
      return this.build(withDebugOption(yargs));
    } else {
      return withDebugOption(yargs) as unknown as Argv<U & DebugOption>;
    }
  };
  protected abstract execute(
    args: ArgumentsCamelCase<U & DebugOption>
  ): void | Promise<void>;
  public handler = (args: ArgumentsCamelCase<U & DebugOption>) => {
    try {
      this.execute(args);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
}
