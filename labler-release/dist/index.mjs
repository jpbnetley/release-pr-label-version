import { debug, getInput, info, setFailed } from "@actions/core";
import { exec } from "node:child_process";
import { context, getOctokit } from "@actions/github";

//#region ../lib/dist/types/enums/release-label-name.mjs
let ReleaseLabelName = /* @__PURE__ */ function(ReleaseLabelName) {
	ReleaseLabelName["VersionRequired"] = "release:version-required";
	ReleaseLabelName["VersionPatch"] = "release:version-patch";
	ReleaseLabelName["VersionMinor"] = "release:version-minor";
	ReleaseLabelName["VersionMajor"] = "release:version-major";
	ReleaseLabelName["VersionSkip"] = "release:version-skip";
	return ReleaseLabelName;
}({});

//#endregion
//#region src/utils/execute-build-script.ts
/**
* Executes a given shell script asynchronously and returns a promise that resolves when the script completes.
*
* @param script - The shell command to execute.
* @returns A promise that resolves when the script finishes successfully, or rejects with an error message if the script fails.
*
* @throws Will reject the promise with an error message if the script execution fails.
*/
function executeBuildScript(script) {
	return new Promise((resolve, reject) => {
		exec(script, (error, stdout, stderr) => {
			if (error) reject(`Error executing script: ${error.message}\n${stderr}`);
			else resolve(stdout);
		});
	});
}

//#endregion
//#region src/utils/get-merged-pull-request-labels.ts
/**
* Returns a function that retrieves the labels of a merged pull request using the provided Octokit instance.
*
* @param octokit - An authenticated Octokit instance for GitHub API requests.
* @returns An async function that takes the repository owner, repository name, and pull request number,
*          and returns an array of label names associated with the specified pull request.
*
* @throws Will call `setFailed` with an error message if the pull request labels cannot be retrieved.
*/
function getMergedPullRequestLabels(octokit) {
	return async function getMergedPullRequestLabels(owner, repo, pullNumber) {
		try {
			const { data: pullRequest } = await octokit.rest.pulls.get({
				owner,
				repo,
				pull_number: pullNumber
			});
			return pullRequest.labels.map((label) => label.name);
		} catch (error) {
			if (error instanceof Error) setFailed(`Failed to get merged pull request labels: ${error.message}`);
			else setFailed("Failed to get merged pull request labels: Unknown error");
		}
	};
}

//#endregion
//#region src/utils/get-last-merged-pull-request.ts
/**
* Returns a function that retrieves the number of the most recently merged pull request
* for a given GitHub repository using the provided Octokit instance.
*
* @param octokit - An authenticated Octokit instance for making GitHub API requests.
* @returns An async function that takes the repository owner and name, and returns
*          the number of the last merged pull request, or `null` if none are found.
*
* @throws {Error} Throws an error if the API request fails or if there is an issue retrieving the pull request number.
*/
function getLastMergedPullRequest(octokit) {
	return async function lastMergedPullRequestNumber(owner, repo, branchName) {
		try {
			const { data: pullRequests } = await octokit.rest.pulls.list({
				owner,
				repo,
				state: "closed",
				sort: "updated",
				direction: "desc"
			});
			return pullRequests.find((pr) => pr.base.ref === branchName && pr.merged_at);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to get last merged pull request number: ${errorMessage}`);
		}
	};
}

//#endregion
//#region src/index.ts
async function run() {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		setFailed("GITHUB_TOKEN is not set");
		return;
	}
	const patchReleaseScript = getInput("patch-release-script");
	const minorReleaseScript = getInput("minor-release-script");
	const majorReleaseScript = getInput("major-release-script");
	const releaseBranchName = getInput("release-branch-name") || "main";
	debug("patchScript: " + patchReleaseScript);
	debug("minorScript: " + minorReleaseScript);
	debug("majorScript: " + majorReleaseScript);
	debug("releaseBranchName: " + releaseBranchName);
	const octokit = getOctokit(token);
	const owner = context.repo.owner;
	const repo = context.repo.repo;
	const pullRequest = await getLastMergedPullRequest(octokit)(owner, repo, releaseBranchName);
	if (!pullRequest) {
		setFailed("No merged pull request found");
		return;
	}
	const labels = await getMergedPullRequestLabels(octokit)(owner, repo, pullRequest.number);
	debug(`Labels on PR (#${pullRequest.number}): ` + labels?.join(", "));
	if (!labels || labels.length === 0) {
		info("No relevant labels found");
		return;
	}
	if (labels.includes(ReleaseLabelName.VersionSkip)) {
		info("Version skip was added, skipping action.");
		return;
	}
	if (labels.includes(ReleaseLabelName.VersionRequired)) setFailed("Version required is invalid label for a release.");
	else if (labels.includes(ReleaseLabelName.VersionPatch)) info(`Patch release script executed with response: ${await executeBuildScript(patchReleaseScript)}`);
	else if (labels.includes(ReleaseLabelName.VersionMinor)) info(`Minor release script executed with response: ${await executeBuildScript(minorReleaseScript)}`);
	else if (labels.includes(ReleaseLabelName.VersionMajor)) info(`Major release script executed with response: ${await executeBuildScript(majorReleaseScript)}`);
	info("Release process completed successfully.");
}
run().catch((error) => setFailed(`Action failed with error: ${error?.message ?? error}`));

//#endregion
export {  };