import { n as info, t as error } from "../../core-lJ5mRC0h.mjs";
import { execSync } from "node:child_process";
//#region src/utils/git/add-files-to-git.ts
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
			info("No files to add to git.");
			resolve();
			return;
		}
		try {
			execSync(`git add ${files.join(" ")}`, { stdio: "inherit" });
			info(`Added files to git: ${files.join(", ")}`);
			resolve();
		} catch (err) {
			error(err instanceof Error ? err : `Error adding files to git: ${err}`);
			reject(err);
		}
	});
}
//#endregion
export { addFilesToGit };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWZpbGVzLXRvLWdpdC5tanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9hZGQtZmlsZXMtdG8tZ2l0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluZm8sIGVycm9yIH0gZnJvbSAnQGFjdGlvbnMvY29yZSc7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2Vzcyc7XG4vKipcbiAqIEFkZHMgdGhlIHNwZWNpZmllZCBmaWxlcyB0byB0aGUgY3VycmVudCBHaXQgc3RhZ2luZyBhcmVhIHVzaW5nIHRoZSBgZ2l0IGFkZGAgY29tbWFuZC5cbiAqXG4gKiBAcGFyYW0gZmlsZXMgLSBBbiBhcnJheSBvZiBmaWxlIHBhdGhzIHRvIGFkZCB0byBHaXQuXG4gKiBAcmVtYXJrc1xuICogLSBJZiB0aGUgYGZpbGVzYCBhcnJheSBpcyBlbXB0eSwgdGhlIGZ1bmN0aW9uIGxvZ3MgYSBtZXNzYWdlIGFuZCByZXR1cm5zIHdpdGhvdXQgcGVyZm9ybWluZyBhbnkgYWN0aW9uLlxuICogLSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBleGVjdXRpb24gb2YgdGhlIGBnaXQgYWRkYCBjb21tYW5kLCB0aGUgZXJyb3IgaXMgbG9nZ2VkIGFuZCB0aGUgcHJvY2VzcyBleGl0cyB3aXRoIGNvZGUgMS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEZpbGVzVG9HaXQoZmlsZXM6IHN0cmluZ1tdID0gWycuJ10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIWZpbGVzIHx8IGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaW5mbygnTm8gZmlsZXMgdG8gYWRkIHRvIGdpdC4nKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgZXhlY1N5bmMoYGdpdCBhZGQgJHtmaWxlcy5qb2luKCcgJyl9YCwgeyBzdGRpbzogJ2luaGVyaXQnIH0pO1xuICAgICAgaW5mbyhgQWRkZWQgZmlsZXMgdG8gZ2l0OiAke2ZpbGVzLmpvaW4oJywgJyl9YCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyciA6IGBFcnJvciBhZGRpbmcgZmlsZXMgdG8gZ2l0OiAke2Vycn1gKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBVUEsU0FBZ0IsY0FBYyxRQUFrQixDQUFDLElBQUksRUFBaUI7QUFDcEUsUUFBTyxJQUFJLFNBQWUsU0FBUyxXQUFXO0FBQzVDLE1BQUksQ0FBQyxTQUFTLE1BQU0sV0FBVyxHQUFHO0FBQ2hDLFFBQUssMEJBQTBCO0FBQy9CLFlBQVM7QUFDVDs7QUFHRixNQUFJO0FBQ0YsWUFBUyxXQUFXLE1BQU0sS0FBSyxJQUFJLElBQUksRUFBRSxPQUFPLFdBQVcsQ0FBQztBQUM1RCxRQUFLLHVCQUF1QixNQUFNLEtBQUssS0FBSyxHQUFHO0FBQy9DLFlBQVM7V0FDRixLQUFLO0FBQ1osU0FBTSxlQUFlLFFBQVEsTUFBTSw4QkFBOEIsTUFBTTtBQUN2RSxVQUFPLElBQUk7O0dBRWIifQ==