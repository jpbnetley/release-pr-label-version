import { Octokit } from "../../octokit-BfGHke4j.js";

//#region src/utils/github/add-label-to-pullrequest.d.ts
type AddLabelToPullRequestParams = {
  owner: string;
  repo: string;
  pullNumber: number;
  labels: string[];
};
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
declare function addLabelToPullRequest(octokit: Octokit): ({
  owner,
  repo,
  pullNumber,
  labels
}: AddLabelToPullRequestParams) => Promise<void>;
//#endregion
export { AddLabelToPullRequestParams, addLabelToPullRequest };