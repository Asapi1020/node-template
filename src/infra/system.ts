import { execSync } from "node:child_process";

export function run(cmd: string): Buffer {
	return execSync(cmd, { stdio: "inherit" });
}
