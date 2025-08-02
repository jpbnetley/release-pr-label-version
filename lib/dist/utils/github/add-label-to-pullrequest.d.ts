import { Octokit } from "lib/types/models/github/octokit.js";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWxhYmVsLXRvLXB1bGxyZXF1ZXN0LmQudHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdGh1Yi9hZGQtbGFiZWwtdG8tcHVsbHJlcXVlc3QuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnbGliL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcyc7XG5leHBvcnQgdHlwZSBBZGRMYWJlbFRvUHVsbFJlcXVlc3RQYXJhbXMgPSB7XG4gICAgb3duZXI6IHN0cmluZztcbiAgICByZXBvOiBzdHJpbmc7XG4gICAgcHVsbE51bWJlcjogbnVtYmVyO1xuICAgIGxhYmVsczogc3RyaW5nW107XG59O1xuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhZGRzIGEgbGFiZWwgdG8gYSBzcGVjaWZpZWQgcHVsbCByZXF1ZXN0IHVzaW5nIHRoZSBwcm92aWRlZCBPY3Rva2l0IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSBvY3Rva2l0IC0gQW4gYXV0aGVudGljYXRlZCBPY3Rva2l0IGluc3RhbmNlIGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZSBHaXRIdWIgQVBJLlxuICogQHJldHVybnMgQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCBhZGRzIGEgbGFiZWwgdG8gYSBwdWxsIHJlcXVlc3QuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGFkZExhYmVsID0gYWRkTGFiZWxUb1B1bGxSZXF1ZXN0KG9jdG9raXQpO1xuICogYXdhaXQgYWRkTGFiZWwoeyBvd25lcjogJ29yZycsIHJlcG86ICdyZXBvJywgcHVsbE51bWJlcjogMTIzLCBsYWJlbHM6IFsnYnVnJ10gfSk7XG4gKlxuICogQHBhcmFtIHBhcmFtcy5vd25lciAtIFRoZSBvd25lciBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBwYXJhbXMucmVwbyAtIFRoZSBuYW1lIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHBhcmFtcy5wdWxsTnVtYmVyIC0gVGhlIG51bWJlciBvZiB0aGUgcHVsbCByZXF1ZXN0IHRvIGxhYmVsLlxuICogQHBhcmFtIHBhcmFtcy5sYWJlbHMgLSBUaGUgbGFiZWxzIHRvIGFkZCB0byB0aGUgcHVsbCByZXF1ZXN0LlxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBhZGRMYWJlbFRvUHVsbFJlcXVlc3Qob2N0b2tpdDogT2N0b2tpdCk6ICh7IG93bmVyLCByZXBvLCBwdWxsTnVtYmVyLCBsYWJlbHMsIH06IEFkZExhYmVsVG9QdWxsUmVxdWVzdFBhcmFtcykgPT4gUHJvbWlzZTx2b2lkPjtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBVyw4QkFBOEIsQ0FBQyxDQUFBO0FBQzFDLElBQVcsd0JBQU07Q0FBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7QUFBQSJ9