import { info, setFailed } from "@actions/core";
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
//#region src/utils/set-label-for-pull-request.ts
/**
* Sets or updates version-related labels on a pull request.
*
* This function checks if a pull request has any of the required version labels
* (`VersionPatch`, `VersionMinor`, `VersionMajor`, or `VersionSkip`). If none are present,
* it adds the `release:version-required` label and marks the action as failed.
* If a version label is present and the `release:version-required` label is also present,
* it removes the `release:version-required` label.
*
* @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
*
* @remarks
* - Relies on the `context` object for repository and pull request information.
* - Uses `setFailed` and `info` for logging and error reporting.
* - Expects `ReleaseLabelName` enum or constants to be available in scope.
*
* @throws Will call `setFailed` if the pull request number is missing or if an error occurs during label operations.
*/
async function setLabelForPullRequest(octokit) {
	try {
		const prNumber = context.payload.pull_request?.number;
		const owner = context.repo.owner;
		const repo = context.repo.repo;
		if (!prNumber) {
			setFailed("No pull request number found in context");
			return;
		}
		const { data: labels } = await octokit.rest.issues.listLabelsOnIssue({
			owner,
			repo,
			issue_number: prNumber
		});
		const labelNames = labels.map((label) => label.name);
		const hasVersionLabel = [
			ReleaseLabelName.VersionPatch,
			ReleaseLabelName.VersionMinor,
			ReleaseLabelName.VersionMajor,
			ReleaseLabelName.VersionSkip
		].some((label) => labelNames.includes(label));
		if (!hasVersionLabel) {
			await octokit.rest.issues.addLabels({
				owner,
				repo,
				issue_number: prNumber,
				labels: ["release:version-required"]
			});
			info(`Added 'release:version-required' label to PR #${prNumber}`);
			setFailed(`PR #${prNumber} is missing a version label`);
		} else {
			info(`Version label already present in PR #${prNumber}`);
			if (hasVersionLabel && labelNames.includes(ReleaseLabelName.VersionRequired)) {
				info(`Removing ${ReleaseLabelName.VersionRequired} label for PR #${prNumber}`);
				await octokit.rest.issues.removeLabel({
					owner,
					repo,
					issue_number: prNumber,
					name: ReleaseLabelName.VersionRequired
				});
				info(`Removed ${ReleaseLabelName.VersionRequired} label from PR #${prNumber}`);
			}
		}
	} catch (error) {
		if (error instanceof Error) setFailed(`Failed to set label for pull request: ${error.message}`);
		else setFailed("Failed to set label for pull request: Unknown error");
	}
}

//#endregion
//#region src/index.ts
function run() {
	const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
	if (!GITHUB_TOKEN) {
		setFailed("GITHUB_TOKEN is not set");
		process.exit(1);
	}
	setLabelForPullRequest(getOctokit(GITHUB_TOKEN));
}
run();

//#endregion
export {  };