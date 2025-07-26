import { getInput, setFailed, error as logError } from '@actions/core'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.js'
import { executeBuildScript } from './utils/execute-build-script.js'
import { getMergedPullRequestLabels } from './utils/get-merged-pull-request-labels.js'
import { context, getOctokit } from '@actions/github'
import { getLastMergedPullRequestNumber } from './utils/get-last-merged-pull-request-number.js'

async function run() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    setFailed('GITHUB_TOKEN is not set')
    process.exit(1)
  }
  const patchReleaseScript = getInput('patch-release-script')
  const minorReleaseScript = getInput('minor-release-script')
  const majorReleaseScript = getInput('major-release-script')

  const octokit = getOctokit(token)
  const owner = context.repo.owner
  const repo = context.repo.repo
  const pullRequestNumber = await getLastMergedPullRequestNumber(token)(
    owner,
    repo
  )
  if (!pullRequestNumber) {
    logError('No merged pull request found')
    setFailed('No merged pull request found')
    return
  }

  const labels = await getMergedPullRequestLabels(octokit)(
    owner,
    repo,
    pullRequestNumber
  )

  if (!labels || labels.length === 0 || labels.includes(ReleaseLabelName.VersionSkip)) {
    return
  }

  if (labels.includes(ReleaseLabelName.VersionRequired)) {
    setFailed('Version required is invalid label for a release.')
  } else if (labels.includes(ReleaseLabelName.VersionPatch)) {
    await executeBuildScript(patchReleaseScript)
  } else if (labels.includes(ReleaseLabelName.VersionMinor)) {
    await executeBuildScript(minorReleaseScript)
  } else if (labels.includes(ReleaseLabelName.VersionMajor)) {
    await executeBuildScript(majorReleaseScript)
  }
}

run()
