import { t as Octokit } from "../../octokit-CLjRk6ts.mjs";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWxhYmVsLXRvLXB1bGxyZXF1ZXN0LmQubXRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXRodWIvYWRkLWxhYmVsLXRvLXB1bGxyZXF1ZXN0LnRzIl0sIm1hcHBpbmdzIjoiOzs7S0FFWSwyQkFBQTtFQUNWLEtBQUE7RUFDQSxJQUFBO0VBQ0EsVUFBQTtFQUNBLE1BQUE7QUFBQTs7Ozs7OztBQWlCRjs7Ozs7Ozs7O2lCQUFnQixxQkFBQSxDQUFzQixPQUFBLEVBQVMsT0FBQTtFQUNkLEtBQUE7RUFBQSxJQUFBO0VBQUEsVUFBQTtFQUFBO0FBQUEsR0FBcUMsMkJBQUEsS0FBMkIsT0FBQSJ9