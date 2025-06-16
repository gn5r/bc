import { CommandModule } from "yargs";
import { withDebugOption, DebugOption } from "../../options/debug";
import { withUserIdOption, UserIdOption } from "../../options/userId";
import client from "../../client";
import log from "../../utils/log";
import { Entity } from "backlog-js";

export const myselfCommand: CommandModule<{}, DebugOption> = {
  command: "myself",
  describe:
    "APIとの認証に使用しているユーザーの情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/",
  builder: (yargs) => withDebugOption(yargs),
  handler: async (argv) => {
    const user = await client.getMyself();
    log.debug(argv.debug, JSON.stringify(user, null, 2));
    log.csv<Entity.User.User>(user);
  },
};

export const usersCommand: CommandModule<{}, DebugOption> = {
  command: "users",
  describe:
    "スペースのユーザーの一覧を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user-list/",
  builder: (yargs) => withDebugOption(yargs),
  handler: async (argv) => {
    const users = await client.getUsers();
    log.debug(argv.debug, JSON.stringify(users, null, 2));
    log.csv<Entity.User.User>(users);
  },
};

export const getUserCommand: CommandModule<{}, DebugOption & UserIdOption> = {
  command: "user",
  describe:
    "ユーザー情報を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user/",
  builder: (yargs) => withDebugOption(withUserIdOption(yargs)),
  handler: async (argv) => {
    const user = await client.getUser(argv.userId!);
    log.debug(argv.debug, JSON.stringify(user, null, 2));
    log.csv<Entity.User.User>(user);
  },
};
