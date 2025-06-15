import { build } from "esbuild";

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.cjs",
  format: "cjs",
  platform: "node",
  target: "node16",
  external: ["yargs", "backlog-js"],
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
