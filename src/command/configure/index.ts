import { withProfileOption, ProfileOption } from "../../options/profile";
import { isExistsBacklogConfigDir, createBaclogConfigDir } from "../../utils/dirs";
import { isExistsConfigFile, createConfigFile, createProfile, Profile } from "../../utils/profile";
import { createListCommand } from "./list";
import inquirer from "inquirer";

import type { CommandModule } from "yargs";

interface FirstAnswers {
  host: string;
  authType: "apiKey" | "accessToken";
}

interface ApiKeyAnswer {
  apiKey: string;
}

interface AccessTokenAnswer {
  accessToken: string;
}

export function createConfigureCommand(): CommandModule<unknown, ProfileOption> {
  return {
    command: "configure",
    describe: "backlog-cliの設定を行います",
    builder: (yargs) =>
      withProfileOption(yargs)
        .wrap(null)
        .usage("使い方: $0 configure <subcommand> [options]")
        .command(createListCommand())
        .strict()
        .showHelpOnFail(true),
    handler: async (args) => {
      const profileName = args.profile || "default";

      const { host, authType } = await firstPrompt();
      let profile: Profile;

      if (authType === "apiKey") {
        const { apiKey } = await inputApiKeyPrompt();
        profile = { host, apiKey };
      } else {
        const { accessToken } = await inputAccessTokenPrompt();
        profile = { host, accessToken };
      }

      if (!isExistsBacklogConfigDir()) {
        createBaclogConfigDir();
      }

      if (!isExistsConfigFile()) {
        createConfigFile();
      }

      createProfile(profileName, profile);
    },
  };
}

function firstPrompt() {
  return inquirer.prompt<FirstAnswers>([
    {
      type: "input",
      name: "host",
      message: "ホスト名を入力してください(例: example.backlog.com):",
      validate: (input) => {
        if (!input) {
          return "ホスト名を入力してください";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "authType",
      message: "認証方法を選択してください:",
      choices: ["apiKey", "accessToken"],
      default: "apiKey",
    },
  ]);
}

function inputApiKeyPrompt() {
  return inquirer.prompt<ApiKeyAnswer>([
    {
      type: "input",
      name: "apiKey",
      message: "APIキーを入力してください:",
      validate: (input) => {
        if (!input) {
          return "APIキーを入力してください";
        }
        return true;
      },
    },
  ]);
}

function inputAccessTokenPrompt() {
  return inquirer.prompt<AccessTokenAnswer>([
    {
      type: "input",
      name: "accessToken",
      message: "アクセストークンを入力してください:",
      validate: (input) => {
        if (!input) {
          return "アクセストークンを入力してください";
        }
        return true;
      },
    },
  ]);
}
