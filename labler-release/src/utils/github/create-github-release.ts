import { error, info } from '@actions/core'
import { Octokit } from 'lib/types/models/github/octokit.js'

export type CreateGitHubReleaseParam = {
  owner: string
  repo: string
  tagName: string
  releaseName: string
  body: string
  isDraft?: boolean
  isPreRelease?: boolean
}

/**
 * Creates a function to publish a new GitHub release using the provided Octokit instance.
 *
 * @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
 * @returns A function that creates a GitHub release when called.
 *
 * @remarks
 * The returned function requires the following parameters:
 * - `tagName`: The tag name for the release (e.g., "v1.0.0").
 * - `releaseName`: The name/title of the release.
 * - `body`: The release notes or description.
 * - `isDraft`: Optional. Whether the release is a draft. Defaults to `false`.
 * - `isPreRelease`: Optional. Whether the release is a pre-release. Defaults to `false`.
 *
 * The function reads the repository owner and name from the environment variables
 * `GITHUB_REPOSITORY_OWNER` and `GITHUB_REPOSITORY_NAME`.
 *
 * @throws Will reject the promise if the GitHub release creation fails.
 */
export function createGitHubRelease(octokit: Octokit) {
  return function release({
    body,
    isDraft = false,
    isPreRelease = false,
    owner,
    releaseName,
    repo,
    tagName,
  }: CreateGitHubReleaseParam): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await octokit.rest.repos.createRelease({
          owner,
          repo,
          tag_name: tagName,
          name: releaseName,
          body,
          draft: isDraft,
          prerelease: isPreRelease
        })

        info(`Created GitHub release: ${releaseName} (${tagName})`)
        resolve()
      } catch (err) {
        error(
          err instanceof Error ? err : `Error creating GitHub release: ${err}`
        )
        reject(err)
      }
    })
  }
}
