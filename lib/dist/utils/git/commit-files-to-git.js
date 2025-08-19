import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";
import { exec } from "node:child_process";

//#region src/utils/git/commit-files-to-git.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
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
					(0, import_core.info)("No changes to commit.");
					resolve();
					return;
				}
				return reject(`Error committing files: ${stderr || error.message}`);
			}
			(0, import_core.info)(stdout);
			resolve();
		});
	});
}

//#endregion
export { commitFilesToGit };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0LWZpbGVzLXRvLWdpdC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2NvbW1pdC1maWxlcy10by1naXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5mbyB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuXG5leHBvcnQgdHlwZSBDb21taXRGaWxlc1RvR2l0UGFyYW1zID0ge1xuICBjb21taXRNZXNzYWdlOiBzdHJpbmdcbn1cblxuLyoqXG4gKiBTdGFnZXMgdGhlIHNwZWNpZmllZCBmaWxlcyBhbmQgY3JlYXRlcyBhIEdpdCBjb21taXQgd2l0aCB0aGUgcHJvdmlkZWQgY29tbWl0IG1lc3NhZ2UgYW5kIGF1dGhvciBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0gY29tbWl0TWVzc2FnZSAtIFRoZSBjb21taXQgbWVzc2FnZSB0byB1c2UgZm9yIHRoZSBHaXQgY29tbWl0LlxuICogQHBhcmFtIGF1dGhvck5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY29tbWl0IGF1dGhvci5cbiAqIEBwYXJhbSBhdXRob3JFbWFpbCAtIFRoZSBlbWFpbCBhZGRyZXNzIG9mIHRoZSBjb21taXQgYXV0aG9yLlxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZmlsZXMgaGF2ZSBiZWVuIGNvbW1pdHRlZCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIG9wZXJhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1pdEZpbGVzVG9HaXQoe1xuICBjb21taXRNZXNzYWdlLFxufTogQ29tbWl0RmlsZXNUb0dpdFBhcmFtcyk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGV4ZWMoYGdpdCBjb21taXQgLW0gXCIke2NvbW1pdE1lc3NhZ2V9XCJgLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWYgbm90aGluZyB0byBjb21taXQsIGRvbid0IHRyZWF0IGFzIGZhdGFsIGVycm9yXG4gICAgICAgIGlmIChzdGRlcnIuaW5jbHVkZXMoJ25vdGhpbmcgdG8gY29tbWl0JykpIHtcbiAgICAgICAgICBpbmZvKCdObyBjaGFuZ2VzIHRvIGNvbW1pdC4nKVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWplY3QoYEVycm9yIGNvbW1pdHRpbmcgZmlsZXM6ICR7c3RkZXJyIHx8IGVycm9yLm1lc3NhZ2V9YClcbiAgICAgIH1cbiAgICAgIGluZm8oc3Rkb3V0KVxuICAgICAgcmVzb2x2ZSgpXG4gICAgfSlcbiAgfSlcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWVBLFNBQWdCLGlCQUFpQixFQUMvQixlQUN1QixFQUFpQjtBQUN4QyxRQUFPLElBQUksU0FBZSxTQUFTLFdBQVc7QUFDNUMsT0FBSyxrQkFBa0IsY0FBYyxLQUFLLE9BQU8sUUFBUSxXQUFXO0FBQ2xFLE9BQUksT0FBTztBQUVULFFBQUksT0FBTyxTQUFTLHNCQUFzQjtBQUN4QywyQkFBSztBQUNMO0FBQ0E7SUFDRDtBQUNELFdBQU8sT0FBTywyQkFBMkIsVUFBVSxNQUFNO0dBQzFEO0FBQ0QseUJBQUs7QUFDTDtFQUNEO0NBQ0Y7QUFDRiJ9