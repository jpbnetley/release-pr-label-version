import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";
import { exec } from "node:child_process";

//#region src/utils/git/commit-files-to-git.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
/**
* Stages the specified files and creates a Git commit with the provided commit message and author information.
*
* @param commitMessage - The commit message to use for the Git commit.
* @param authorName - The name of the commit author.
* @param authorEmail - The email address of the commit author.
* @returns A Promise that resolves when the files have been committed, or rejects with an error message if the operation fails.
*/
function commitFilesToGit({ commitMessage }) {
	return new Promise((resolve, reject) => {
		exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
			if (error) {
				if (stderr.includes("nothing to commit")) {
					(0, import_core.info)("No changes to commit.");
					resolve();
					return;
				}
				return reject(`Error committing files: ${stderr || error.message}`);
			}
			(0, import_core.info)(stdout);
			resolve();
		});
	});
}

//#endregion
export { commitFilesToGit };