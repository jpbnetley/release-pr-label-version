import { getInput, setFailed, debug, info, summary } from '@actions/core'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.js'
import { executeBuildScript } from './utils/execute-build-script.js'
import { getMergedPullRequestLabels } from './utils/get-merged-pull-request-labels.js'
import { context, getOctokit } from '@actions/github'
import { getLastMergedPullRequest } from './utils/get-last-merged-pull-request.js'
import { RELEASE_BRANCH_NAME } from './constants/release-branch-name.js'
import { getCurrentReleaseVersion } from './utils/version/get-current-release-version.js'
import { createPullRequest } from 'lib/utils/git/create-pull-request.js'
import { createGitHubRelease } from 'lib/utils/github/create-github-release.js'
import { createNewGitBranch } from 'lib/utils/git/create-new-git-branch.js'
import { checkoutBranch } from 'lib/utils/git/checkout-branch-git.js'
import { addFilesToGit } from 'lib/utils/git/add-files-to-git.js'
import { commitFilesToGit } from 'lib/utils/git/commit-files-to-git.js'
import { hasGitChanges } from 'lib/utils/git/has-changes-git.js'
import { deleteGitBranch } from 'lib/utils/git/delete-branch-git.js'
import { addLabelToPullRequest } from 'lib/utils/github/add-label-to-pullrequest.js'

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
  const currentVersionScript = getInput('get-current-version-script')

  debug('patchScript: ' + patchReleaseScript)
  debug('minorScript: ' + minorReleaseScript)
  debug('majorScript: ' + majorReleaseScript)
  debug('releaseBranchName: ' + releaseBranchName)
  debug('currentVersionScript: ' + currentVersionScript)

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

  if (labels.includes(ReleaseLabelName.VersionBump)) {
    const currentVersion = await getCurrentReleaseVersion(currentVersionScript)
    debug(`Current version: ${currentVersion}`)
    if (!currentVersion) {
      setFailed('Current version could not be determined')
      return
    }

    await createGitHubRelease(octokit)({
      owner,
      repo,
      tagName: `${currentVersion}`,
      releaseName: `Release for version: ${currentVersion}`,
      body: `Release ${currentVersion}`,
      isPreRelease: pullRequest.base.ref !== releaseBranchName,
    })
    info('Release created successfully.')

    debug('Creating summary')
    await summary
      .addHeading('Release version')
      .addRaw(`Created for: ${currentVersion}`)
      .write()

      debug('Created summary')

    return
  }

  if (labels.includes(ReleaseLabelName.VersionSkip)) {
    info('Version skip was added, skipping action.')
    return
  }

  if (labels.includes(ReleaseLabelName.VersionRequired)) {
    setFailed('Version required is invalid label for a release.')
    return
  }

  const RELEASE_VERSION_BRANCH_NAME = `${RELEASE_BRANCH_NAME}-${pullRequest.number}`
  debug(`Release version branch name: ${RELEASE_VERSION_BRANCH_NAME}`)
  await createNewGitBranch(octokit)({
    owner,
    repo,
    branchName: RELEASE_VERSION_BRANCH_NAME,
    baseBranch: pullRequest.base.ref,
  })

  debug(`Created new branch: ${RELEASE_VERSION_BRANCH_NAME}`)
  debug(`Checking out to branch: ${RELEASE_VERSION_BRANCH_NAME}`)
  await checkoutBranch(RELEASE_VERSION_BRANCH_NAME)
  debug(`Checked out to branch: ${RELEASE_VERSION_BRANCH_NAME}`)

  if (labels.includes(ReleaseLabelName.VersionPatch) && patchReleaseScript) {
    const response = await executeBuildScript(patchReleaseScript)
    info(`Patch release script executed with response: ${response}`)
  } else if (
    labels.includes(ReleaseLabelName.VersionMinor) &&
    minorReleaseScript
  ) {
    const response = await executeBuildScript(minorReleaseScript)
    info(`Minor release script executed with response: ${response}`)
  } else if (
    labels.includes(ReleaseLabelName.VersionMajor) &&
    majorReleaseScript
  ) {
    const response = await executeBuildScript(majorReleaseScript)
    info(`Major release script executed with response: ${response}`)
  }

  const hasChanges = await hasGitChanges()
  debug(`Has changes after script execution: ${hasChanges}`)
  if (!hasChanges) {
    info('No changes to commit, skipping commit step.')
    await deleteGitBranch(RELEASE_VERSION_BRANCH_NAME)
    info(`Deleted branch: ${RELEASE_VERSION_BRANCH_NAME}`)
    info('No changes to commit, exiting action.')
    return
  }

  debug('Adding files to git staging area.')
  await addFilesToGit()
  debug('Files added to git staging area.')
  debug('Committing files to git.')
  await commitFilesToGit({
    commitMessage: 'Update version files',
    authorName: 'GitHub Action',
    authorEmail: 'action@github.com',
  })
  debug('Files committed to git.')

  debug(`Creating pull request for branch: ${RELEASE_VERSION_BRANCH_NAME}`)
  await createPullRequest(octokit)({
    owner,
    repo,
    title: `Release PR for #${pullRequest.number}`,
    head: RELEASE_VERSION_BRANCH_NAME,
    base: pullRequest.base.ref,
    body: `This PR was automatically created by the labler-release action for pull request #${
      pullRequest.number
    }.\n\nLabels: ${labels.join(', ')}`,
  })
  debug(`Pull request created for branch: ${RELEASE_VERSION_BRANCH_NAME}`)

  await addLabelToPullRequest(octokit)({
    owner,
    repo,
    pullNumber: pullRequest.number,
    labels: [ReleaseLabelName.VersionBump],
  })
  info(
    `Added label '${ReleaseLabelName.VersionBump}' to pull request #${pullRequest.number}`
  )

  info('Release process completed successfully.')
}

run().catch((error) =>
  setFailed(`Action failed with error: ${error?.message ?? error}`)
)
