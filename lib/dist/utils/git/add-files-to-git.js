import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";
import { execSync } from "node:child_process";

//#region src/utils/git/add-files-to-git.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
/**
* Adds the specified files to the current Git staging area using the `git add` command.
*
* @param files - An array of file paths to add to Git.
* @remarks
* - If the `files` array is empty, the function logs a message and returns without performing any action.
* - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
*/
function addFilesToGit(files = ["."]) {
	return new Promise((resolve, reject) => {
		if (!files || files.length === 0) {
			(0, import_core.info)("No files to add to git.");
			resolve();
			return;
		}
		try {
			execSync(`git add ${files.join(" ")}`, { stdio: "inherit" });
			(0, import_core.info)(`Added files to git: ${files.join(", ")}`);
			resolve();
		} catch (err) {
			(0, import_core.error)(err instanceof Error ? err : `Error adding files to git: ${err}`);
			reject(err);
		}
	});
}

//#endregion
export { addFilesToGit };