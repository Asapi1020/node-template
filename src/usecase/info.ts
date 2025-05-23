import { mkdirSync, writeFileSync } from "node:fs";
import { getProjectName, getRepositoryURL } from "../infra/system";

export function makeDirs() {
	mkdirSync("src");
	mkdirSync(".vscode");
}

export function makeFiles() {
	makeGitIgnore();
	makePackageJSON();
	makeTSConfig();
	makeBiomeJSON();
	makeSettingsJSON();
}

function makeGitIgnore() {
	const lines = ["node_modules", "dist"];
	const content = `${lines.join("\n")}\n`;
	writeFileSync(".gitignore", content, { encoding: "utf8" });
}

function makePackageJSON() {
	const projectName = getProjectName();
	const repositoryURL = getRepositoryURL();
	const json = {
		name: `@asp1020/${projectName}`,
		version: "1.0.0",
		description: "",
		author: "Asapi1020",
		license: "GPL-3.0-only",
		main: "src/index.ts",
		type: "module",
		repository: {
			type: "git",
			url: repositoryURL,
		},
		scripts: {
			lint: "biome lint",
			format: "biome check --write",
			clean: "rimraf dist",
			build: "tsc && tsc-esm-fix dist",
		},
	};
	const content = JSON.stringify(json, null, 2);
	writeFileSync("package.json", content, { encoding: "utf8" });
}

function makeTSConfig() {
	const json = {
		compilerOptions: {
			target: "ES2020",
			module: "ES2020",
			rootDir: "src",
			outDir: "dist",
			moduleResolution: "node10",
			esModuleInterop: true,
		},
		include: ["src"],
	};
	const content = JSON.stringify(json, null, 2);
	writeFileSync("tsconfig.json", content, { encoding: "utf8" });
}

function makeBiomeJSON() {
	const json = {
		formatter: {
			lineWidth: 120,
		},
		linter: {
			rules: {
				complexity: {
					noExcessiveCognitiveComplexity: "warn",
					useDateNow: "warn",
					useSimplifiedLogicExpression: "warn",
				},
				correctness: {
					noConstantMathMinMaxClamp: "warn",
					noInvalidNewBuiltin: "warn",
					noUnusedFunctionParameters: "warn",
					noUnusedImports: "error",
					noUnusedPrivateClassMembers: "warn",
					noUnusedVariables: "warn",
				},
				nursery: {
					noEnum: "error",
					noProcessEnv: "warn",
					useAtIndex: "warn",
					useExplicitType: "warn",
				},
				style: {
					useBlockStatements: "warn",
					useForOf: "warn",
					useSingleCaseStatement: "warn",
				},
				suspicious: {
					noEmptyBlockStatements: "warn",
					useAwait: "warn",
				},
			},
		},
		javascript: {
			formatter: {
				indentStyle: "tab",
				lineEnding: "lf",
			},
		},
		json: {
			formatter: {
				indentStyle: "space",
				indentWidth: 2,
			},
		},
	};
	const content = JSON.stringify(json, null, 2);
	writeFileSync("biome.json", content, { encoding: "utf8" });
}

function makeSettingsJSON() {
	const json = {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "biomejs.biome",
		"editor.codeActionsOnSave": {
			"source.fixAll.biome": "explicit",
			"source.organizeImports.biome": "explicit",
		},
	};
	const content = JSON.stringify(json, null, 2);
	writeFileSync(".vscode/settings.json", content, { encoding: "utf8" });
}
