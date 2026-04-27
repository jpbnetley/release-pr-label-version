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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLWNoYW5nZXMtZ2l0LmQubXRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvaGFzLWNoYW5nZXMtZ2l0LnRzIl0sIm1hcHBpbmdzIjoiOztBQVVBOzs7Ozs7O2lCQUFnQixhQUFBLENBQUEsR0FBaUIsT0FBQSJ9