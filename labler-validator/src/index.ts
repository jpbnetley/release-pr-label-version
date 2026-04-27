import { setFailed, getInput } from '@actions/core';
import { getOctokit } from '@actions/github';
import { setLabelForPullRequest } from './utils/github/set-label-for-pull-request.js';

async function run() {
  const isPreRelease = getInput('isPreRelease') === 'true';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    setFailed('GITHUB_TOKEN is not set');
    process.exit(1);
  }
  const octokit = getOctokit(GITHUB_TOKEN);
  await setLabelForPullRequest(octokit)({ isPreRelease });
}

run();
