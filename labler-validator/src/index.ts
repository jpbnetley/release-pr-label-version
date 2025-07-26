import { setFailed } from '@actions/core'
import { setLabelForPullRequest } from './utils/set-label-for-pull-request.js'

function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    setFailed('GITHUB_TOKEN is not set')
    process.exit(1)
  }
  setLabelForPullRequest(GITHUB_TOKEN)
}

run()
