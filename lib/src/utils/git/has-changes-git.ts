import { exec } from 'node:child_process'

/**
 * Checks if there are any uncommitted changes in the current Git repository.
 *
 * Executes `git status --porcelain` to determine if the working directory is clean.
 *
 * @returns A promise that resolves to `true` if there are uncommitted changes, or `false` if the working directory is clean.
 * @throws If there is an error executing the Git command.
 */
export function hasGitChanges(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec('git status --porcelain', { encoding: 'utf-8' }, (error, stdout) => {
      if (error) {
        reject(`Error executing git status: ${error}`)
        return
      }

      if (stdout) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
