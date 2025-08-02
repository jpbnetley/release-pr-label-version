import { exec } from "node:child_process";

//#region src/utils/git/delete-branch-git.ts
/**
* Deletes a local Git branch with the specified name.
*
* Executes the `git branch -d <branchName>` command to delete the branch.
* If the branch cannot be deleted (e.g., it is not fully merged), the promise is rejected with an error message.
*
* @param branchName - The name of the local Git branch to delete.
* @returns A promise that resolves when the branch is successfully deleted, or rejects with an error message if the deletion fails.
*/
function deleteGitBranch(branchName) {
	return new Promise((resolve, reject) => {
		exec(`git branch -d ${branchName}`, (error) => {
			if (error) return reject(`Error deleting branch: ${error.message}`);
			resolve();
		});
	});
}

//#endregion
export { deleteGitBranch };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWJyYW5jaC1naXQuanMiLCJuYW1lcyI6WyJicmFuY2hOYW1lOiBzdHJpbmciXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2RlbGV0ZS1icmFuY2gtZ2l0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5cbi8qKlxuICogRGVsZXRlcyBhIGxvY2FsIEdpdCBicmFuY2ggd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXG4gKlxuICogRXhlY3V0ZXMgdGhlIGBnaXQgYnJhbmNoIC1kIDxicmFuY2hOYW1lPmAgY29tbWFuZCB0byBkZWxldGUgdGhlIGJyYW5jaC5cbiAqIElmIHRoZSBicmFuY2ggY2Fubm90IGJlIGRlbGV0ZWQgKGUuZy4sIGl0IGlzIG5vdCBmdWxseSBtZXJnZWQpLCB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIGJyYW5jaE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbG9jYWwgR2l0IGJyYW5jaCB0byBkZWxldGUuXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBicmFuY2ggaXMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQsIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZSBkZWxldGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUdpdEJyYW5jaChicmFuY2hOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKGBnaXQgYnJhbmNoIC1kICR7YnJhbmNoTmFtZX1gLCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KGBFcnJvciBkZWxldGluZyBicmFuY2g6ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpXG4gICAgfSlcbiAgfSlcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBV0EsU0FBZ0IsZ0JBQWdCQSxZQUFtQztBQUNqRSxRQUFPLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztFQUM1QyxLQUFLLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxDQUFDLFVBQVU7QUFDN0MsT0FBSSxNQUNGLFFBQU8sT0FBTyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sU0FBUyxDQUFDO0dBRTFELFNBQVM7RUFDVixFQUFDO0NBQ0g7QUFDRiJ9