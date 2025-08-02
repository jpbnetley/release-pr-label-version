import { __toESM, require_core } from "../../core-Bd4l5kNc.js";

//#region src/utils/git/create-pull-request.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
/**
* Creates a function to open a new pull request on a GitHub repository using the provided Octokit instance.
*
* @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
* @returns An async function that creates a pull request with the specified parameters.
*
* @example
* const createPR = createPullRequest(octokit);
* await createPR('owner', 'repo', 'My PR Title', 'feature-branch', 'main', 'PR description');
*
* @throws Will call `setFailed` if the pull request creation fails.
*/
function createPullRequest(octokit) {
	return async function createPullRequest$1({ owner, repo, title, head, base = "main", body }) {
		try {
			const { data: pullRequest } = await octokit.rest.pulls.create({
				owner,
				repo,
				title,
				head,
				base,
				body,
				labels: ["release-pr-label-version"]
			});
			return pullRequest;
		} catch (error) {
			if (error instanceof Error) (0, import_core.setFailed)(`Failed to create pull request: ${error.message}`);
			else (0, import_core.setFailed)("Failed to create pull request: Unknown error");
		}
	};
}

//#endregion
export { createPullRequest };