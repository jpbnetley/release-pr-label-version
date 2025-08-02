import { Octokit } from "../../octokit-BfGHke4j.js";

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
declare function gitPush(octokit: Octokit): ({
  owner,
  repo,
  branchName,
  commitMessage
}: GitPushParams) => Promise<{
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
export { GitPushParams, gitPush };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1naXQuZC50cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L3B1c2gtZ2l0LmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2N0b2tpdCB9IGZyb20gJy4uLy4uL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcyc7XG5leHBvcnQgdHlwZSBHaXRQdXNoUGFyYW1zID0ge1xuICAgIG93bmVyOiBzdHJpbmc7XG4gICAgcmVwbzogc3RyaW5nO1xuICAgIGJyYW5jaE5hbWU6IHN0cmluZztcbiAgICBjb21taXRNZXNzYWdlPzogc3RyaW5nO1xufTtcbi8qKlxuICogUmV0dXJucyBhbiBhc3luYyBmdW5jdGlvbiB0byBwdXNoIGNoYW5nZXMgdG8gYSBzcGVjaWZpZWQgYnJhbmNoIGluIGEgR2l0SHViIHJlcG9zaXRvcnkgdXNpbmcgT2N0b2tpdC5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgR2l0SHViIEFQSSByZXF1ZXN0cy5cbiAqIEByZXR1cm5zIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgcHVzaGVzIGNoYW5nZXMgdG8gYSBicmFuY2guXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHBhcmFtZXRlcnM6XG4gKiBAcGFyYW0gb3duZXIgLSBUaGUgb3duZXIgb2YgdGhlIHJlcG9zaXRvcnkuXG4gKiBAcGFyYW0gcmVwbyAtIFRoZSBuYW1lIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIGJyYW5jaE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYnJhbmNoIHRvIHB1c2ggY2hhbmdlcyB0by5cbiAqIEBwYXJhbSBjb21taXRNZXNzYWdlIC0gKE9wdGlvbmFsKSBUaGUgY29tbWl0IFNIQSB0byB1cGRhdGUgdGhlIGJyYW5jaCByZWZlcmVuY2UgdG8uIERlZmF1bHRzIHRvICdVcGRhdGUgYnJhbmNoJy5cbiAqIEByZXR1cm5zIFRoZSByZXNwb25zZSBkYXRhIGZyb20gdGhlIEdpdEh1YiBBUEkgYWZ0ZXIgdXBkYXRpbmcgdGhlIHJlZmVyZW5jZSwgb3IgdW5kZWZpbmVkIGlmIGFuIGVycm9yIG9jY3Vycy5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhlIGBjb21taXRNZXNzYWdlYCBwYXJhbWV0ZXIgaXMgdXNlZCBhcyB0aGUgU0hBIGZvciB0aGUgdXBkYXRlUmVmIGNhbGwsIHdoaWNoIHNob3VsZCBiZSB0aGUgY29tbWl0IFNIQSB5b3Ugd2FudCB0aGUgYnJhbmNoIHRvIHBvaW50IHRvLlxuICogSWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgcHVzaCwgdGhlIGZ1bmN0aW9uIHdpbGwgY2FsbCBgc2V0RmFpbGVkYCB3aXRoIGFuIGFwcHJvcHJpYXRlIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGdpdFB1c2gob2N0b2tpdDogT2N0b2tpdCk6ICh7IG93bmVyLCByZXBvLCBicmFuY2hOYW1lLCBjb21taXRNZXNzYWdlLCB9OiBHaXRQdXNoUGFyYW1zKSA9PiBQcm9taXNlPHtcbiAgICByZWY6IHN0cmluZztcbiAgICBub2RlX2lkOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgb2JqZWN0OiB7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgc2hhOiBzdHJpbmc7XG4gICAgICAgIHVybDogc3RyaW5nO1xuICAgIH07XG59IHwgdW5kZWZpbmVkPjtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBVyxnQkFBZ0IsQ0FBQyxFQUFBO0FBQzVCLElBQVcsVUFBTTtDQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtBQUFBIn0=