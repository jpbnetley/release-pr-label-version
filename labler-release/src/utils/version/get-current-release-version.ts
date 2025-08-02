import { exec } from 'node:child_process'

/**
 * Executes the provided shell script to retrieve the current release version.
 *
 * @param script - The shell command to execute for obtaining the release version.
 * @returns A promise that resolves with the release version as a string, or rejects with an error message if the command fails or no version is found.
 */
export function getCurrentReleaseVersion(script: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(script, (error, stdout) => {
      if (error) {
        return reject(`Error getting current release version: ${error.message}`)
      }
      const version = stdout.trim()
      if (!version) {
        return reject('No release version found')
      }
      resolve(version)
    })
  })
}
