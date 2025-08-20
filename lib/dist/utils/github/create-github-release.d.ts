import { Octokit } from "../../octokit-BfGHke4j.js";

//#region src/utils/github/create-github-release.d.ts
type CreateGitHubReleaseParam = {
  owner: string;
  repo: string;
  tagName: string;
  releaseName: string;
  body: string;
  isDraft?: boolean;
  isPreRelease?: boolean;
  generate_release_notes?: boolean;
};
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
declare function createGitHubRelease(octokit: Octokit): ({
  body,
  isDraft,
  isPreRelease,
  owner,
  releaseName,
  repo,
  tagName,
  generate_release_notes
}: CreateGitHubReleaseParam) => Promise<void>;
//#endregion
export { CreateGitHubReleaseParam, createGitHubRelease };