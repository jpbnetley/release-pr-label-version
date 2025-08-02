import { ReleaseLabel } from 'lib/types/models/release-label.js'
import { createLabelIfNotExists } from './github/create-label-if-not-exists.js'
import { Octokit } from 'lib/types/models/github/octokit.js'

export type CreateReleaseLabelsParams = {
  owner: string
  repo: string
}

/**
 * Factory function that creates a function to ensure all release labels exist in a GitHub repository.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns An async function that, when called with repository owner and name, creates all required release labels if they do not already exist.
 *
 * @example
 * const createLabels = createReleaseLabels(octokit);
 * await createLabels({ owner: 'my-org', repo: 'my-repo' });
 */
export function createReleaseLabels(octokit: Octokit) {
  return async function createLabels({
    owner,
    repo,
  }: CreateReleaseLabelsParams) {
    const labelCreation = Object.keys(ReleaseLabel).map(async (key) => {
      const label = ReleaseLabel[key as keyof typeof ReleaseLabel]
      return createLabelIfNotExists(octokit)(owner, repo, {
        name: label.name,
        color: label.color,
      })
    })

    await Promise.all(labelCreation)
  }
}
