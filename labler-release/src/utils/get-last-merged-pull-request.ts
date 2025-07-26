import { Octokit } from 'lib/types/models/github/octokit.js'

/**
 * Returns a function that retrieves the number of the most recently merged pull request
 * for a given GitHub repository using the provided Octokit instance.
 *
 * @param octokit - An authenticated Octokit instance for making GitHub API requests.
 * @returns An async function that takes the repository owner and name, and returns
 *          the number of the last merged pull request, or `null` if none are found.
 *
 * @throws {Error} Throws an error if the API request fails or if there is an issue retrieving the pull request number.
 */
export function getLastMergedPullRequest(octokit: Octokit) {
  return async function lastMergedPullRequestNumber(
    owner: string,
    repo: string,
    branchName: string
  ) {
    try {
      const { data: pullRequests } = await octokit.rest.pulls.list({
        owner,
        repo,
        state: 'closed',
        sort: 'updated',
        direction: 'desc',
      })

      const mergedPullRequest = pullRequests.find(
        (pr) => pr.base.ref === `refs/heads/${branchName}` && pr.merged_at
      )

      return mergedPullRequest
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      throw new Error(
        `Failed to get last merged pull request number: ${errorMessage}`
      )
    }
  }
}
