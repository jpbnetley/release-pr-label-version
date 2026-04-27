import { exec } from "node:child_process";
//#region src/utils/git/checkout-branch-git.ts
/**
* Creates and checks out a new Git branch from the specified base branch.
*
* @param baseBranch - The name of the base branch to branch off from. Defaults to 'main'.
* @returns A promise that resolves when the branch has been successfully checked out, or rejects with an error message if the operation fails.
*/
function checkoutBranch(baseBranch) {
	return new Promise((resolve, reject) => {
		exec(`git checkout -b ${baseBranch}`, (error) => {
			if (error) return reject(`Error checking out branch: ${error.message}`);
			resolve();
		});
	});
}
//#endregion
export { checkoutBranch };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYnJhbmNoLWdpdC5tanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9jaGVja291dC1icmFuY2gtZ2l0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIGNoZWNrcyBvdXQgYSBuZXcgR2l0IGJyYW5jaCBmcm9tIHRoZSBzcGVjaWZpZWQgYmFzZSBicmFuY2guXG4gKlxuICogQHBhcmFtIGJhc2VCcmFuY2ggLSBUaGUgbmFtZSBvZiB0aGUgYmFzZSBicmFuY2ggdG8gYnJhbmNoIG9mZiBmcm9tLiBEZWZhdWx0cyB0byAnbWFpbicuXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBicmFuY2ggaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGNoZWNrZWQgb3V0LCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgb3BlcmF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tvdXRCcmFuY2goYmFzZUJyYW5jaDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYyhgZ2l0IGNoZWNrb3V0IC1iICR7YmFzZUJyYW5jaH1gLCBlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChgRXJyb3IgY2hlY2tpbmcgb3V0IGJyYW5jaDogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxTQUFnQixlQUFlLFlBQW1DO0FBQ2hFLFFBQU8sSUFBSSxTQUFlLFNBQVMsV0FBVztBQUM1QyxPQUFLLG1CQUFtQixlQUFjLFVBQVM7QUFDN0MsT0FBSSxNQUNGLFFBQU8sT0FBTyw4QkFBOEIsTUFBTSxVQUFVO0FBRTlELFlBQVM7SUFDVDtHQUNGIn0=