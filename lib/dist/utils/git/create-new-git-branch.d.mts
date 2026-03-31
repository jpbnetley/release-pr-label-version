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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5ldy1naXQtYnJhbmNoLmQubXRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvY3JlYXRlLW5ldy1naXQtYnJhbmNoLmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2N0b2tpdCB9IGZyb20gJy4uLy4uL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcyc7XG5leHBvcnQgdHlwZSBDcmVhdGVOZXdHaXRCcmFuY2hQYXJhbXMgPSB7XG4gICAgb3duZXI6IHN0cmluZztcbiAgICByZXBvOiBzdHJpbmc7XG4gICAgYnJhbmNoTmFtZTogc3RyaW5nO1xuICAgIGJhc2VCcmFuY2g/OiBzdHJpbmc7XG59O1xuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBhc3luYyBmdW5jdGlvbiB0byBjcmVhdGUgYSBuZXcgR2l0IGJyYW5jaCBpbiBhIEdpdEh1YiByZXBvc2l0b3J5IHVzaW5nIE9jdG9raXQuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEdpdEh1YiBBUEkuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBuZXcgYnJhbmNoIGZyb20gYSBzcGVjaWZpZWQgYmFzZSBicmFuY2guXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSBvd25lciAtIFRoZSBvd25lciBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSByZXBvIC0gVGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnkuXG4gKiBAcGFyYW0gYnJhbmNoTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBuZXcgYnJhbmNoIHRvIGNyZWF0ZS5cbiAqIEBwYXJhbSBiYXNlQnJhbmNoIC0gKE9wdGlvbmFsKSBUaGUgbmFtZSBvZiB0aGUgYmFzZSBicmFuY2ggdG8gYnJhbmNoIGZyb20uIERlZmF1bHRzIHRvIHRoZSBjdXJyZW50IGNvbnRleHQgcmVmIG9yICdtYWluJy5cbiAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGJyYW5jaCBkYXRhIGlmIHN1Y2Nlc3NmdWw7IG90aGVyd2lzZSwgaGFuZGxlcyBlcnJvcnMgYW5kIHNldHMgdGhlIGZhaWx1cmUgc3RhdGUuXG4gKlxuICogQHRocm93cyBXaWxsIGNhbGwgYHNldEZhaWxlZGAgaWYgdGhlIGJyYW5jaCBjcmVhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gY3JlYXRlTmV3R2l0QnJhbmNoKG9jdG9raXQ6IE9jdG9raXQpOiAoeyBiYXNlQnJhbmNoLCBicmFuY2hOYW1lLCBvd25lciwgcmVwbywgfTogQ3JlYXRlTmV3R2l0QnJhbmNoUGFyYW1zKSA9PiBQcm9taXNlPHtcbiAgICByZWY6IHN0cmluZztcbiAgICBub2RlX2lkOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgb2JqZWN0OiB7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgc2hhOiBzdHJpbmc7XG4gICAgICAgIHVybDogc3RyaW5nO1xuICAgIH07XG59IHwgdW5kZWZpbmVkPjtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBVywyQkFBMkI7Q0FBQztPQUFBLEVBQUE7Q0FBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7Q0FBQTtBQUN2QyxJQUFXLHFCQUFNO0NBQUE7T0FBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7Q0FBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7Q0FBQSJ9