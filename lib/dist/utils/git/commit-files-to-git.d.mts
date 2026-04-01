//#region src/utils/git/commit-files-to-git.d.ts
type CommitFilesToGitParams = {
  commitMessage: string;
};
/**
 * Stages the specified files and creates a Git commit with the provided commit message and author information.
 *
 * @param commitMessage - The commit message to use for the Git commit.
 * @param authorName - The name of the commit author.
 * @param authorEmail - The email address of the commit author.
 * @returns A Promise that resolves when the files have been committed, or rejects with an error message if the operation fails.
 */
declare function commitFilesToGit({
  commitMessage
}: CommitFilesToGitParams): Promise<void>;
//#endregion
export { CommitFilesToGitParams, commitFilesToGit };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0LWZpbGVzLXRvLWdpdC5kLm10cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2NvbW1pdC1maWxlcy10by1naXQudHMiXSwibWFwcGluZ3MiOiI7S0FHWSxzQkFBQTtFQUNWLGFBQUE7QUFBQTs7OztBQVdGOzs7OztpQkFBZ0IsZ0JBQUEsQ0FBQTtFQUFtQjtBQUFBLEdBQWlCLHNCQUFBLEdBQXlCLE9BQUEifQ==