import { setFailed } from '@actions/core'
import { Octokit } from 'lib/types/models/github/octokit.js'

export type CreatePullRequestParams = {
  owner: string
  repo: string
  title: string
  head: string
  base: string
  body?: string
}
/**
 * Creates a function to open a new pull request on a GitHub repository using the provided Octokit instance.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns An async function that creates a pull request with the specified parameters.
 *
 * @example
 * const createPR = createPullRequest(octokit);
 * await createPR('owner', 'repo', 'My PR Title', 'feature-branch', 'main', 'PR description');
 *
 * @throws Will call `setFailed` if the pull request creation fails.
 */
export function createPullRequest(octokit: Octokit) {
  return async function createPullRequest({
    owner,
    repo,
    title,
    head,
    base = 'main',
    body,
  }: CreatePullRequestParams) {
    try {
      const { data: pullRequest } = await octokit.rest.pulls.create({
        owner,
        repo,
        title,
        head,
        base,
        body,
        labels: ['release-pr-label-version'],
      })

      return pullRequest
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to create pull request: ${error.message}`)
      } else {
        setFailed('Failed to create pull request: Unknown error')
      }
    }
  }
}
