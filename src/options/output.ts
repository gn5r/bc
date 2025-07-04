import { Argv } from "yargs";

export interface OutputOption {
  output?: string;
}

export const withOutputOption = <T = unknown>(yargs: Argv<T>): Argv<T & OutputOption> =>
  yargs.option("output", {
    type: "string",
    description: "出力ファイル名を指定します。",
  });
