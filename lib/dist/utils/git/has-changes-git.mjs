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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLWNoYW5nZXMtZ2l0Lm1qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2hhcy1jaGFuZ2VzLWdpdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlcmUgYXJlIGFueSB1bmNvbW1pdHRlZCBjaGFuZ2VzIGluIHRoZSBjdXJyZW50IEdpdCByZXBvc2l0b3J5LlxuICpcbiAqIEV4ZWN1dGVzIGBnaXQgc3RhdHVzIC0tcG9yY2VsYWluYCB0byBkZXRlcm1pbmUgaWYgdGhlIHdvcmtpbmcgZGlyZWN0b3J5IGlzIGNsZWFuLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGB0cnVlYCBpZiB0aGVyZSBhcmUgdW5jb21taXR0ZWQgY2hhbmdlcywgb3IgYGZhbHNlYCBpZiB0aGUgd29ya2luZyBkaXJlY3RvcnkgaXMgY2xlYW4uXG4gKiBAdGhyb3dzIElmIHRoZXJlIGlzIGFuIGVycm9yIGV4ZWN1dGluZyB0aGUgR2l0IGNvbW1hbmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNHaXRDaGFuZ2VzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGV4ZWMoJ2dpdCBzdGF0dXMgLS1wb3JjZWxhaW4nLCB7IGVuY29kaW5nOiAndXRmLTgnIH0sIChlcnJvciwgc3Rkb3V0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGBFcnJvciBleGVjdXRpbmcgZ2l0IHN0YXR1czogJHtlcnJvcn1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3Rkb3V0KSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVQSxTQUFnQixnQkFBa0M7QUFDaEQsUUFBTyxJQUFJLFNBQVMsU0FBUyxXQUFXO0FBQ3RDLE9BQUssMEJBQTBCLEVBQUUsVUFBVSxTQUFTLEdBQUcsT0FBTyxXQUFXO0FBQ3ZFLE9BQUksT0FBTztBQUNULFdBQU8sK0JBQStCLFFBQVE7QUFDOUM7O0FBR0YsT0FBSSxPQUNGLFNBQVEsS0FBSztPQUViLFNBQVEsTUFBTTtJQUVoQjtHQUNGIn0=