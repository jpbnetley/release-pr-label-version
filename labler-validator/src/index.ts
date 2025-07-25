import { setLabelForPullRequest } from './utils/set-label-for-pull-request.js'

function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? ''
  setLabelForPullRequest(GITHUB_TOKEN)
}

run()
