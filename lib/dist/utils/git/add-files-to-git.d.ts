//#region src/utils/git/add-files-to-git.d.ts
/**
 * Adds the specified files to the current Git staging area using the `git add` command.
 *
 * @param files - An array of file paths to add to Git.
 * @remarks
 * - If the `files` array is empty, the function logs a message and returns without performing any action.
 * - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
 */
declare function addFilesToGit(files?: string[]): Promise<void>;
//#endregion
export { addFilesToGit };