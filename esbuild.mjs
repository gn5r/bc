import { build } from "esbuild";
import pkg from "./package.json" with { type: "json" };

const banner = `/**
* ${pkg.name} v${pkg.version}
* Copyright (c) ${new Date().getFullYear()} shangyuan.tuolang
* @license MIT
**/\n`;

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.cjs",
  format: "cjs",
  platform: "node",
  target: "node16",
  external: ["yargs", "backlog-js", "inquirer"],
  banner: {
    js: banner,
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
