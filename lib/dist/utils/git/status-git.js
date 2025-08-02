import { exec } from "node:child_process";

//#region src/utils/git/status-git.ts
/**
* Retrieves the current Git working directory status using the `git status --porcelain` command.
*
* @returns A promise that resolves with the trimmed output of the Git status command,
*          or rejects with an error message if the command fails.
*/
function getGitStatus() {
	return new Promise((resolve, reject) => {
		exec("git status --porcelain", (error, stdout, stderr) => {
			if (error) reject(`Error getting git status: ${stderr}`);
			else resolve(stdout.trim());
		});
	});
}

//#endregion
export { getGitStatus };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWdpdC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L3N0YXR1cy1naXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgR2l0IHdvcmtpbmcgZGlyZWN0b3J5IHN0YXR1cyB1c2luZyB0aGUgYGdpdCBzdGF0dXMgLS1wb3JjZWxhaW5gIGNvbW1hbmQuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdHJpbW1lZCBvdXRwdXQgb2YgdGhlIEdpdCBzdGF0dXMgY29tbWFuZCxcbiAqICAgICAgICAgIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZSBjb21tYW5kIGZhaWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2l0U3RhdHVzKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYygnZ2l0IHN0YXR1cyAtLXBvcmNlbGFpbicsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZWplY3QoYEVycm9yIGdldHRpbmcgZ2l0IHN0YXR1czogJHtzdGRlcnJ9YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoc3Rkb3V0LnRyaW0oKSlcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFRQSxTQUFnQixlQUFnQztBQUM5QyxRQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztFQUN0QyxLQUFLLDBCQUEwQixDQUFDLE9BQU8sUUFBUSxXQUFXO0FBQ3hELE9BQUksT0FDRixPQUFPLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDO1FBRTdDLFFBQVEsT0FBTyxNQUFNLENBQUM7RUFFekIsRUFBQztDQUNIO0FBQ0YifQ==