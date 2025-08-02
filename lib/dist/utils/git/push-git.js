import { __toESM, require_core } from "../../core-Bd4l5kNc.js";

//#region src/utils/git/push-git.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
/**
* Returns an async function to push changes to a specified branch in a GitHub repository using Octokit.
*
* @param octokit - An authenticated Octokit instance for GitHub API requests.
* @returns An async function that pushes changes to a branch.
*
* The returned function parameters:
* @param owner - The owner of the repository.
* @param repo - The name of the repository.
* @param branchName - The name of the branch to push changes to.
* @param commitMessage - (Optional) The commit SHA to update the branch reference to. Defaults to 'Update branch'.
* @returns The response data from the GitHub API after updating the reference, or undefined if an error occurs.
*
* @remarks
* The `commitMessage` parameter is used as the SHA for the updateRef call, which should be the commit SHA you want the branch to point to.
* If an error occurs during the push, the function will call `setFailed` with an appropriate error message.
*/
function gitPush(octokit) {
	return async function pushGit({ owner, repo, branchName, commitMessage = "Update branch" }) {
		try {
			const { data: pushData } = await octokit.rest.git.updateRef({
				owner,
				repo,
				ref: `heads/${branchName}`,
				sha: commitMessage,
				force: true
			});
			return pushData;
		} catch (error) {
			if (error instanceof Error) (0, import_core.setFailed)(`Failed to push git changes: ${error.message}`);
			else (0, import_core.setFailed)("Failed to push git changes: Unknown error");
		}
	};
}

//#endregion
export { gitPush };