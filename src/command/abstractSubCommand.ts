import { withDebugOption, DebugOption } from "../options/debug";
import { withProfileOption, ProfileOption } from "../options/profile";
import { isBacklogError } from "../utils/backlog";
import { Backlog, Error as BacklogError } from "backlog-js";
import { isExistsConfigFile, getProfile } from "../utils/profile";
import { createBacklogClient } from "../client";

import type { ArgumentsCamelCase, CommandBuilder, CommandModule, Argv } from "yargs";

export abstract class AbstractSubCommand<T = unknown, U = unknown>
  implements CommandModule<T, U & DebugOption & ProfileOption>
{
  private _client?: Backlog;
  abstract command: string;
  abstract describe: string;
  protected build?: (argv: Argv<T>) => Argv<U & DebugOption & ProfileOption>;
  public builder: CommandBuilder<T, U & DebugOption & ProfileOption> = (yargs) => {
    if (this.build) {
      return this.build(withDebugOption(withProfileOption(yargs)));
    } else {
      return withDebugOption(withProfileOption(yargs)) as unknown as Argv<
        U & DebugOption & ProfileOption
      >;
    }
  };
  protected abstract execute(
    args: ArgumentsCamelCase<U & DebugOption & ProfileOption>,
  ): void | Promise<void>;
  public handler = async (args: ArgumentsCamelCase<U & DebugOption & ProfileOption>) => {
    try {
      this._client = this.createClient(args.profile);
      await this.execute(args);
    } catch (error: any) {
      if (error instanceof BacklogError.BacklogError) {
        console.error(error.body);
      } else if (isBacklogError(error)) {
        console.error(error._body);
      } else {
        console.error(error);
      }
      process.exit(1);
    }
  };
  protected createClient(profileName?: string) {
    if (profileName) {
      return this.createClientByProfileName(profileName);
    } else {
      if (isExistsConfigFile()) {
        return this.createClientByProfileName();
      } else {
        return this.createClientByDefault();
      }
    }
  }
  protected createClientByProfileName(profileName = "default"): Backlog {
    const profile = getProfile(profileName);
    if (!profile) {
      throw new Error(`"${profileName}"プロファイルが見つかりません`);
    }
    const configure = {
      host: profile.host,
      apiKey: profile.apiKey,
      accessToken: profile.accessToken,
    };
    return createBacklogClient(configure);
  }
  protected createClientByDefault(): Backlog {
    return createBacklogClient();
  }
  protected get client(): Backlog {
    if (!this._client) {
      throw new Error("Backlogクライアントが初期化されていません");
    }
    return this._client;
  }
}
