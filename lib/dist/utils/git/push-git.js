import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";
import { exec } from "node:child_process";

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
function gitPush(branchName) {
	return new Promise((resolve, reject) => {
		exec(`git push origin ${branchName}`, (error, stdout, stderr) => {
			if (error) {
				(0, import_core.setFailed)(`Failed to push changes: ${error.message}`);
				reject(error);
				return;
			}
			(0, import_core.info)(`Successfully pushed changes to branch: ${branchName}`);
			resolve();
		});
	});
}

//#endregion
export { gitPush };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1naXQuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9wdXNoLWdpdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmZvLCBzZXRGYWlsZWQgfSBmcm9tICdAYWN0aW9ucy9jb3JlJ1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcblxuZXhwb3J0IHR5cGUgR2l0UHVzaFBhcmFtcyA9IHtcbiAgb3duZXI6IHN0cmluZ1xuICByZXBvOiBzdHJpbmdcbiAgYnJhbmNoTmFtZTogc3RyaW5nXG4gIGNvbW1pdE1lc3NhZ2U/OiBzdHJpbmdcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFzeW5jIGZ1bmN0aW9uIHRvIHB1c2ggY2hhbmdlcyB0byBhIHNwZWNpZmllZCBicmFuY2ggaW4gYSBHaXRIdWIgcmVwb3NpdG9yeSB1c2luZyBPY3Rva2l0LlxuICpcbiAqIEBwYXJhbSBvY3Rva2l0IC0gQW4gYXV0aGVudGljYXRlZCBPY3Rva2l0IGluc3RhbmNlIGZvciBHaXRIdWIgQVBJIHJlcXVlc3RzLlxuICogQHJldHVybnMgQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCBwdXNoZXMgY2hhbmdlcyB0byBhIGJyYW5jaC5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcGFyYW1ldGVyczpcbiAqIEBwYXJhbSBvd25lciAtIFRoZSBvd25lciBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSByZXBvIC0gVGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnkuXG4gKiBAcGFyYW0gYnJhbmNoTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBicmFuY2ggdG8gcHVzaCBjaGFuZ2VzIHRvLlxuICogQHBhcmFtIGNvbW1pdE1lc3NhZ2UgLSAoT3B0aW9uYWwpIFRoZSBjb21taXQgU0hBIHRvIHVwZGF0ZSB0aGUgYnJhbmNoIHJlZmVyZW5jZSB0by4gRGVmYXVsdHMgdG8gJ1VwZGF0ZSBicmFuY2gnLlxuICogQHJldHVybnMgVGhlIHJlc3BvbnNlIGRhdGEgZnJvbSB0aGUgR2l0SHViIEFQSSBhZnRlciB1cGRhdGluZyB0aGUgcmVmZXJlbmNlLCBvciB1bmRlZmluZWQgaWYgYW4gZXJyb3Igb2NjdXJzLlxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgYGNvbW1pdE1lc3NhZ2VgIHBhcmFtZXRlciBpcyB1c2VkIGFzIHRoZSBTSEEgZm9yIHRoZSB1cGRhdGVSZWYgY2FsbCwgd2hpY2ggc2hvdWxkIGJlIHRoZSBjb21taXQgU0hBIHlvdSB3YW50IHRoZSBicmFuY2ggdG8gcG9pbnQgdG8uXG4gKiBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwdXNoLCB0aGUgZnVuY3Rpb24gd2lsbCBjYWxsIGBzZXRGYWlsZWRgIHdpdGggYW4gYXBwcm9wcmlhdGUgZXJyb3IgbWVzc2FnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdpdFB1c2goYnJhbmNoTmFtZTogc3RyaW5nKSB7XG5yZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBleGVjKGBnaXQgcHVzaCBvcmlnaW4gJHticmFuY2hOYW1lfWAsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHNldEZhaWxlZChgRmFpbGVkIHRvIHB1c2ggY2hhbmdlczogJHtlcnJvci5tZXNzYWdlfWApXG4gICAgICByZWplY3QoZXJyb3IpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpbmZvKGBTdWNjZXNzZnVsbHkgcHVzaGVkIGNoYW5nZXMgdG8gYnJhbmNoOiAke2JyYW5jaE5hbWV9YClcbiAgICByZXNvbHZlKClcbiAgfSlcbn0pXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsU0FBZ0IsUUFBUSxZQUFvQjtBQUM1QyxRQUFPLElBQUksU0FBZSxTQUFTLFdBQVc7QUFDNUMsT0FBSyxtQkFBbUIsZUFBZSxPQUFPLFFBQVEsV0FBVztBQUMvRCxPQUFJLE9BQU87QUFDVCwrQkFBVSwyQkFBMkIsTUFBTTtBQUMzQyxXQUFPO0FBQ1A7R0FDRDtBQUVELHlCQUFLLDBDQUEwQztBQUMvQztFQUNEO0NBQ0Y7QUFDQSJ9