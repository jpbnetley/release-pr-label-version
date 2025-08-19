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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWJyYW5jaC1naXQuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9kZWxldGUtYnJhbmNoLWdpdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuXG4vKipcbiAqIERlbGV0ZXMgYSBsb2NhbCBHaXQgYnJhbmNoIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxuICpcbiAqIEV4ZWN1dGVzIHRoZSBgZ2l0IGJyYW5jaCAtZCA8YnJhbmNoTmFtZT5gIGNvbW1hbmQgdG8gZGVsZXRlIHRoZSBicmFuY2guXG4gKiBJZiB0aGUgYnJhbmNoIGNhbm5vdCBiZSBkZWxldGVkIChlLmcuLCBpdCBpcyBub3QgZnVsbHkgbWVyZ2VkKSwgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGxvY2FsIEdpdCBicmFuY2ggdG8gZGVsZXRlLlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYnJhbmNoIGlzIHN1Y2Nlc3NmdWxseSBkZWxldGVkLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgZGVsZXRpb24gZmFpbHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVHaXRCcmFuY2goYnJhbmNoTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYyhgZ2l0IGJyYW5jaCAtZCAke2JyYW5jaE5hbWV9YCwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChgRXJyb3IgZGVsZXRpbmcgYnJhbmNoOiAke2Vycm9yLm1lc3NhZ2V9YClcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKVxuICAgIH0pXG4gIH0pXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVdBLFNBQWdCLGdCQUFnQixZQUFtQztBQUNqRSxRQUFPLElBQUksU0FBZSxTQUFTLFdBQVc7QUFDNUMsT0FBSyxpQkFBaUIsZUFBZSxVQUFVO0FBQzdDLE9BQUksTUFDRixRQUFPLE9BQU8sMEJBQTBCLE1BQU07QUFFaEQ7RUFDRDtDQUNGO0FBQ0YifQ==