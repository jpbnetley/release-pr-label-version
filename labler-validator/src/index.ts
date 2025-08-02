import { getInput, setFailed } from '@actions/core'
import { getOctokit, context } from '@actions/github'
import { setLabelForPullRequest } from './utils/github/set-label-for-pull-request.js'
import { createReleaseLabels } from './utils/create-release-labels.js'

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    setFailed('GITHUB_TOKEN is not set')
    process.exit(1)
  }

  const octokit = getOctokit(GITHUB_TOKEN)
  const owner = context.repo.owner
  const repo = context.repo.repo

  await createReleaseLabels(octokit)({
    owner,
    repo,
  })

  const isPreRelease = getInput('isPreRelease') === 'true'

  await setLabelForPullRequest(octokit)(isPreRelease)
}

run()
