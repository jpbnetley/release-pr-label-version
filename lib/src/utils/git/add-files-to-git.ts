import { info, error } from '@actions/core'
import { execSync } from 'node:child_process'
/**
 * Adds the specified files to the current Git staging area using the `git add` command.
 *
 * @param files - An array of file paths to add to Git.
 * @remarks
 * - If the `files` array is empty, the function logs a message and returns without performing any action.
 * - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
 */
export function addFilesToGit(files: string[] = ['.']): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!files || files.length === 0) {
      info('No files to add to git.')
      resolve()
      return
    }

    try {
      execSync(`git add ${files.join(' ')}`, { stdio: 'inherit' })
      info(`Added files to git: ${files.join(', ')}`)
      resolve()
    } catch (err) {
      error(err instanceof Error ? err : `Error adding files to git: ${err}`)
      reject(err)
    }
  })
}
