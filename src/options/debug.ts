import { Argv } from "yargs";

export interface DebugOption {
  debug?: boolean;
}

export const withDebugOption = <T = {}>(yargs: Argv<T>) =>
  yargs.option("debug", {
    type: "boolean",
    default: false,
    description: "Enable debug mode",
  }) as Argv<T & DebugOption>;
