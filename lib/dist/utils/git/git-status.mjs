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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LXN0YXR1cy5tanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9naXQtc3RhdHVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBgZ2l0IHN0YXR1cyAtLXBvcmNlbGFpbmAgY29tbWFuZCBhbmQgcmV0dXJucyBpdHMgb3V0cHV0IGFzIGEgdHJpbW1lZCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgb3V0cHV0IG9mIGBnaXQgc3RhdHVzIC0tcG9yY2VsYWluYC5cbiAqIEB0aHJvd3MgSWYgdGhlIGdpdCBjb21tYW5kIGZhaWxzLCB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnaXRTdGF0dXMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKCdnaXQgc3RhdHVzIC0tcG9yY2VsYWluJywgeyBlbmNvZGluZzogJ3V0Zi04JyB9LCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKHN0ZGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoYEVycm9yIGdldHRpbmcgZ2l0IHN0YXR1czogJHtzdGRlcnJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlamVjdChgRXJyb3IgZ2V0dGluZyBnaXQgc3RhdHVzOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKHN0ZG91dC50cmltKCkpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxTQUFnQixZQUE2QjtBQUMzQyxRQUFPLElBQUksU0FBUyxTQUFTLFdBQVc7QUFDdEMsT0FBSywwQkFBMEIsRUFBRSxVQUFVLFNBQVMsR0FBRyxPQUFPLFFBQVEsV0FBVztBQUMvRSxPQUFJLE9BQU87QUFDVCxRQUFJLE9BQ0YsUUFBTyxPQUFPLDZCQUE2QixTQUFTO0FBRXRELFdBQU8sT0FBTyw2QkFBNkIsTUFBTSxVQUFVOztBQUU3RCxXQUFRLE9BQU8sTUFBTSxDQUFDO0lBQ3RCO0dBQ0YifQ==