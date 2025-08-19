import { exec } from "node:child_process";

//#region src/utils/git/git-status.ts
/**
* Executes the `git status --porcelain` command and returns its output as a trimmed string.
*
* @returns A promise that resolves with the output of `git status --porcelain`.
* @throws If the git command fails, the promise is rejected with an error message.
*/
function gitStatus() {
	return new Promise((resolve, reject) => {
		exec("git status --porcelain", { encoding: "utf-8" }, (error, stdout, stderr) => {
			if (error) {
				if (stderr) return reject(`Error getting git status: ${stderr}`);
				return reject(`Error getting git status: ${error.message}`);
			}
			resolve(stdout.trim());
		});
	});
}

//#endregion
export { gitStatus };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LXN0YXR1cy5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2dpdC1zdGF0dXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcblxuLyoqXG4gKiBFeGVjdXRlcyB0aGUgYGdpdCBzdGF0dXMgLS1wb3JjZWxhaW5gIGNvbW1hbmQgYW5kIHJldHVybnMgaXRzIG91dHB1dCBhcyBhIHRyaW1tZWQgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG91dHB1dCBvZiBgZ2l0IHN0YXR1cyAtLXBvcmNlbGFpbmAuXG4gKiBAdGhyb3dzIElmIHRoZSBnaXQgY29tbWFuZCBmYWlscywgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2l0U3RhdHVzKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYyhcbiAgICAgICdnaXQgc3RhdHVzIC0tcG9yY2VsYWluJyxcbiAgICAgIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSxcbiAgICAgIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHN0ZGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgRXJyb3IgZ2V0dGluZyBnaXQgc3RhdHVzOiAke3N0ZGVycn1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGBFcnJvciBnZXR0aW5nIGdpdCBzdGF0dXM6ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoc3Rkb3V0LnRyaW0oKSlcbiAgICAgIH1cbiAgICApXG4gIH0pXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVFBLFNBQWdCLFlBQTZCO0FBQzNDLFFBQU8sSUFBSSxTQUFTLFNBQVMsV0FBVztBQUN0QyxPQUNFLDBCQUNBLEVBQUUsVUFBVSxTQUFTLEdBQ3BCLE9BQU8sUUFBUSxXQUFXO0FBQ3pCLE9BQUksT0FBTztBQUNULFFBQUksT0FDRixRQUFPLE9BQU8sNkJBQTZCO0FBRTdDLFdBQU8sT0FBTyw2QkFBNkIsTUFBTTtHQUNsRDtBQUNELFdBQVEsT0FBTztFQUNoQjtDQUVKO0FBQ0YifQ==