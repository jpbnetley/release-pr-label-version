import { exec } from "node:child_process";

//#region src/utils/git/has-changes-git.ts
/**
* Checks if there are any uncommitted changes in the current Git repository.
*
* Executes `git status --porcelain` to determine if the working directory is clean.
*
* @returns A promise that resolves to `true` if there are uncommitted changes, or `false` if the working directory is clean.
* @throws If there is an error executing the Git command.
*/
function hasGitChanges() {
	return new Promise((resolve, reject) => {
		exec("git status --porcelain", { encoding: "utf-8" }, (error, stdout) => {
			if (error) {
				reject(`Error executing git status: ${error}`);
				return;
			}
			if (stdout) resolve(true);
			else resolve(false);
		});
	});
}

//#endregion
export { hasGitChanges };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLWNoYW5nZXMtZ2l0LmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvaGFzLWNoYW5nZXMtZ2l0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgdW5jb21taXR0ZWQgY2hhbmdlcyBpbiB0aGUgY3VycmVudCBHaXQgcmVwb3NpdG9yeS5cbiAqXG4gKiBFeGVjdXRlcyBgZ2l0IHN0YXR1cyAtLXBvcmNlbGFpbmAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB3b3JraW5nIGRpcmVjdG9yeSBpcyBjbGVhbi5cbiAqXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBgdHJ1ZWAgaWYgdGhlcmUgYXJlIHVuY29tbWl0dGVkIGNoYW5nZXMsIG9yIGBmYWxzZWAgaWYgdGhlIHdvcmtpbmcgZGlyZWN0b3J5IGlzIGNsZWFuLlxuICogQHRocm93cyBJZiB0aGVyZSBpcyBhbiBlcnJvciBleGVjdXRpbmcgdGhlIEdpdCBjb21tYW5kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzR2l0Q2hhbmdlcygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKCdnaXQgc3RhdHVzIC0tcG9yY2VsYWluJywgeyBlbmNvZGluZzogJ3V0Zi04JyB9LCAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChgRXJyb3IgZXhlY3V0aW5nIGdpdCBzdGF0dXM6ICR7ZXJyb3J9YClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGRvdXQpIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVVBLFNBQWdCLGdCQUFrQztBQUNoRCxRQUFPLElBQUksU0FBUyxTQUFTLFdBQVc7QUFDdEMsT0FBSywwQkFBMEIsRUFBRSxVQUFVLFNBQVMsR0FBRyxPQUFPLFdBQVc7QUFDdkUsT0FBSSxPQUFPO0FBQ1QsV0FBTywrQkFBK0I7QUFDdEM7R0FDRDtBQUVELE9BQUksT0FDRixTQUFRO09BRVIsU0FBUTtFQUVYO0NBQ0Y7QUFDRiJ9