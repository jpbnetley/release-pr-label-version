import { exec } from "node:child_process";

//#region src/utils/git/git-status.ts
/**
* Executes the `git status --porcelain` command and returns its output as a trimmed string.
*
* @returns A promise that resolves with the output of `git status --porcelain`.
* @throws If the git command fails, the promise is rejected with an error message.
*/
function gitStatus() {
	return new Promise((resolve, reject) => {
		exec("git status --porcelain", { encoding: "utf-8" }, (error, stdout, stderr) => {
			if (error) {
				if (stderr) return reject(`Error getting git status: ${stderr}`);
				return reject(`Error getting git status: ${error.message}`);
			}
			resolve(stdout.trim());
		});
	});
}

//#endregion
export { gitStatus };