import { setFailed, info, error as logError } from '@actions/core'
import { Octokit } from 'lib/types/models/github/octokit.js'

/**
 * Returns a function that ensures a GitHub label exists in the specified repository.
 * If the label does not exist, it will be created using the provided Octokit instance.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns An async function that takes the repository owner, repository name, and label details (name and color),
 *          and creates the label if it does not already exist.
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

      if (!labels.some((labelCheck) => labelCheck.name === label.name)) {
        // Create the label if it does not exist
        await octokit.rest.issues.createLabel({
          owner,
          repo,
          name: label.name,
          color: label.color,
        })
        info(`Label created: ${label.name}`)
      } else {
        info(`Label already exists: ${label.name}`)
      }
    } catch (error) {
      logError(`Failed to create label: ${error}`)
      if (error instanceof Error) {
        setFailed(`Failed to create label: ${error.message}`)
      } else {
        setFailed('Failed to create label: Unknown error')
      }
    }
  }
}
