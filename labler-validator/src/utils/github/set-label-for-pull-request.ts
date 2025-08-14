import { setFailed, info } from '@actions/core'
import { context } from '@actions/github'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.js'
import { Octokit } from 'lib/types/models/github/octokit.js'

/**
 * Sets or updates version-related labels on a pull request.
 *
 * This function checks if a pull request has any of the required version labels
 * (`VersionPatch`, `VersionMinor`, `VersionMajor`, or `VersionSkip`). If none are present,
 * it adds the `release:version-required` label and marks the action as failed.
 * If a version label is present and the `release:version-required` label is also present,
 * it removes the `release:version-required` label.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 *
 * @remarks
 * - Relies on the `context` object for repository and pull request information.
 * - Uses `setFailed` and `info` for logging and error reporting.
 * - Expects `ReleaseLabelName` enum or constants to be available in scope.
 *
 * @throws Will call `setFailed` if the pull request number is missing or if an error occurs during label operations.
 */
export function setLabelForPullRequest(octokit: Octokit) {
  return async function setLabel(isPreRelease: boolean) {
    try {
      const prNumber = context.payload.pull_request?.number
      const owner = context.repo.owner
      const repo = context.repo.repo

      if (!prNumber) {
        setFailed('No pull request number found in context')
        return
      }

      // Get labels on the PR
      const { data: labels } = await octokit.rest.issues.listLabelsOnIssue({
        owner,
        repo,
        issue_number: prNumber,
      })

      const labelNames = labels.map((label) => label.name)
      const versionLabels = [
        ReleaseLabelName.VersionPatch,
        ReleaseLabelName.VersionMinor,
        ReleaseLabelName.VersionMajor,
        ReleaseLabelName.VersionSkip,
        ReleaseLabelName.VersionPreRelease,
        ReleaseLabelName.VersionBump,
      ]

      const hasVersionLabel = versionLabels.some((label) =>
        labelNames.includes(label)
      )

      if (!hasVersionLabel) {
        const label = isPreRelease
          ? ReleaseLabelName.VersionPreRelease
          : ReleaseLabelName.VersionRequired

        await octokit.rest.issues.addLabels({
          owner,
          repo,
          issue_number: prNumber,
          labels: [label],
        })
        info(`Added '${label}' label to PR #${prNumber}`)
        if (!isPreRelease) {
          setFailed(`PR #${prNumber} is missing a version label`)
        }
      } else {
        info(`Version label already present in PR #${prNumber}`)
        if (
          hasVersionLabel &&
          labelNames.includes(ReleaseLabelName.VersionRequired)
        ) {
          info(
            `Removing ${ReleaseLabelName.VersionRequired} label for PR #${prNumber}`
          )
          await octokit.rest.issues.removeLabel({
            owner,
            repo,
            issue_number: prNumber,
            name: ReleaseLabelName.VersionRequired,
          })
          info(
            `Removed ${ReleaseLabelName.VersionRequired} label from PR #${prNumber}`
          )
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to set label for pull request: ${error.message}`)
      } else {
        setFailed('Failed to set label for pull request: Unknown error')
      }
    }
  }
}
