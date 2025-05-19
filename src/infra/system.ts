import { execSync } from "node:child_process";
import { basename } from "node:path";

export function run(cmd: string): Buffer {
	return execSync(cmd, { stdio: "inherit" });
}

export function getProjectName(): string {
	const currentDirPath = process.cwd();
	const currentDir = basename(currentDirPath);
	return currentDir;
}

export function getRepositoryURL(): string {
	return execSync("git config --get remote.origin.url", {
		encoding: "utf8",
		stdio: "pipe",
	}).trim();
}
