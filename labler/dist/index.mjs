import { context, getOctokit } from "@actions/github";
import { error, info, setFailed } from "@actions/core";

//#region src/utils/create-label-if-not-exists.ts
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
function createLabelIfNotExists(octokit) {
	return async function createLabelIfNotExists(owner, repo, label) {
		try {
			const { data: labels } = await octokit.rest.issues.listLabelsForRepo({
				owner,
				repo
			});
			if (!labels.some((labelCheck) => labelCheck.name === label.name)) {
				await octokit.rest.issues.createLabel({
					owner,
					repo,
					name: label.name,
					color: label.color
				});
				info(`Label created: ${label.name}`);
			} else info(`Label already exists: ${label.name}`);
		} catch (error$1) {
			error(`Failed to create label: ${error$1}`);
			if (error$1 instanceof Error) setFailed(`Failed to create label: ${error$1.message}`);
			else setFailed("Failed to create label: Unknown error");
		}
	};
}

//#endregion
//#region ../lib/dist/types/enums/release-label-colors.mjs
let ReleaseLabelColors = /* @__PURE__ */ function(ReleaseLabelColors) {
	/**
	* Red
	*/
	ReleaseLabelColors["VersionRequired"] = "b60205";
	/**
	* Green
	*/
	ReleaseLabelColors["VersionPatch"] = "0e8a16";
	/**
	* Blue
	*/
	ReleaseLabelColors["VersionMinor"] = "0052cc";
	/**
	* Orange
	*/
	ReleaseLabelColors["VersionMajor"] = "d93f0b";
	/**
	* Light Gray
	*/
	ReleaseLabelColors["VersionSkip"] = "bfd4f2";
	return ReleaseLabelColors;
}({});

//#endregion
//#region ../lib/dist/types/enums/release-label-description.mjs
let ReleaseLabelDescription = /* @__PURE__ */ function(ReleaseLabelDescription) {
	ReleaseLabelDescription["VersionRequired"] = "This PR requires a version bump label";
	ReleaseLabelDescription["VersionPatch"] = "Patch version release";
	ReleaseLabelDescription["VersionMinor"] = "Minor version release";
	ReleaseLabelDescription["VersionMajor"] = "Major version release";
	ReleaseLabelDescription["VersionSkip"] = "Skip version release";
	return ReleaseLabelDescription;
}({});

//#endregion
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
//#region ../lib/dist/types/models/release-label.mjs
const ReleaseLabel = {
	VersionRequired: {
		name: ReleaseLabelName.VersionRequired,
		description: ReleaseLabelDescription.VersionRequired,
		color: ReleaseLabelColors.VersionRequired
	},
	VersionPatch: {
		name: ReleaseLabelName.VersionPatch,
		description: ReleaseLabelDescription.VersionPatch,
		color: ReleaseLabelColors.VersionPatch
	},
	VersionMinor: {
		name: ReleaseLabelName.VersionMinor,
		description: ReleaseLabelDescription.VersionMinor,
		color: ReleaseLabelColors.VersionMinor
	},
	VersionMajor: {
		name: ReleaseLabelName.VersionMajor,
		description: ReleaseLabelDescription.VersionMajor,
		color: ReleaseLabelColors.VersionMajor
	},
	VersionSkip: {
		name: ReleaseLabelName.VersionSkip,
		description: ReleaseLabelDescription.VersionSkip,
		color: ReleaseLabelColors.VersionSkip
	}
};

//#endregion
//#region src/index.ts
const token = process.env.GITHUB_TOKEN;
if (!token) {
	setFailed("GITHUB_TOKEN is not set");
	process.exit(1);
}
const octokit = getOctokit(token);
async function run() {
	const owner = context.repo.owner;
	const repo = context.repo.repo;
	const labelCreation = Object.keys(ReleaseLabel).map(async (key) => {
		const label = ReleaseLabel[key];
		return createLabelIfNotExists(octokit)(owner, repo, {
			name: label.name,
			color: label.color
		});
	});
	await Promise.all(labelCreation);
}
run();

//#endregion
export {  };