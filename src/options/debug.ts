import { Argv } from "yargs";

export interface DebugOption {
  debug?: boolean;
}

export const withDebugOption = <T = unknown>(yargs: Argv<T>): Argv<T & DebugOption> =>
  yargs.option("debug", {
    type: "boolean",
    default: false,
    description: "デバッグモードを有効にします。",
  });
