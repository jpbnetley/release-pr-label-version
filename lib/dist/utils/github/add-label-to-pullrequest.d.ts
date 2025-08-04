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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWxhYmVsLXRvLXB1bGxyZXF1ZXN0LmQudHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdGh1Yi9hZGQtbGFiZWwtdG8tcHVsbHJlcXVlc3QuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnLi4vLi4vdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJztcbmV4cG9ydCB0eXBlIEFkZExhYmVsVG9QdWxsUmVxdWVzdFBhcmFtcyA9IHtcbiAgICBvd25lcjogc3RyaW5nO1xuICAgIHJlcG86IHN0cmluZztcbiAgICBwdWxsTnVtYmVyOiBudW1iZXI7XG4gICAgbGFiZWxzOiBzdHJpbmdbXTtcbn07XG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGFkZHMgYSBsYWJlbCB0byBhIHNwZWNpZmllZCBwdWxsIHJlcXVlc3QgdXNpbmcgdGhlIHByb3ZpZGVkIE9jdG9raXQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEdpdEh1YiBBUEkuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IGFkZHMgYSBsYWJlbCB0byBhIHB1bGwgcmVxdWVzdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgYWRkTGFiZWwgPSBhZGRMYWJlbFRvUHVsbFJlcXVlc3Qob2N0b2tpdCk7XG4gKiBhd2FpdCBhZGRMYWJlbCh7IG93bmVyOiAnb3JnJywgcmVwbzogJ3JlcG8nLCBwdWxsTnVtYmVyOiAxMjMsIGxhYmVsczogWydidWcnXSB9KTtcbiAqXG4gKiBAcGFyYW0gcGFyYW1zLm93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHBhcmFtcy5yZXBvIC0gVGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnkuXG4gKiBAcGFyYW0gcGFyYW1zLnB1bGxOdW1iZXIgLSBUaGUgbnVtYmVyIG9mIHRoZSBwdWxsIHJlcXVlc3QgdG8gbGFiZWwuXG4gKiBAcGFyYW0gcGFyYW1zLmxhYmVscyAtIFRoZSBsYWJlbHMgdG8gYWRkIHRvIHRoZSBwdWxsIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGFkZExhYmVsVG9QdWxsUmVxdWVzdChvY3Rva2l0OiBPY3Rva2l0KTogKHsgb3duZXIsIHJlcG8sIHB1bGxOdW1iZXIsIGxhYmVscywgfTogQWRkTGFiZWxUb1B1bGxSZXF1ZXN0UGFyYW1zKSA9PiBQcm9taXNlPHZvaWQ+O1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFXLDhCQUE4QixDQUFDLEVBQUE7QUFDMUMsSUFBVyx3QkFBTTtDQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtBQUFBIn0=