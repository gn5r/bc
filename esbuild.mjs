import { build } from "esbuild";
import pkg from "./package.json" with { type: "json" };

const banner = `/**
* ${pkg.name} v${pkg.version}
* Copyright (c) 2025 shangyuan.tuolang
* @license MIT
**/\n`;

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.cjs",
  format: "cjs",
  platform: "node",
  target: "node16",
  external: ["yargs", "backlog-js"],
  banner: {
    js: banner,
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
