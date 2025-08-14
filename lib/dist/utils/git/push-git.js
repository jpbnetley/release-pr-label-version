import { __toESM, require_core } from "../../core-Bd4l5kNc.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1naXQuanMiLCJuYW1lcyI6WyJicmFuY2hOYW1lOiBzdHJpbmciXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L3B1c2gtZ2l0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluZm8sIHNldEZhaWxlZCB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuXG5leHBvcnQgdHlwZSBHaXRQdXNoUGFyYW1zID0ge1xuICBvd25lcjogc3RyaW5nXG4gIHJlcG86IHN0cmluZ1xuICBicmFuY2hOYW1lOiBzdHJpbmdcbiAgY29tbWl0TWVzc2FnZT86IHN0cmluZ1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXN5bmMgZnVuY3Rpb24gdG8gcHVzaCBjaGFuZ2VzIHRvIGEgc3BlY2lmaWVkIGJyYW5jaCBpbiBhIEdpdEh1YiByZXBvc2l0b3J5IHVzaW5nIE9jdG9raXQuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIEdpdEh1YiBBUEkgcmVxdWVzdHMuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IHB1c2hlcyBjaGFuZ2VzIHRvIGEgYnJhbmNoLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBwYXJhbWV0ZXJzOlxuICogQHBhcmFtIG93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHJlcG8gLSBUaGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGJyYW5jaCB0byBwdXNoIGNoYW5nZXMgdG8uXG4gKiBAcGFyYW0gY29tbWl0TWVzc2FnZSAtIChPcHRpb25hbCkgVGhlIGNvbW1pdCBTSEEgdG8gdXBkYXRlIHRoZSBicmFuY2ggcmVmZXJlbmNlIHRvLiBEZWZhdWx0cyB0byAnVXBkYXRlIGJyYW5jaCcuXG4gKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgZGF0YSBmcm9tIHRoZSBHaXRIdWIgQVBJIGFmdGVyIHVwZGF0aW5nIHRoZSByZWZlcmVuY2UsIG9yIHVuZGVmaW5lZCBpZiBhbiBlcnJvciBvY2N1cnMuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoZSBgY29tbWl0TWVzc2FnZWAgcGFyYW1ldGVyIGlzIHVzZWQgYXMgdGhlIFNIQSBmb3IgdGhlIHVwZGF0ZVJlZiBjYWxsLCB3aGljaCBzaG91bGQgYmUgdGhlIGNvbW1pdCBTSEEgeW91IHdhbnQgdGhlIGJyYW5jaCB0byBwb2ludCB0by5cbiAqIElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHB1c2gsIHRoZSBmdW5jdGlvbiB3aWxsIGNhbGwgYHNldEZhaWxlZGAgd2l0aCBhbiBhcHByb3ByaWF0ZSBlcnJvciBtZXNzYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2l0UHVzaChicmFuY2hOYW1lOiBzdHJpbmcpIHtcbnJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGV4ZWMoYGdpdCBwdXNoIG9yaWdpbiAke2JyYW5jaE5hbWV9YCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgc2V0RmFpbGVkKGBGYWlsZWQgdG8gcHVzaCBjaGFuZ2VzOiAke2Vycm9yLm1lc3NhZ2V9YClcbiAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGluZm8oYFN1Y2Nlc3NmdWxseSBwdXNoZWQgY2hhbmdlcyB0byBicmFuY2g6ICR7YnJhbmNoTmFtZX1gKVxuICAgIHJlc29sdmUoKVxuICB9KVxufSlcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxTQUFnQixRQUFRQSxZQUFvQjtBQUM1QyxRQUFPLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztFQUM1QyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLENBQUMsT0FBTyxRQUFRLFdBQVc7QUFDL0QsT0FBSSxPQUFPOytCQUNDLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxTQUFTLENBQUM7SUFDckQsT0FBTyxNQUFNO0FBQ2I7R0FDRDt5QkFFSSxDQUFDLHVDQUF1QyxFQUFFLFlBQVksQ0FBQztHQUM1RCxTQUFTO0VBQ1YsRUFBQztDQUNIO0FBQ0EifQ==