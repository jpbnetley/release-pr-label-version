//#region src/utils/git/git-branch-name.d.ts
/**
 * Retrieves the current Git branch name by executing the appropriate Git command.
 *
 * @returns A promise that resolves to the name of the current Git branch as a string.
 * @throws Will reject the promise with an error message if the Git command fails.
 */
declare function gitBranchName(): Promise<string>;
//#endregion
export { gitBranchName };