import { exec } from "node:child_process";

//#region src/utils/git/checkout-branch-git.ts
/**
* Creates and checks out a new Git branch from the specified base branch.
*
* @param baseBranch - The name of the base branch to branch off from. Defaults to 'main'.
* @returns A promise that resolves when the branch has been successfully checked out, or rejects with an error message if the operation fails.
*/
function checkoutBranch(baseBranch) {
	return new Promise((resolve, reject) => {
		exec(`git checkout -b ${baseBranch}`, (error) => {
			if (error) return reject(`Error checking out branch: ${error.message}`);
			resolve();
		});
	});
}

//#endregion
export { checkoutBranch };