#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";

yargs(hideBin(process.argv))
  .scriptName("backlog")
  .usage("usage: $0 <command> [args]")
  .version(version)
  .command(
    "hello",
    "",
    () => {},
    () => {
      console.log("hello world");
    }
  )
  .demandCommand(1, "You need at least one command before moving on")
  .strict()
  .showHelpOnFail(true)
  .parse();
