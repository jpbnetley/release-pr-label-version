import { exec } from 'node:child_process'

/**
 * Retrieves the current Git working directory status using the `git status --porcelain` command.
 *
 * @returns A promise that resolves with the trimmed output of the Git status command,
 *          or rejects with an error message if the command fails.
 */
export function getGitStatus(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('git status --porcelain', (error, stdout, stderr) => {
      if (error) {
        reject(`Error getting git status: ${stderr}`)
      } else {
        resolve(stdout.trim())
      }
    })
  })
}
