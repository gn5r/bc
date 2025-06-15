import { Argv } from "yargs";

export interface UserIdOption {
  userId?: number;
}

export const withUserIdOption = <T = {}>(
  yargs: Argv<T>
): Argv<T & UserIdOption> =>
  yargs
    .option("userId", {
      type: "number",
      description: "ユーザーIDを指定します。",
    })
    .check(checkUserIdOption);

export const checkUserIdOption = (argv: UserIdOption) => {
  if (argv.userId === undefined) {
    throw new Error("ユーザーIDを指定してください。");
  }
  if (
    typeof argv.userId !== "number" ||
    !Number.isFinite(argv.userId) ||
    !Number.isInteger(argv.userId) ||
    argv.userId <= 0
  ) {
    throw new Error("ユーザーIDは正の整数でなければなりません。");
  }
  return true;
};
