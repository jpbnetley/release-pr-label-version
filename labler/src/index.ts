// create labels if they don't exist
import { getOctokit, context } from '@actions/github'
import { setFailed } from '@actions/core'
import { createLabelIfNotExists } from './utils/create-label-if-not-exists.js'
import { ReleaseLabel } from 'lib/types/models/release-label.js'

const token = process.env.GITHUB_TOKEN
if (!token) {
  setFailed('GITHUB_TOKEN is not set')
  process.exit(1)
}
const octokit = getOctokit(token)


async function run() {
  const owner = context.repo.owner
  const repo = context.repo.repo

  const labelCreation = Object.keys(ReleaseLabel).map(async (key) => {
    const label = ReleaseLabel[key as keyof typeof ReleaseLabel]
    return createLabelIfNotExists(octokit)(owner, repo, {
      name: label.name,
      color: label.color,
    })
  })

  await Promise.all(labelCreation)
}

run()

function test(){
  console.warn('This is a test function');
}
test();