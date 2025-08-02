import { exec } from 'node:child_process'

export type CommitFilesToGitParams = {
  commitMessage: string
  authorName: string
  authorEmail: string
}

/**
 * Stages the specified files and creates a Git commit with the provided commit message and author information.
 *
 * @param commitMessage - The commit message to use for the Git commit.
 * @param authorName - The name of the commit author.
 * @param authorEmail - The email address of the commit author.
 * @returns A Promise that resolves when the files have been committed, or rejects with an error message if the operation fails.
 */
export function commitFilesToGit({
  commitMessage,
  authorEmail,
  authorName,
}: CommitFilesToGitParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(
      `git commit -m "${commitMessage}" --author="${authorName} <${authorEmail}>"`,
      (error) => {
        if (error) {
          return reject(`Error committing files: ${error.message}`)
        }
        resolve()
      }
    )
  })
}
