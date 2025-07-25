import { getOctokit } from '@actions/github'

export function getLastMergedPullRequestNumber(
  token: string
) {
  const octokit = getOctokit(token)
  return async function lastMergedPullRequestNumber(owner: string, repo: string) {
    try {
      const { data: pullRequests } = await octokit.rest.pulls.list({
        owner,
        repo,
        state: 'closed',
        sort: 'updated',
        direction: 'desc',
      })

      const mergedPullRequest = pullRequests.find((pr) => pr.merged_at)

      return mergedPullRequest ? mergedPullRequest.number : null
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      throw new Error(
        `Failed to get last merged pull request number: ${errorMessage}`
      )
    }
  }
}
