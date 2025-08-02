import { exec } from 'node:child_process'

export function deleteGitBranch(branchName: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(`git branch -d ${branchName}`, (error) => {
      if (error) {
        return reject(`Error deleting branch: ${error.message}`)
      }
      resolve()
    })
  })
}
