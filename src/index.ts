#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";
import client from "./client";
import { createGetCommand } from "./command/get";

export function createCli() {
  return yargs(hideBin(process.argv))
    .scriptName("backlog")
    .usage("使い方: $0 <command> [args]")
    .version(version)
    .describe("version", "バージョン情報を表示します")
    .command(createGetCommand(client))
    .demandCommand(1, "コマンドを指定してください")
    .strict()
    .showHelpOnFail(true)
    .help("help", "ヘルプを表示します")
    .alias("h", "help")
    .alias("v", "version");
}

if (require.main === module) {
  createCli().parse();
}
