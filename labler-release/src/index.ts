import { getInput, setFailed, debug, info } from '@actions/core'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.mjs'
import { executeBuildScript } from './utils/execute-build-script.js'
import { getMergedPullRequestLabels } from './utils/get-merged-pull-request-labels.js'
import { context, getOctokit } from '@actions/github'
import { getLastMergedPullRequest } from './utils/get-last-merged-pull-request.js'

async function run() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    setFailed('GITHUB_TOKEN is not set')
    return
  }

  const patchReleaseScript = getInput('patch-release-script')
  const minorReleaseScript = getInput('minor-release-script')
  const majorReleaseScript = getInput('major-release-script')
  const releaseBranchName = getInput('release-branch-name') || 'main'

  debug('patchScript: ' + patchReleaseScript)
  debug('minorScript: ' + minorReleaseScript)
  debug('majorScript: ' + majorReleaseScript)
  debug('releaseBranchName: ' + releaseBranchName)

  const octokit = getOctokit(token)
  const owner = context.repo.owner
  const repo = context.repo.repo
  const pullRequest = await getLastMergedPullRequest(octokit)(
    owner,
    repo,
    releaseBranchName
  )
  if (!pullRequest) {
    setFailed('No merged pull request found')
    return
  }

  const labels = await getMergedPullRequestLabels(octokit)(
    owner,
    repo,
    pullRequest.number
  )

  debug(`Labels on PR (#${pullRequest.number}): ` + labels?.join(', '))

  if (!labels || labels.length === 0) {
    info('No relevant labels found')
    return
  }

  if (labels.includes(ReleaseLabelName.VersionSkip)) {
    info('Version skip was added, skipping action.')
    return
  }

  if (labels.includes(ReleaseLabelName.VersionRequired)) {
    setFailed('Version required is invalid label for a release.')
  } else if (labels.includes(ReleaseLabelName.VersionPatch)) {
    const response = await executeBuildScript(patchReleaseScript)
    info(`Patch release script executed with response: ${response}`)
  } else if (labels.includes(ReleaseLabelName.VersionMinor)) {
    const response = await executeBuildScript(minorReleaseScript)
    info(`Minor release script executed with response: ${response}`)
  } else if (labels.includes(ReleaseLabelName.VersionMajor)) {
    const response = await executeBuildScript(majorReleaseScript)
    info(`Major release script executed with response: ${response}`)
  }

  info('Release process completed successfully.')
}

run().catch((error) =>
  setFailed(`Action failed with error: ${error?.message ?? error}`)
)
