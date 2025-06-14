#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";
import { helloCommand } from "./command/hello.js";

export function createCli() {
  return yargs(hideBin(process.argv))
    .scriptName("backlog")
    .usage("usage: $0 <command> [args]")
    .version(version)
    .command(helloCommand)
    .demandCommand(1, "You need at least one command before moving on")
    .strict()
    .showHelpOnFail(true);
}

if (require.main === module) {
  createCli().parse();
}
