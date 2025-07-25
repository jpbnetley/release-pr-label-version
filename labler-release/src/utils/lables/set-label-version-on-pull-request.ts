import { setFailed } from '@actions/core'
import { Octokit } from 'lib/types/models/github/octokit.js'
import {
  ReleaseLabel,
  ReleaseLabelKey,
} from 'lib/types/models/release-label.js'

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
