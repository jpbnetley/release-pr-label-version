import { exec } from 'node:child_process'

export function hasGitChanges(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec('git diff --exit-code', (error) => {
      if (error) {
        // If there are changes, the exit code will be non-zero
        resolve(false)
      } else {
        // If there are no changes, the exit code will be zero
        resolve(true)
      }
    })
  })
}
