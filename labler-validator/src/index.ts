import { setFailed } from '@actions/core'
import { setLabelForPullRequest } from './utils/set-label-for-pull-request.js'
import { getOctokit } from '@actions/github'

function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    setFailed('GITHUB_TOKEN is not set')
    process.exit(1)
  }
  const octokit = getOctokit(GITHUB_TOKEN)
  setLabelForPullRequest(octokit)
}

run()
