//#region src/utils/git/push-git.d.ts
type GitPushParams = {
  owner: string;
  repo: string;
  branchName: string;
  commitMessage?: string;
};
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
declare function gitPush(branchName: string): Promise<void>;
//#endregion
export { GitPushParams, gitPush };