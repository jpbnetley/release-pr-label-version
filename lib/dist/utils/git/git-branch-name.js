import { exec } from "node:child_process";

//#region src/utils/git/git-branch-name.ts
/**
* Retrieves the current Git branch name by executing the appropriate Git command.
*
* @returns A promise that resolves to the name of the current Git branch as a string.
* @throws Will reject the promise with an error message if the Git command fails.
*/
function gitBranchName() {
	return new Promise((resolve, reject) => {
		exec("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }, (error, stdout) => {
			if (error) {
				reject(`Error getting git branch name: ${error.message}`);
				return;
			}
			resolve(stdout.trim());
		});
	});
}

//#endregion
export { gitBranchName };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LWJyYW5jaC1uYW1lLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvZ2l0LWJyYW5jaC1uYW1lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IEdpdCBicmFuY2ggbmFtZSBieSBleGVjdXRpbmcgdGhlIGFwcHJvcHJpYXRlIEdpdCBjb21tYW5kLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IEdpdCBicmFuY2ggYXMgYSBzdHJpbmcuXG4gKiBAdGhyb3dzIFdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgR2l0IGNvbW1hbmQgZmFpbHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnaXRCcmFuY2hOYW1lKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYyhcbiAgICAgICdnaXQgcmV2LXBhcnNlIC0tYWJicmV2LXJlZiBIRUFEJyxcbiAgICAgIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSxcbiAgICAgIChlcnJvciwgc3Rkb3V0KSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChgRXJyb3IgZ2V0dGluZyBnaXQgYnJhbmNoIG5hbWU6ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoc3Rkb3V0LnRyaW0oKSlcbiAgICAgIH1cbiAgICApXG4gIH0pXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVFBLFNBQWdCLGdCQUFpQztBQUMvQyxRQUFPLElBQUksU0FBUyxTQUFTLFdBQVc7QUFDdEMsT0FDRSxtQ0FDQSxFQUFFLFVBQVUsU0FBUyxHQUNwQixPQUFPLFdBQVc7QUFDakIsT0FBSSxPQUFPO0FBQ1QsV0FBTyxrQ0FBa0MsTUFBTTtBQUMvQztHQUNEO0FBQ0QsV0FBUSxPQUFPO0VBQ2hCO0NBRUo7QUFDRiJ9