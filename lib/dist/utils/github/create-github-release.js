import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";

//#region src/utils/github/create-github-release.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
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
function createGitHubRelease(octokit) {
	return function release({ body, isDraft = false, isPreRelease = false, owner, releaseName, repo, tagName, generate_release_notes = true }) {
		return new Promise(async (resolve, reject) => {
			try {
				await octokit.rest.repos.createRelease({
					owner,
					repo,
					tag_name: tagName,
					name: releaseName,
					body,
					draft: isDraft,
					prerelease: isPreRelease,
					generate_release_notes
				});
				(0, import_core.info)(`Created GitHub release: ${releaseName} (${tagName})`);
				resolve();
			} catch (err) {
				(0, import_core.error)(err instanceof Error ? err : `Error creating GitHub release: ${err}`);
				reject(err);
			}
		});
	};
}

//#endregion
export { createGitHubRelease };