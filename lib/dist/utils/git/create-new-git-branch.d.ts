import { Octokit } from "../../octokit-BfGHke4j.js";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1naXQtYnJhbmNoLmQudHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9jcmVhdGUtbmV3LWdpdC1icmFuY2guZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnLi4vLi4vdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJztcbmV4cG9ydCB0eXBlIENyZWF0ZU5ld0dpdEJyYW5jaFBhcmFtcyA9IHtcbiAgICBvd25lcjogc3RyaW5nO1xuICAgIHJlcG86IHN0cmluZztcbiAgICBicmFuY2hOYW1lOiBzdHJpbmc7XG4gICAgYmFzZUJyYW5jaD86IHN0cmluZztcbn07XG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFzeW5jIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyBHaXQgYnJhbmNoIGluIGEgR2l0SHViIHJlcG9zaXRvcnkgdXNpbmcgT2N0b2tpdC5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgR2l0SHViIEFQSS5cbiAqIEByZXR1cm5zIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIG5ldyBicmFuY2ggZnJvbSBhIHNwZWNpZmllZCBiYXNlIGJyYW5jaC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBhc3luY1xuICogQHBhcmFtIG93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHJlcG8gLSBUaGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG5ldyBicmFuY2ggdG8gY3JlYXRlLlxuICogQHBhcmFtIGJhc2VCcmFuY2ggLSAoT3B0aW9uYWwpIFRoZSBuYW1lIG9mIHRoZSBiYXNlIGJyYW5jaCB0byBicmFuY2ggZnJvbS4gRGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgY29udGV4dCByZWYgb3IgJ21haW4nLlxuICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgYnJhbmNoIGRhdGEgaWYgc3VjY2Vzc2Z1bDsgb3RoZXJ3aXNlLCBoYW5kbGVzIGVycm9ycyBhbmQgc2V0cyB0aGUgZmFpbHVyZSBzdGF0ZS5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgY2FsbCBgc2V0RmFpbGVkYCBpZiB0aGUgYnJhbmNoIGNyZWF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBjcmVhdGVOZXdHaXRCcmFuY2gob2N0b2tpdDogT2N0b2tpdCk6ICh7IGJhc2VCcmFuY2gsIGJyYW5jaE5hbWUsIG93bmVyLCByZXBvLCB9OiBDcmVhdGVOZXdHaXRCcmFuY2hQYXJhbXMpID0+IFByb21pc2U8e1xuICAgIHJlZjogc3RyaW5nO1xuICAgIG5vZGVfaWQ6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBvYmplY3Q6IHtcbiAgICAgICAgdHlwZTogc3RyaW5nO1xuICAgICAgICBzaGE6IHN0cmluZztcbiAgICAgICAgdXJsOiBzdHJpbmc7XG4gICAgfTtcbn0gfCB1bmRlZmluZWQ+O1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFXLDJCQUEyQixDQUFDLEVBQUE7QUFDdkMsSUFBVyxxQkFBTTtDQUFBO09BQUE7T0FBQTtPQUFBO09BQUE7T0FBQTtPQUFBO09BQUE7Q0FBQSJ9