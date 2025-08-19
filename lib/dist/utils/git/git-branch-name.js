import { exec } from "node:child_process";

//#region src/utils/git/git-branch-name.ts
/**
* Retrieves the current Git branch name by executing the appropriate Git command.
*
* @returns A promise that resolves to the name of the current Git branch as a string.
* @throws Will reject the promise with an error message if the Git command fails.
*/
function gitBranchName() {
	return new Promise((resolve, reject) => {
		exec("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }, (error, stdout) => {
			if (error) {
				reject(`Error getting git branch name: ${error.message}`);
				return;
			}
			resolve(stdout.trim());
		});
	});
}

//#endregion
export { gitBranchName };