import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";
import { execSync } from "node:child_process";

//#region src/utils/git/add-files-to-git.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
/**
* Adds the specified files to the current Git staging area using the `git add` command.
*
* @param files - An array of file paths to add to Git.
* @remarks
* - If the `files` array is empty, the function logs a message and returns without performing any action.
* - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
*/
function addFilesToGit(files = ["."]) {
	return new Promise((resolve, reject) => {
		if (!files || files.length === 0) {
			(0, import_core.info)("No files to add to git.");
			resolve();
			return;
		}
		try {
			execSync(`git add ${files.join(" ")}`, { stdio: "inherit" });
			(0, import_core.info)(`Added files to git: ${files.join(", ")}`);
			resolve();
		} catch (err) {
			(0, import_core.error)(err instanceof Error ? err : `Error adding files to git: ${err}`);
			reject(err);
		}
	});
}

//#endregion
export { addFilesToGit };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWZpbGVzLXRvLWdpdC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2FkZC1maWxlcy10by1naXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5mbywgZXJyb3IgfSBmcm9tICdAYWN0aW9ucy9jb3JlJ1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG4vKipcbiAqIEFkZHMgdGhlIHNwZWNpZmllZCBmaWxlcyB0byB0aGUgY3VycmVudCBHaXQgc3RhZ2luZyBhcmVhIHVzaW5nIHRoZSBgZ2l0IGFkZGAgY29tbWFuZC5cbiAqXG4gKiBAcGFyYW0gZmlsZXMgLSBBbiBhcnJheSBvZiBmaWxlIHBhdGhzIHRvIGFkZCB0byBHaXQuXG4gKiBAcmVtYXJrc1xuICogLSBJZiB0aGUgYGZpbGVzYCBhcnJheSBpcyBlbXB0eSwgdGhlIGZ1bmN0aW9uIGxvZ3MgYSBtZXNzYWdlIGFuZCByZXR1cm5zIHdpdGhvdXQgcGVyZm9ybWluZyBhbnkgYWN0aW9uLlxuICogLSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBleGVjdXRpb24gb2YgdGhlIGBnaXQgYWRkYCBjb21tYW5kLCB0aGUgZXJyb3IgaXMgbG9nZ2VkIGFuZCB0aGUgcHJvY2VzcyBleGl0cyB3aXRoIGNvZGUgMS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEZpbGVzVG9HaXQoZmlsZXM6IHN0cmluZ1tdID0gWycuJ10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIWZpbGVzIHx8IGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaW5mbygnTm8gZmlsZXMgdG8gYWRkIHRvIGdpdC4nKVxuICAgICAgcmVzb2x2ZSgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgZXhlY1N5bmMoYGdpdCBhZGQgJHtmaWxlcy5qb2luKCcgJyl9YCwgeyBzdGRpbzogJ2luaGVyaXQnIH0pXG4gICAgICBpbmZvKGBBZGRlZCBmaWxlcyB0byBnaXQ6ICR7ZmlsZXMuam9pbignLCAnKX1gKVxuICAgICAgcmVzb2x2ZSgpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyciA6IGBFcnJvciBhZGRpbmcgZmlsZXMgdG8gZ2l0OiAke2Vycn1gKVxuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG4gIH0pXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFVQSxTQUFnQixjQUFjLFFBQWtCLENBQUMsSUFBSSxFQUFpQjtBQUNwRSxRQUFPLElBQUksU0FBZSxTQUFTLFdBQVc7QUFDNUMsTUFBSSxDQUFDLFNBQVMsTUFBTSxXQUFXLEdBQUc7QUFDaEMseUJBQUs7QUFDTDtBQUNBO0VBQ0Q7QUFFRCxNQUFJO0FBQ0YsWUFBUyxXQUFXLE1BQU0sS0FBSyxRQUFRLEVBQUUsT0FBTyxXQUFXO0FBQzNELHlCQUFLLHVCQUF1QixNQUFNLEtBQUs7QUFDdkM7RUFDRCxTQUFRLEtBQUs7QUFDWiwwQkFBTSxlQUFlLFFBQVEsTUFBTSw4QkFBOEI7QUFDakUsVUFBTztFQUNSO0NBQ0Y7QUFDRiJ9