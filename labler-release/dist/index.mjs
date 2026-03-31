import { debug, error, getInput, info, setFailed, summary } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { exec, execSync } from "node:child_process";
//#region ../lib/dist/types/enums/release-label-name.mjs
let ReleaseLabelName = /* @__PURE__ */ function(ReleaseLabelName) {
	ReleaseLabelName["VersionRequired"] = "release:version-required";
	ReleaseLabelName["VersionPatch"] = "release:version-patch";
	ReleaseLabelName["VersionMinor"] = "release:version-minor";
	ReleaseLabelName["VersionMajor"] = "release:version-major";
	ReleaseLabelName["VersionSkip"] = "release:version-skip";
	ReleaseLabelName["VersionBump"] = "release:version-bump";
	ReleaseLabelName["VersionPreRelease"] = "release:version-pre";
	return ReleaseLabelName;
}({});
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
//#region src/constants/release-branch-name.ts
const RELEASE_BRANCH_NAME = "release/version";
//#endregion
//#region src/utils/version/get-current-release-version.ts
/**
* Executes the provided shell script to retrieve the current release version.
*
* @param script - The shell command to execute for obtaining the release version.
* @returns A promise that resolves with the release version as a string, or rejects with an error message if the command fails or no version is found.
*/
function getCurrentReleaseVersion(script) {
	return new Promise((resolve, reject) => {
		exec(script, (error, stdout) => {
			if (error) return reject(`Error getting current release version: ${error.message}`);
			const version = stdout.trim();
			if (!version) return reject("No release version found");
			resolve(version);
		});
	});
}
//#endregion
//#region ../lib/dist/utils/github/create-pull-request.mjs
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
	return async function createPullRequest({ owner, repo, title, head, base = "main", body }) {
		try {
			const { data: pullRequest } = await octokit.rest.pulls.create({
				owner,
				repo,
				title,
				head,
				base,
				body
			});
			return pullRequest;
		} catch (error) {
			if (error instanceof Error) setFailed(`Failed to create pull request: ${error.message}`);
			else setFailed("Failed to create pull request: Unknown error");
		}
	};
}
//#endregion
//#region ../lib/dist/utils/github/create-github-release.mjs
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
		return new Promise((resolve, reject) => {
			(async () => {
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
					info(`Created GitHub release: ${releaseName} (${tagName})`);
					resolve();
				} catch (err) {
					error(err instanceof Error ? err : `Error creating GitHub release: ${err}`);
					reject(err);
				}
			})();
		});
	};
}
//#endregion
//#region ../lib/dist/utils/git/create-new-git-branch.mjs
/**
* Factory function that returns an async function to create a new Git branch in a GitHub repository using Octokit.
*
* @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
* @returns An async function that creates a new branch from a specified base branch.
*
* @function
* @async
* @param owner - The owner of the repository.
* @param repo - The name of the repository.
* @param branchName - The name of the new branch to create.
* @param baseBranch - (Optional) The name of the base branch to branch from. Defaults to the current context ref or 'main'.
* @returns The newly created branch data if successful; otherwise, handles errors and sets the failure state.
*
* @throws Will call `setFailed` if the branch creation fails.
*/
function createNewGitBranch(octokit) {
	return async function createNewGitBranch({ baseBranch = context.ref.split("/").pop() || "main", branchName, owner, repo }) {
		try {
			const { data: refData } = await octokit.rest.git.getRef({
				owner,
				repo,
				ref: `heads/${baseBranch}`
			});
			const { data: newBranch } = await octokit.rest.git.createRef({
				owner,
				repo,
				ref: `refs/heads/${branchName}`,
				sha: refData.object.sha
			});
			return newBranch;
		} catch (error) {
			if (error instanceof Error) setFailed(`Failed to create new git branch: ${error.message}`);
			else setFailed("Failed to create new git branch: Unknown error");
		}
	};
}
//#endregion
//#region ../lib/dist/utils/git/checkout-branch-git.mjs
/**
* Creates and checks out a new Git branch from the specified base branch.
*
* @param baseBranch - The name of the base branch to branch off from. Defaults to 'main'.
* @returns A promise that resolves when the branch has been successfully checked out, or rejects with an error message if the operation fails.
*/
function checkoutBranch(baseBranch) {
	return new Promise((resolve, reject) => {
		exec(`git checkout -b ${baseBranch}`, (error) => {
			if (error) return reject(`Error checking out branch: ${error.message}`);
			resolve();
		});
	});
}
//#endregion
//#region ../lib/dist/utils/git/add-files-to-git.mjs
/**
* Adds the specified files to the current Git staging area using the `git add` command.
*
* @param files - An array of file paths to add to Git.
* @remarks
* - If the `files` array is empty, the function logs a message and returns without performing any action.
* - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
*/
function addFilesToGit(files = ["."]) {
	return new Promise((resolve, reject) => {
		if (!files || files.length === 0) {
			info("No files to add to git.");
			resolve();
			return;
		}
		try {
			execSync(`git add ${files.join(" ")}`, { stdio: "inherit" });
			info(`Added files to git: ${files.join(", ")}`);
			resolve();
		} catch (err) {
			error(err instanceof Error ? err : `Error adding files to git: ${err}`);
			reject(err);
		}
	});
}
//#endregion
//#region ../lib/dist/utils/git/commit-files-to-git.mjs
/**
* Stages the specified files and creates a Git commit with the provided commit message and author information.
*
* @param commitMessage - The commit message to use for the Git commit.
* @param authorName - The name of the commit author.
* @param authorEmail - The email address of the commit author.
* @returns A Promise that resolves when the files have been committed, or rejects with an error message if the operation fails.
*/
function commitFilesToGit({ commitMessage }) {
	return new Promise((resolve, reject) => {
		exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
			if (error) {
				if (stderr.includes("nothing to commit")) {
					info("No changes to commit.");
					resolve();
					return;
				}
				return reject(`Error committing files: ${stderr || error.message}`);
			}
			info(stdout);
			resolve();
		});
	});
}
//#endregion
//#region ../lib/dist/utils/git/has-changes-git.mjs
/**
* Checks if there are any uncommitted changes in the current Git repository.
*
* Executes `git status --porcelain` to determine if the working directory is clean.
*
* @returns A promise that resolves to `true` if there are uncommitted changes, or `false` if the working directory is clean.
* @throws If there is an error executing the Git command.
*/
function hasGitChanges() {
	return new Promise((resolve, reject) => {
		exec("git status --porcelain", { encoding: "utf-8" }, (error, stdout) => {
			if (error) {
				reject(`Error executing git status: ${error}`);
				return;
			}
			if (stdout) resolve(true);
			else resolve(false);
		});
	});
}
//#endregion
//#region ../lib/dist/utils/git/set-git-identity.mjs
/**
* Sets the Git user identity (name and email) for the current repository.
*
* This function executes `git config user.name` and `git config user.email`
* commands to configure the Git user identity. It returns a Promise that resolves
* when both commands complete successfully, or rejects with an error message if
* either command fails.
*
* @param name - The Git user name to set.
* @param email - The Git user email to set.
* @returns A Promise that resolves when the Git identity is set, or rejects with an error message.
*/
function setGitIdentity({ name = "GitHub Action", email = "action@github.com" } = {}) {
	return new Promise((resolve, reject) => {
		exec(`git config user.name "${name}"`, (error) => {
			if (error) {
				reject(`Error setting Git user name: ${error}`);
				return;
			}
			exec(`git config user.email "${email}"`, (error) => {
				if (error) {
					reject(`Error setting Git user email: ${error}`);
					return;
				}
				resolve();
			});
		});
	});
}
//#endregion
//#region ../lib/dist/utils/github/add-label-to-pullrequest.mjs
/**
* Returns a function that adds a label to a specified pull request using the provided Octokit instance.
*
* @param octokit - An authenticated Octokit instance for interacting with the GitHub API.
* @returns An async function that adds a label to a pull request.
*
* @example
* const addLabel = addLabelToPullRequest(octokit);
* await addLabel({ owner: 'org', repo: 'repo', pullNumber: 123, labels: ['bug'] });
*
* @param params.owner - The owner of the repository.
* @param params.repo - The name of the repository.
* @param params.pullNumber - The number of the pull request to label.
* @param params.labels - The labels to add to the pull request.
*/
function addLabelToPullRequest(octokit) {
	return async function addLabel({ owner, repo, pullNumber, labels }) {
		await octokit.rest.issues.addLabels({
			owner,
			repo,
			issue_number: pullNumber,
			labels
		});
	};
}
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
//#region src/utils/execute-release-script.ts
/**
* Executes the appropriate release script based on the provided release labels.
*
* The function checks the `labels` array for specific release label names
* (pre-release, patch, minor, major) and executes the corresponding script if provided.
* If a pre-release label is present but no pre-release script is provided, the function
* will mark the operation as failed.
*
* @param params - An object containing:
*   - `labels`: An array of release label names to determine which script to execute.
*   - `majorReleaseScript`: The script to execute for a major release.
*   - `minorReleaseScript`: The script to execute for a minor release.
*   - `patchReleaseScript`: The script to execute for a patch release.
*   - `preReleaseScript`: The script to execute for a pre-release.
*
* @remarks
* The function executes only one script per invocation, prioritizing pre-release,
* then patch, minor, and finally major, based on the order of checks.
*
* @returns A promise that resolves when the appropriate script has been executed.
*/
async function executeReleaseScript({ labels, majorReleaseScript, minorReleaseScript, patchReleaseScript, preReleaseScript }) {
	if (labels.includes(ReleaseLabelName.VersionPreRelease)) {
		if (!preReleaseScript) {
			setFailed("Pre-release script is not provided");
			return;
		}
		info(`Pre-release script executed with response: ${await executeBuildScript(preReleaseScript)}`);
	} else if (labels.includes(ReleaseLabelName.VersionPatch) && patchReleaseScript) info(`Patch release script executed with response: ${await executeBuildScript(patchReleaseScript)}`);
	else if (labels.includes(ReleaseLabelName.VersionMinor) && minorReleaseScript) info(`Minor release script executed with response: ${await executeBuildScript(minorReleaseScript)}`);
	else if (labels.includes(ReleaseLabelName.VersionMajor) && majorReleaseScript) info(`Major release script executed with response: ${await executeBuildScript(majorReleaseScript)}`);
}
//#endregion
//#region ../lib/dist/utils/git/git-branch-name.mjs
/**
* Retrieves the current Git branch name by executing the appropriate Git command.
*
* @returns A promise that resolves to the name of the current Git branch as a string.
* @throws Will reject the promise with an error message if the Git command fails.
*/
function gitBranchName() {
	return new Promise((resolve, reject) => {
		exec("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }, (error, stdout) => {
			if (error) {
				reject(`Error getting git branch name: ${error.message}`);
				return;
			}
			resolve(stdout.trim());
		});
	});
}
//#endregion
//#region ../lib/dist/utils/git/push-git.mjs
/**
* Returns an async function to push changes to a specified branch in a GitHub repository using Octokit.
*
* @param octokit - An authenticated Octokit instance for GitHub API requests.
* @returns An async function that pushes changes to a branch.
*
* The returned function parameters:
* @param owner - The owner of the repository.
* @param repo - The name of the repository.
* @param branchName - The name of the branch to push changes to.
* @param commitMessage - (Optional) The commit SHA to update the branch reference to. Defaults to 'Update branch'.
* @returns The response data from the GitHub API after updating the reference, or undefined if an error occurs.
*
* @remarks
* The `commitMessage` parameter is used as the SHA for the updateRef call, which should be the commit SHA you want the branch to point to.
* If an error occurs during the push, the function will call `setFailed` with an appropriate error message.
*/
function gitPush(branchName) {
	return new Promise((resolve, reject) => {
		exec(`git push origin ${branchName}`, (error) => {
			if (error) {
				setFailed(`Failed to push changes: ${error.message}`);
				reject(error);
				return;
			}
			info(`Successfully pushed changes to branch: ${branchName}`);
			resolve();
		});
	});
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
	const preReleaseScript = getInput("pre-release-script");
	const releaseBranchName = getInput("release-branch-name") || "main";
	const preReleaseBranchName = getInput("pre-release-branch-name");
	const currentVersionScript = getInput("get-current-version-script");
	const releaseScript = getInput("release-script");
	debug("preReleaseScript: " + preReleaseScript);
	debug("patchScript: " + patchReleaseScript);
	debug("minorScript: " + minorReleaseScript);
	debug("majorScript: " + majorReleaseScript);
	debug("releaseBranchName: " + releaseBranchName);
	debug("currentVersionScript: " + currentVersionScript);
	debug("releaseScript: " + releaseScript);
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
	const isPreRelease = labels.includes(ReleaseLabelName.VersionPreRelease);
	if (isPreRelease && !preReleaseBranchName) {
		setFailed("Pre-release branch name is required for pre-release versions");
		return;
	}
	debug(`Labels on PR (#${pullRequest.number}): ` + labels?.join(", "));
	if (!labels || labels.length === 0) {
		info("No relevant labels found");
		return;
	}
	if (isPreRelease && !preReleaseBranchName) {
		setFailed("Pre-release branch name is required for pre-release versions");
		return;
	}
	const RELEASE_VERSION_BRANCH_NAME = `${RELEASE_BRANCH_NAME}-${pullRequest.number}`;
	if (labels.includes(ReleaseLabelName.VersionBump)) {
		const currentVersion = await getCurrentReleaseVersion(currentVersionScript);
		debug(`Current version: ${currentVersion}`);
		if (!currentVersion) {
			setFailed("Current version could not be determined");
			return;
		}
		if (releaseScript) {
			debug("Executing release script");
			await executeBuildScript(releaseScript);
			info(`Release script executed successfully.`);
		}
		await createGitHubRelease(octokit)({
			owner,
			repo,
			tagName: `${currentVersion}`,
			releaseName: `Release for version: ${currentVersion}`,
			body: `Release ${currentVersion}`,
			isPreRelease
		});
		info("Release created successfully.");
		debug("Creating summary");
		await summary.addHeading("Release version").addRaw(`Created for: ${currentVersion}`).write();
		debug("Created summary");
		if (!labels.includes(ReleaseLabelName.VersionPreRelease) && preReleaseBranchName) {
			const branchNameReleaseToPreRelease = `${RELEASE_BRANCH_NAME}-to-${preReleaseBranchName}`;
			await createNewGitBranch(octokit)({
				branchName: branchNameReleaseToPreRelease,
				owner,
				repo,
				baseBranch: preReleaseBranchName
			});
			await createPullRequest(octokit)({
				owner,
				repo,
				title: `Merge changes from ${releaseBranchName} to ${preReleaseBranchName}`,
				head: branchNameReleaseToPreRelease,
				base: preReleaseBranchName
			});
		}
		return;
	}
	if (labels.includes(ReleaseLabelName.VersionSkip)) {
		info("Version skip was added, skipping action.");
		return;
	}
	if (labels.includes(ReleaseLabelName.VersionRequired)) {
		setFailed("Version required is invalid label for a release.");
		return;
	}
	debug(`Release version branch name: ${RELEASE_VERSION_BRANCH_NAME}`);
	await createNewGitBranch(octokit)({
		owner,
		repo,
		branchName: RELEASE_VERSION_BRANCH_NAME,
		baseBranch: pullRequest.base.ref
	});
	debug(`Created new branch: ${RELEASE_VERSION_BRANCH_NAME}`);
	debug(`Checking out to branch: ${RELEASE_VERSION_BRANCH_NAME}`);
	await checkoutBranch(RELEASE_VERSION_BRANCH_NAME);
	debug(`Checked out to branch: ${RELEASE_VERSION_BRANCH_NAME}`);
	info(`Now on branch: ${await gitBranchName()}`);
	await executeReleaseScript({
		labels,
		majorReleaseScript,
		minorReleaseScript,
		patchReleaseScript,
		preReleaseScript
	});
	const hasChanges = await hasGitChanges();
	debug(`Has changes after script execution: ${hasChanges}`);
	if (!hasChanges) {
		setFailed("No changes found to commit to git.");
		return;
	}
	debug("Set git identity");
	await setGitIdentity();
	debug("Adding files to git staging area.");
	await addFilesToGit();
	debug("Files added to git staging area.");
	const currentVersion = await getCurrentReleaseVersion(currentVersionScript);
	debug(`Current version for commit: ${currentVersion}`);
	debug("Committing files to git.");
	await commitFilesToGit({ commitMessage: `Update release version to ${currentVersion}` });
	debug("Files committed to git.");
	debug("Pushing files to remote.");
	await gitPush(RELEASE_VERSION_BRANCH_NAME);
	debug("Pushed files to remote.");
	debug(`Creating pull request for branch: ${RELEASE_VERSION_BRANCH_NAME}`);
	const newVersionPr = await createPullRequest(octokit)({
		owner,
		repo,
		title: `Release PR for #${pullRequest.number}`,
		head: RELEASE_VERSION_BRANCH_NAME,
		base: pullRequest.base.ref,
		body: `This PR was automatically created by the labler-release action for pull request #${pullRequest.number}.\n\nLabels: ${labels.join(", ")}`
	});
	debug(`Pull request created for branch: ${RELEASE_VERSION_BRANCH_NAME}`);
	if (!newVersionPr) {
		setFailed("Failed to create pull request for new version branch.");
		return;
	}
	await addLabelToPullRequest(octokit)({
		owner,
		repo,
		pullNumber: newVersionPr.number,
		labels: [ReleaseLabelName.VersionBump, isPreRelease && ReleaseLabelName.VersionPreRelease].filter(Boolean)
	});
	info(`Added label '${ReleaseLabelName.VersionBump}' to pull request #${newVersionPr.number}: ${newVersionPr.html_url}`);
	await summary.addHeading("Release version pull request").addRaw(`New version pull request: ${newVersionPr.html_url}`).write();
	info("Release process completed successfully.");
}
run().catch((error) => setFailed(`Action failed with error: ${error?.message ?? error}`));
//#endregion
export {};
