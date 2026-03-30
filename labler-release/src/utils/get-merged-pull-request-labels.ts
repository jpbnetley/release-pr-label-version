import { setFailed } from "@actions/core"
import { Octokit } from "lib/types/models/github/octokit.mjs"

/**
 * Returns a function that retrieves the labels of a merged pull request using the provided Octokit instance.
 *
 * @param octokit - An authenticated Octokit instance for GitHub API requests.
 * @returns An async function that takes the repository owner, repository name, and pull request number,
 *          and returns an array of label names associated with the specified pull request.
 *
 * @throws Will call `setFailed` with an error message if the pull request labels cannot be retrieved.
 */
export function getMergedPullRequestLabels(octokit: Octokit) {
  return async function getMergedPullRequestLabels(
    owner: string,
    repo: string,
    pullNumber: number
  ) {
    try {
      const { data: pullRequest } = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: pullNumber,
      })

      return pullRequest.labels.map((label) => label.name)
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to get merged pull request labels: ${error.message}`)
      } else {
        setFailed('Failed to get merged pull request labels: Unknown error')
      }
    }
  }
}
