import { exec } from 'node:child_process'

/**
 * Executes a given shell script asynchronously and returns a promise that resolves when the script completes.
 *
 * @param script - The shell command to execute.
 * @returns A promise that resolves when the script finishes successfully, or rejects with an error message if the script fails.
 *
 * @throws Will reject the promise with an error message if the script execution fails.
 */
export function executeBuildScript(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(script, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing script: ${error.message}\n${stderr}`)
      } else {
        resolve(stdout)
      }
    })
  })
}