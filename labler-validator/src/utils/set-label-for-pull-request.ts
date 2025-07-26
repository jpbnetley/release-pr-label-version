import { setFailed, info } from '@actions/core'
import { getOctokit, context } from '@actions/github'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.js'

export async function setLabelForPullRequest(token: string) {
  try {
    if (!token) {
      setFailed('GITHUB_TOKEN is not set')
      return
    }
    const octokit = getOctokit(token)
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
    ]

    const hasVersionLabel = versionLabels.some((label) =>
      labelNames.includes(label)
    )

    if (!hasVersionLabel) {
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: prNumber,
        labels: ['release:version-required'],
      })
      info(`Added 'release:version-required' label to PR #${prNumber}`)
      setFailed(`PR #${prNumber} is missing a version label`)
    } else {
      info(`Version label already present in PR #${prNumber}`)
      if (hasVersionLabel && labelNames.includes(ReleaseLabelName.VersionRequired)) {
        info(`Removing ${ReleaseLabelName.VersionRequired} label for PR #${prNumber}`)
        await octokit.rest.issues.removeLabel({
          owner,
          repo,
          issue_number: prNumber,
          name: ReleaseLabelName.VersionRequired
        })
        info(`Removed ${ReleaseLabelName.VersionRequired} label from PR #${prNumber}`)
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
