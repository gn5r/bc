import { AbstractSubCommand } from "../../abstractSubCommand";
import { withUserIdOption, UserIdOption } from "../../../options/userId";
import { withOutputOption, OutputOption } from "../../../options/output";
import log from "../../../utils/log";
import * as fs from "fs";
import * as path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

import type { Entity } from "backlog-js";
import type { Argv, ArgumentsCamelCase } from "yargs";
import type { DebugOption } from "../../../options/debug";

export class UserIconCommand extends AbstractSubCommand<unknown, UserIdOption & OutputOption> {
  command = "userIcon";
  describe =
    "ユーザーのアイコン画像を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-user-icon/";
  protected build = (argv: Argv<unknown>) => withUserIdOption(withOutputOption(argv));
  protected async execute(
    args: ArgumentsCamelCase<UserIdOption & DebugOption & OutputOption>,
  ): Promise<void> {
    const userIcon: Entity.File.FileData = await this.client.getUserIcon(args.userId!);
    log.debug(args.debug, JSON.stringify(userIcon, null, 2));

    const outputPath = args.output
      ? path.resolve(args.output)
      : path.resolve(process.cwd(), (userIcon as Entity.File.NodeFileData).filename);

    log.debug(args.debug, outputPath);

    const streamPipeline = promisify(pipeline);
    await streamPipeline(userIcon.body, fs.createWriteStream(outputPath));
  }
}
