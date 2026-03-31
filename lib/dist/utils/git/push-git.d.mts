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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1naXQuZC5tdHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9wdXNoLWdpdC5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIEdpdFB1c2hQYXJhbXMgPSB7XG4gICAgb3duZXI6IHN0cmluZztcbiAgICByZXBvOiBzdHJpbmc7XG4gICAgYnJhbmNoTmFtZTogc3RyaW5nO1xuICAgIGNvbW1pdE1lc3NhZ2U/OiBzdHJpbmc7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIGFzeW5jIGZ1bmN0aW9uIHRvIHB1c2ggY2hhbmdlcyB0byBhIHNwZWNpZmllZCBicmFuY2ggaW4gYSBHaXRIdWIgcmVwb3NpdG9yeSB1c2luZyBPY3Rva2l0LlxuICpcbiAqIEBwYXJhbSBvY3Rva2l0IC0gQW4gYXV0aGVudGljYXRlZCBPY3Rva2l0IGluc3RhbmNlIGZvciBHaXRIdWIgQVBJIHJlcXVlc3RzLlxuICogQHJldHVybnMgQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCBwdXNoZXMgY2hhbmdlcyB0byBhIGJyYW5jaC5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcGFyYW1ldGVyczpcbiAqIEBwYXJhbSBvd25lciAtIFRoZSBvd25lciBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSByZXBvIC0gVGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnkuXG4gKiBAcGFyYW0gYnJhbmNoTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBicmFuY2ggdG8gcHVzaCBjaGFuZ2VzIHRvLlxuICogQHBhcmFtIGNvbW1pdE1lc3NhZ2UgLSAoT3B0aW9uYWwpIFRoZSBjb21taXQgU0hBIHRvIHVwZGF0ZSB0aGUgYnJhbmNoIHJlZmVyZW5jZSB0by4gRGVmYXVsdHMgdG8gJ1VwZGF0ZSBicmFuY2gnLlxuICogQHJldHVybnMgVGhlIHJlc3BvbnNlIGRhdGEgZnJvbSB0aGUgR2l0SHViIEFQSSBhZnRlciB1cGRhdGluZyB0aGUgcmVmZXJlbmNlLCBvciB1bmRlZmluZWQgaWYgYW4gZXJyb3Igb2NjdXJzLlxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgYGNvbW1pdE1lc3NhZ2VgIHBhcmFtZXRlciBpcyB1c2VkIGFzIHRoZSBTSEEgZm9yIHRoZSB1cGRhdGVSZWYgY2FsbCwgd2hpY2ggc2hvdWxkIGJlIHRoZSBjb21taXQgU0hBIHlvdSB3YW50IHRoZSBicmFuY2ggdG8gcG9pbnQgdG8uXG4gKiBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwdXNoLCB0aGUgZnVuY3Rpb24gd2lsbCBjYWxsIGBzZXRGYWlsZWRgIHdpdGggYW4gYXBwcm9wcmlhdGUgZXJyb3IgbWVzc2FnZS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZ2l0UHVzaChicmFuY2hOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuIl0sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVyxnQkFBZ0I7Q0FBQztPQUFBLEVBQUE7Q0FBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7Q0FBQTtBQUM1QixJQUFXLFVBQU07Q0FBQTtPQUFBLENBQUEsUUFBQTtDQUFBLENBQUEsSUFBQSxHQUFBO0NBQUEifQ==