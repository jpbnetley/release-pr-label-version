import { setFailed } from '@actions/core'
import { Octokit } from 'lib/types/models/github/octokit.js'
import {
  ReleaseLabel,
  ReleaseLabelKey,
} from 'lib/types/models/release-label.js'

/**
 * Returns a function that sets a release label on a pull request using the provided Octokit instance.
 *
 * The returned function adds a label corresponding to the specified `versionType` to the given pull request.
 * If the operation fails, it reports the failure using `setFailed`.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns An async function that sets a release label on a pull request.
 *
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param pullNumber - The number of the pull request to label.
 * @param versionType - The release label key indicating the type of version (e.g., major, minor, patch).
 */
export function setLabelVersionOnPullRequest(octokit: Octokit) {
  return async function setLabelVersionOnPullRequest(
    owner: string,
    repo: string,
    pullNumber: number,
    versionType: ReleaseLabelKey
  ) {
    try {
      const label = ReleaseLabel[versionType]

      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: pullNumber,
        labels: [label.name],
      })

      console.log(`Label ${label.name} added to pull request #${pullNumber}`)
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to set label on pull request: ${error.message}`)
      } else {
        setFailed('Failed to set label on pull request: Unknown error')
      }
    }
  }
}
