import { info } from '@actions/core'
import { exec } from 'node:child_process'

export type CommitFilesToGitParams = {
  commitMessage: string
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
}: CommitFilesToGitParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
      if (error) {
        // If nothing to commit, don't treat as fatal error
        if (stderr.includes('nothing to commit')) {
          info('No changes to commit.')
          resolve()
          return
        }
        return reject(`Error committing files: ${stderr || error.message}`)
      }
      info(stdout)
      resolve()
    })
  })
}
