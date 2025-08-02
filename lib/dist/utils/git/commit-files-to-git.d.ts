//#region src/utils/git/commit-files-to-git.d.ts
type CommitFilesToGitParams = {
  commitMessage: string;
  authorName: string;
  authorEmail: string;
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
  commitMessage,
  authorEmail,
  authorName
}: CommitFilesToGitParams): Promise<void>;
//#endregion
export { CommitFilesToGitParams, commitFilesToGit };