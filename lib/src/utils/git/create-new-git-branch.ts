import { setFailed } from '@actions/core'
import { context } from '@actions/github'
import { Octokit } from 'lib/types/models/github/octokit.js'

export type CreateNewGitBranchParams = {
  owner: string
  repo: string
  branchName: string
  baseBranch?: string
}

/**
 * Factory function that returns an async function to create a new Git branch in a GitHub repository using Octokit.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns An async function that creates a new branch from a specified base branch.
 *
 * @function
 * @async
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param branchName - The name of the new branch to create.
 * @param baseBranch - (Optional) The name of the base branch to branch from. Defaults to the current context ref or 'main'.
 * @returns The newly created branch data if successful; otherwise, handles errors and sets the failure state.
 *
 * @throws Will call `setFailed` if the branch creation fails.
 */
export function createNewGitBranch(octokit: Octokit) {
  return async function createNewGitBranch({
    baseBranch = context.ref.split('/').pop() || 'main',
    branchName,
    owner,
    repo,
  }: CreateNewGitBranchParams) {
    try {
      // Get the latest commit from the base branch
      const { data: refData } = await octokit.rest.git.getRef({
        owner,
        repo,
        ref: `heads/${baseBranch}`,
      })

      // Create a new branch from the latest commit
      const { data: newBranch } = await octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: refData.object.sha,
      })

      return newBranch
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to create new git branch: ${error.message}`)
      } else {
        setFailed('Failed to create new git branch: Unknown error')
      }
    }
  }
}
