import { Argv } from "yargs";

export interface ProfileOption {
  profile?: string;
}

export const withProfileOption = <T = unknown>(yargs: Argv<T>): Argv<T & ProfileOption> =>
  yargs.option("profile", {
    type: "string",
    description: "プロファイル名を指定します。",
  });
