import { info, setFailed } from "@actions/core";
import { exec } from "node:child_process";
//#region src/utils/git/push-git.ts
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
		exec(`git push origin ${branchName}`, (error) => {
			if (error) {
				setFailed(`Failed to push changes: ${error.message}`);
				reject(error);
				return;
			}
			info(`Successfully pushed changes to branch: ${branchName}`);
			resolve();
		});
	});
}
//#endregion
export { gitPush };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1naXQubWpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvcHVzaC1naXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5mbywgc2V0RmFpbGVkIH0gZnJvbSAnQGFjdGlvbnMvY29yZSc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJztcblxuZXhwb3J0IHR5cGUgR2l0UHVzaFBhcmFtcyA9IHtcbiAgb3duZXI6IHN0cmluZztcbiAgcmVwbzogc3RyaW5nO1xuICBicmFuY2hOYW1lOiBzdHJpbmc7XG4gIGNvbW1pdE1lc3NhZ2U/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXN5bmMgZnVuY3Rpb24gdG8gcHVzaCBjaGFuZ2VzIHRvIGEgc3BlY2lmaWVkIGJyYW5jaCBpbiBhIEdpdEh1YiByZXBvc2l0b3J5IHVzaW5nIE9jdG9raXQuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIEdpdEh1YiBBUEkgcmVxdWVzdHMuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IHB1c2hlcyBjaGFuZ2VzIHRvIGEgYnJhbmNoLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBwYXJhbWV0ZXJzOlxuICogQHBhcmFtIG93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHJlcG8gLSBUaGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGJyYW5jaCB0byBwdXNoIGNoYW5nZXMgdG8uXG4gKiBAcGFyYW0gY29tbWl0TWVzc2FnZSAtIChPcHRpb25hbCkgVGhlIGNvbW1pdCBTSEEgdG8gdXBkYXRlIHRoZSBicmFuY2ggcmVmZXJlbmNlIHRvLiBEZWZhdWx0cyB0byAnVXBkYXRlIGJyYW5jaCcuXG4gKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgZGF0YSBmcm9tIHRoZSBHaXRIdWIgQVBJIGFmdGVyIHVwZGF0aW5nIHRoZSByZWZlcmVuY2UsIG9yIHVuZGVmaW5lZCBpZiBhbiBlcnJvciBvY2N1cnMuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoZSBgY29tbWl0TWVzc2FnZWAgcGFyYW1ldGVyIGlzIHVzZWQgYXMgdGhlIFNIQSBmb3IgdGhlIHVwZGF0ZVJlZiBjYWxsLCB3aGljaCBzaG91bGQgYmUgdGhlIGNvbW1pdCBTSEEgeW91IHdhbnQgdGhlIGJyYW5jaCB0byBwb2ludCB0by5cbiAqIElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHB1c2gsIHRoZSBmdW5jdGlvbiB3aWxsIGNhbGwgYHNldEZhaWxlZGAgd2l0aCBhbiBhcHByb3ByaWF0ZSBlcnJvciBtZXNzYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2l0UHVzaChicmFuY2hOYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKGBnaXQgcHVzaCBvcmlnaW4gJHticmFuY2hOYW1lfWAsIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBzZXRGYWlsZWQoYEZhaWxlZCB0byBwdXNoIGNoYW5nZXM6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpbmZvKGBTdWNjZXNzZnVsbHkgcHVzaGVkIGNoYW5nZXMgdG8gYnJhbmNoOiAke2JyYW5jaE5hbWV9YCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxTQUFnQixRQUFRLFlBQW9CO0FBQzFDLFFBQU8sSUFBSSxTQUFlLFNBQVMsV0FBVztBQUM1QyxPQUFLLG1CQUFtQixlQUFjLFVBQVM7QUFDN0MsT0FBSSxPQUFPO0FBQ1QsY0FBVSwyQkFBMkIsTUFBTSxVQUFVO0FBQ3JELFdBQU8sTUFBTTtBQUNiOztBQUdGLFFBQUssMENBQTBDLGFBQWE7QUFDNUQsWUFBUztJQUNUO0dBQ0YifQ==