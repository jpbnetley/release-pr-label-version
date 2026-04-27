import { Octokit } from "../../types/models/github/octokit.mjs";

//#region src/utils/git/create-new-git-branch.d.ts
type CreateNewGitBranchParams = {
  owner: string;
  repo: string;
  branchName: string;
  baseBranch?: string;
};
/**
 * Factory function that returns an async function to create a new Git branch in a GitHub repository using Octokit.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns An async function that creates a new branch from a specified base branch.
 *
 * @function
 * @async
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param branchName - The name of the new branch to create.
 * @param baseBranch - (Optional) The name of the base branch to branch from. Defaults to the current context ref or 'main'.
 * @returns The newly created branch data if successful; otherwise, handles errors and sets the failure state.
 *
 * @throws Will call `setFailed` if the branch creation fails.
 */
declare function createNewGitBranch(octokit: Octokit): ({
  baseBranch,
  branchName,
  owner,
  repo
}: CreateNewGitBranchParams) => Promise<{
  ref: string;
  node_id: string;
  url: string;
  object: {
    type: string;
    sha: string;
    url: string;
  };
} | undefined>;
//#endregion
export { CreateNewGitBranchParams, createNewGitBranch };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1naXQtYnJhbmNoLmQubXRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvY3JlYXRlLW5ldy1naXQtYnJhbmNoLnRzIl0sIm1hcHBpbmdzIjoiOzs7S0FJWSx3QkFBQTtFQUNWLEtBQUE7RUFDQSxJQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUFBQTs7Ozs7OztBQW1CRjs7Ozs7Ozs7OztpQkFBZ0Isa0JBQUEsQ0FBbUIsT0FBQSxFQUFTLE9BQUE7RUFDRCxVQUFBO0VBQUEsVUFBQTtFQUFBLEtBQUE7RUFBQTtBQUFBLEdBS3RDLHdCQUFBLEtBQXdCLE9BQUEifQ==