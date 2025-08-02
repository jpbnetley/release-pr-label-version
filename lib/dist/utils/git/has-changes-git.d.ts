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