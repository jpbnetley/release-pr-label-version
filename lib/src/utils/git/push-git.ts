import { setFailed } from '@actions/core'
import { Octokit } from '../../types/models/github/octokit.js'

export type GitPushParams = {
  owner: string
  repo: string
  branchName: string
  commitMessage?: string
}

/**
 * Returns an async function to push changes to a specified branch in a GitHub repository using Octokit.
 *
 * @param octokit - An authenticated Octokit instance for GitHub API requests.
 * @returns An async function that pushes changes to a branch.
 *
 * The returned function parameters:
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param branchName - The name of the branch to push changes to.
 * @param commitMessage - (Optional) The commit SHA to update the branch reference to. Defaults to 'Update branch'.
 * @returns The response data from the GitHub API after updating the reference, or undefined if an error occurs.
 *
 * @remarks
 * The `commitMessage` parameter is used as the SHA for the updateRef call, which should be the commit SHA you want the branch to point to.
 * If an error occurs during the push, the function will call `setFailed` with an appropriate error message.
 */
export function gitPush(octokit: Octokit) {
  return async function pushGit({
    owner,
    repo,
    branchName,
    commitMessage = 'Update branch',
  }: GitPushParams) {
    try {
      // Push the changes to the specified branch
      const { data: pushData } = await octokit.rest.git.updateRef({
        owner,
        repo,
        ref: `heads/${branchName}`,
        sha: commitMessage, // This should be the SHA of the commit you want to push
        force: true, // Use force if necessary
      })

      return pushData
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to push git changes: ${error.message}`)
      } else {
        setFailed('Failed to push git changes: Unknown error')
      }
    }
  }
}
