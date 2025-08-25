//#region src/utils/git/git-status.d.ts
/**
 * Executes the `git status --porcelain` command and returns its output as a trimmed string.
 *
 * @returns A promise that resolves with the output of `git status --porcelain`.
 * @throws If the git command fails, the promise is rejected with an error message.
 */
declare function gitStatus(): Promise<string>;
//#endregion
export { gitStatus };