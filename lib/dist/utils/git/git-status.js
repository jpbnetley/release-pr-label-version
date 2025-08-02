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
		exec("git status --porcelain", (error, stdout, stderr) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LXN0YXR1cy5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2dpdC1zdGF0dXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIlxuXG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBgZ2l0IHN0YXR1cyAtLXBvcmNlbGFpbmAgY29tbWFuZCBhbmQgcmV0dXJucyBpdHMgb3V0cHV0IGFzIGEgdHJpbW1lZCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgb3V0cHV0IG9mIGBnaXQgc3RhdHVzIC0tcG9yY2VsYWluYC5cbiAqIEB0aHJvd3MgSWYgdGhlIGdpdCBjb21tYW5kIGZhaWxzLCB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnaXRTdGF0dXMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKCdnaXQgc3RhdHVzIC0tcG9yY2VsYWluJywgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGBFcnJvciBnZXR0aW5nIGdpdCBzdGF0dXM6ICR7c3RkZXJyfWApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlamVjdChgRXJyb3IgZ2V0dGluZyBnaXQgc3RhdHVzOiAke2Vycm9yLm1lc3NhZ2V9YClcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoc3Rkb3V0LnRyaW0oKSlcbiAgICB9KVxuICB9KVxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBUUEsU0FBZ0IsWUFBNkI7QUFDM0MsUUFBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7RUFDdEMsS0FBSywwQkFBMEIsQ0FBQyxPQUFPLFFBQVEsV0FBVztBQUN4RCxPQUFJLE9BQU87QUFDVCxRQUFJLE9BQ0YsUUFBTyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDO0FBRXRELFdBQU8sT0FBTyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sU0FBUyxDQUFDO0dBQzVEO0dBQ0QsUUFBUSxPQUFPLE1BQU0sQ0FBQztFQUN2QixFQUFDO0NBQ0g7QUFDRiJ9