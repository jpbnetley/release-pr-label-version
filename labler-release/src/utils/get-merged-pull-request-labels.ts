import { setFailed } from "@actions/core"
import { Octokit } from "lib/types/models/github/octokit.js"

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
