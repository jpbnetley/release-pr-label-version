import { exec } from 'node:child_process'

/**
 * Retrieves the current Git branch name by executing the appropriate Git command.
 *
 * @returns A promise that resolves to the name of the current Git branch as a string.
 * @throws Will reject the promise with an error message if the Git command fails.
 */
export function gitBranchName(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      'git rev-parse --abbrev-ref HEAD',
      { encoding: 'utf-8' },
      (error, stdout) => {
        if (error) {
          reject(`Error getting git branch name: ${error.message}`)
          return
        }
        resolve(stdout.trim())
      }
    )
  })
}
