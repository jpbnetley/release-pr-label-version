import { setFailed } from '@actions/core'
import { Octokit } from 'lib/types/models/github/octokit.js'

/**
 * Returns a function that ensures a GitHub label exists in the specified repository.
 * If the label does not exist, it will be created using the provided name and color.
 * If the label already exists, no action is taken.
 *
 * @param octokit - An authenticated Octokit instance for GitHub API requests.
 * @returns An async function that takes the repository owner, repository name,
 *          and label details ({ name, color }) and creates the label if it does not exist.
 *
 * @example
 * const ensureLabel = createLabelIfNotExists(octokit);
 * await ensureLabel('owner', 'repo', { name: 'bug', color: 'f29513' });
 */
export function createLabelIfNotExists(octokit: Octokit) {
  return async function createLabelIfNotExists(
    owner: string,
    repo: string,
    label: { name: string; color: string }
  ) {
    try {
      // Check if the label already exists
      const { data: labels } = await octokit.rest.issues.listLabelsForRepo({
        owner,
        repo,
      })

      if (!labels.some((l) => l.name === label.name)) {
        // Create the label if it does not exist
        await octokit.rest.issues.createLabel({
          owner,
          repo,
          name: label.name,
          color: label.color,
        })
        console.log(`Label created: ${label.name}`)
      } else {
        console.log(`Label already exists: ${label.name}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        setFailed(`Failed to create label: ${error.message}`)
      } else {
        setFailed('Failed to create label: Unknown error')
      }
    }
  }
}
