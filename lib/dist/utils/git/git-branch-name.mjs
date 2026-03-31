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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LWJyYW5jaC1uYW1lLm1qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2dpdC1icmFuY2gtbmFtZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJztcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgR2l0IGJyYW5jaCBuYW1lIGJ5IGV4ZWN1dGluZyB0aGUgYXBwcm9wcmlhdGUgR2l0IGNvbW1hbmQuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgR2l0IGJyYW5jaCBhcyBhIHN0cmluZy5cbiAqIEB0aHJvd3MgV2lsbCByZWplY3QgdGhlIHByb21pc2Ugd2l0aCBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZSBHaXQgY29tbWFuZCBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdpdEJyYW5jaE5hbWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKCdnaXQgcmV2LXBhcnNlIC0tYWJicmV2LXJlZiBIRUFEJywgeyBlbmNvZGluZzogJ3V0Zi04JyB9LCAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChgRXJyb3IgZ2V0dGluZyBnaXQgYnJhbmNoIG5hbWU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShzdGRvdXQudHJpbSgpKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsU0FBZ0IsZ0JBQWlDO0FBQy9DLFFBQU8sSUFBSSxTQUFTLFNBQVMsV0FBVztBQUN0QyxPQUFLLG1DQUFtQyxFQUFFLFVBQVUsU0FBUyxHQUFHLE9BQU8sV0FBVztBQUNoRixPQUFJLE9BQU87QUFDVCxXQUFPLGtDQUFrQyxNQUFNLFVBQVU7QUFDekQ7O0FBRUYsV0FBUSxPQUFPLE1BQU0sQ0FBQztJQUN0QjtHQUNGIn0=