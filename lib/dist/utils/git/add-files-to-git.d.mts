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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWZpbGVzLXRvLWdpdC5kLm10cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2FkZC1maWxlcy10by1naXQudHMiXSwibWFwcGluZ3MiOiI7O0FBVUE7Ozs7Ozs7aUJBQWdCLGFBQUEsQ0FBYyxLQUFBLGNBQTBCLE9BQUEifQ==