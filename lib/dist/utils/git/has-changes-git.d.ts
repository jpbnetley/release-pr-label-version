//#region src/utils/git/has-changes-git.d.ts
/**
 * Checks if there are any uncommitted changes in the current Git repository.
 *
 * Executes `git status --porcelain` to determine if the working directory is clean.
 *
 * @returns A promise that resolves to `true` if there are uncommitted changes, or `false` if the working directory is clean.
 * @throws If there is an error executing the Git command.
 */
declare function hasGitChanges(): Promise<boolean>;
//#endregion
export { hasGitChanges };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLWNoYW5nZXMtZ2l0LmQudHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9oYXMtY2hhbmdlcy1naXQuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHVuY29tbWl0dGVkIGNoYW5nZXMgaW4gdGhlIGN1cnJlbnQgR2l0IHJlcG9zaXRvcnkuXG4gKlxuICogRXhlY3V0ZXMgYGdpdCBzdGF0dXMgLS1wb3JjZWxhaW5gIHRvIGRldGVybWluZSBpZiB0aGUgd29ya2luZyBkaXJlY3RvcnkgaXMgY2xlYW4uXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIGlmIHRoZXJlIGFyZSB1bmNvbW1pdHRlZCBjaGFuZ2VzLCBvciBgZmFsc2VgIGlmIHRoZSB3b3JraW5nIGRpcmVjdG9yeSBpcyBjbGVhbi5cbiAqIEB0aHJvd3MgSWYgdGhlcmUgaXMgYW4gZXJyb3IgZXhlY3V0aW5nIHRoZSBHaXQgY29tbWFuZC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gaGFzR2l0Q2hhbmdlcygpOiBQcm9taXNlPGJvb2xlYW4+O1xuIl0sIm1hcHBpbmdzIjoiO0FBQUEsSUFBRSxnQkFBQSxDQUFBLElBQUEsTUFBQSxPQUFBIn0=