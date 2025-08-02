import { Octokit } from "lib/types/models/github/octokit.js";

//#region src/utils/git/create-pull-request.d.ts
type CreatePullRequestParams = {
  owner: string;
  repo: string;
  title: string;
  head: string;
  base: string;
  body?: string;
};
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
declare function createPullRequest(octokit: Octokit): ({
  owner,
  repo,
  title,
  head,
  base,
  body
}: CreatePullRequestParams) => Promise<any>;
//#endregion
export { CreatePullRequestParams, createPullRequest };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1bGwtcmVxdWVzdC5kLnRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvY3JlYXRlLXB1bGwtcmVxdWVzdC5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9jdG9raXQgfSBmcm9tICdsaWIvdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJztcbmV4cG9ydCB0eXBlIENyZWF0ZVB1bGxSZXF1ZXN0UGFyYW1zID0ge1xuICAgIG93bmVyOiBzdHJpbmc7XG4gICAgcmVwbzogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgaGVhZDogc3RyaW5nO1xuICAgIGJhc2U6IHN0cmluZztcbiAgICBib2R5Pzogc3RyaW5nO1xufTtcbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRvIG9wZW4gYSBuZXcgcHVsbCByZXF1ZXN0IG9uIGEgR2l0SHViIHJlcG9zaXRvcnkgdXNpbmcgdGhlIHByb3ZpZGVkIE9jdG9raXQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEdpdEh1YiBBUEkuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBwdWxsIHJlcXVlc3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGNyZWF0ZVBSID0gY3JlYXRlUHVsbFJlcXVlc3Qob2N0b2tpdCk7XG4gKiBhd2FpdCBjcmVhdGVQUignb3duZXInLCAncmVwbycsICdNeSBQUiBUaXRsZScsICdmZWF0dXJlLWJyYW5jaCcsICdtYWluJywgJ1BSIGRlc2NyaXB0aW9uJyk7XG4gKlxuICogQHRocm93cyBXaWxsIGNhbGwgYHNldEZhaWxlZGAgaWYgdGhlIHB1bGwgcmVxdWVzdCBjcmVhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gY3JlYXRlUHVsbFJlcXVlc3Qob2N0b2tpdDogT2N0b2tpdCk6ICh7IG93bmVyLCByZXBvLCB0aXRsZSwgaGVhZCwgYmFzZSwgYm9keSwgfTogQ3JlYXRlUHVsbFJlcXVlc3RQYXJhbXMpID0+IFByb21pc2U8YW55PjtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBVywwQkFBMEIsQ0FBQyxDQUFBO0FBQ3RDLElBQVcsb0JBQU07Q0FBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtBQUFBIn0=