#!/usr/bin/env ts-node
import { existsSync } from "node:fs";
import { run } from "../infra/system";
import { makeDirs, makeFiles } from "../usecase/info";

if (existsSync("package.json")) {
	console.log("package.json already exists. Skipping initialization.");
	process.exit(0);
}
makeDirs();
makeFiles();

run("pnpm i -D typescript @types/node @biomejs/biome npm-run-all rimraf");
run("pnpm format");
