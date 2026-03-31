import { n as info } from "../../core-lJ5mRC0h.mjs";
import { exec } from "node:child_process";
//#region src/utils/git/commit-files-to-git.ts
/**
* Stages the specified files and creates a Git commit with the provided commit message and author information.
*
* @param commitMessage - The commit message to use for the Git commit.
* @param authorName - The name of the commit author.
* @param authorEmail - The email address of the commit author.
* @returns A Promise that resolves when the files have been committed, or rejects with an error message if the operation fails.
*/
function commitFilesToGit({ commitMessage }) {
	return new Promise((resolve, reject) => {
		exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
			if (error) {
				if (stderr.includes("nothing to commit")) {
					info("No changes to commit.");
					resolve();
					return;
				}
				return reject(`Error committing files: ${stderr || error.message}`);
			}
			info(stdout);
			resolve();
		});
	});
}
//#endregion
export { commitFilesToGit };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0LWZpbGVzLXRvLWdpdC5tanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9jb21taXQtZmlsZXMtdG8tZ2l0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluZm8gfSBmcm9tICdAYWN0aW9ucy9jb3JlJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG5leHBvcnQgdHlwZSBDb21taXRGaWxlc1RvR2l0UGFyYW1zID0ge1xuICBjb21taXRNZXNzYWdlOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFN0YWdlcyB0aGUgc3BlY2lmaWVkIGZpbGVzIGFuZCBjcmVhdGVzIGEgR2l0IGNvbW1pdCB3aXRoIHRoZSBwcm92aWRlZCBjb21taXQgbWVzc2FnZSBhbmQgYXV0aG9yIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSBjb21taXRNZXNzYWdlIC0gVGhlIGNvbW1pdCBtZXNzYWdlIHRvIHVzZSBmb3IgdGhlIEdpdCBjb21taXQuXG4gKiBAcGFyYW0gYXV0aG9yTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb21taXQgYXV0aG9yLlxuICogQHBhcmFtIGF1dGhvckVtYWlsIC0gVGhlIGVtYWlsIGFkZHJlc3Mgb2YgdGhlIGNvbW1pdCBhdXRob3IuXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBmaWxlcyBoYXZlIGJlZW4gY29tbWl0dGVkLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgb3BlcmF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0RmlsZXNUb0dpdCh7IGNvbW1pdE1lc3NhZ2UgfTogQ29tbWl0RmlsZXNUb0dpdFBhcmFtcyk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGV4ZWMoYGdpdCBjb21taXQgLW0gXCIke2NvbW1pdE1lc3NhZ2V9XCJgLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWYgbm90aGluZyB0byBjb21taXQsIGRvbid0IHRyZWF0IGFzIGZhdGFsIGVycm9yXG4gICAgICAgIGlmIChzdGRlcnIuaW5jbHVkZXMoJ25vdGhpbmcgdG8gY29tbWl0JykpIHtcbiAgICAgICAgICBpbmZvKCdObyBjaGFuZ2VzIHRvIGNvbW1pdC4nKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWplY3QoYEVycm9yIGNvbW1pdHRpbmcgZmlsZXM6ICR7c3RkZXJyIHx8IGVycm9yLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICBpbmZvKHN0ZG91dCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQWVBLFNBQWdCLGlCQUFpQixFQUFFLGlCQUF3RDtBQUN6RixRQUFPLElBQUksU0FBZSxTQUFTLFdBQVc7QUFDNUMsT0FBSyxrQkFBa0IsY0FBYyxLQUFLLE9BQU8sUUFBUSxXQUFXO0FBQ2xFLE9BQUksT0FBTztBQUVULFFBQUksT0FBTyxTQUFTLG9CQUFvQixFQUFFO0FBQ3hDLFVBQUssd0JBQXdCO0FBQzdCLGNBQVM7QUFDVDs7QUFFRixXQUFPLE9BQU8sMkJBQTJCLFVBQVUsTUFBTSxVQUFVOztBQUVyRSxRQUFLLE9BQU87QUFDWixZQUFTO0lBQ1Q7R0FDRiJ9