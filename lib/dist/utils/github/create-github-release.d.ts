import { Octokit } from "lib/types/models/github/octokit.js";

//#region src/utils/github/create-github-release.d.ts
type CreateGitHubReleaseParam = {
  owner: string;
  repo: string;
  tagName: string;
  releaseName: string;
  body: string;
  isDraft?: boolean;
  isPreRelease?: boolean;
};
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
declare function createGitHubRelease(octokit: Octokit): ({
  body,
  isDraft,
  isPreRelease,
  owner,
  releaseName,
  repo,
  tagName
}: CreateGitHubReleaseParam) => Promise<void>;
//#endregion
export { CreateGitHubReleaseParam, createGitHubRelease };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLmQudHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdGh1Yi9jcmVhdGUtZ2l0aHViLXJlbGVhc2UuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnbGliL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcyc7XG5leHBvcnQgdHlwZSBDcmVhdGVHaXRIdWJSZWxlYXNlUGFyYW0gPSB7XG4gICAgb3duZXI6IHN0cmluZztcbiAgICByZXBvOiBzdHJpbmc7XG4gICAgdGFnTmFtZTogc3RyaW5nO1xuICAgIHJlbGVhc2VOYW1lOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nO1xuICAgIGlzRHJhZnQ/OiBib29sZWFuO1xuICAgIGlzUHJlUmVsZWFzZT86IGJvb2xlYW47XG59O1xuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdG8gcHVibGlzaCBhIG5ldyBHaXRIdWIgcmVsZWFzZSB1c2luZyB0aGUgcHJvdmlkZWQgT2N0b2tpdCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgR2l0SHViIEFQSS5cbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgR2l0SHViIHJlbGVhc2Ugd2hlbiBjYWxsZWQuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZXF1aXJlcyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKiAtIGB0YWdOYW1lYDogVGhlIHRhZyBuYW1lIGZvciB0aGUgcmVsZWFzZSAoZS5nLiwgXCJ2MS4wLjBcIikuXG4gKiAtIGByZWxlYXNlTmFtZWA6IFRoZSBuYW1lL3RpdGxlIG9mIHRoZSByZWxlYXNlLlxuICogLSBgYm9keWA6IFRoZSByZWxlYXNlIG5vdGVzIG9yIGRlc2NyaXB0aW9uLlxuICogLSBgaXNEcmFmdGA6IE9wdGlvbmFsLiBXaGV0aGVyIHRoZSByZWxlYXNlIGlzIGEgZHJhZnQuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gKiAtIGBpc1ByZVJlbGVhc2VgOiBPcHRpb25hbC4gV2hldGhlciB0aGUgcmVsZWFzZSBpcyBhIHByZS1yZWxlYXNlLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZWFkcyB0aGUgcmVwb3NpdG9yeSBvd25lciBhbmQgbmFtZSBmcm9tIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAqIGBHSVRIVUJfUkVQT1NJVE9SWV9PV05FUmAgYW5kIGBHSVRIVUJfUkVQT1NJVE9SWV9OQU1FYC5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIGlmIHRoZSBHaXRIdWIgcmVsZWFzZSBjcmVhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gY3JlYXRlR2l0SHViUmVsZWFzZShvY3Rva2l0OiBPY3Rva2l0KTogKHsgYm9keSwgaXNEcmFmdCwgaXNQcmVSZWxlYXNlLCBvd25lciwgcmVsZWFzZU5hbWUsIHJlcG8sIHRhZ05hbWUsIH06IENyZWF0ZUdpdEh1YlJlbGVhc2VQYXJhbSkgPT4gUHJvbWlzZTx2b2lkPjtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBVywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3ZDLElBQVcsc0JBQU07Q0FBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7QUFBQSJ9