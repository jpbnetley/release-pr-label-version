import { Octokit } from "../../octokit-BfGHke4j.js";

//#region src/utils/github/create-github-release.d.ts
type CreateGitHubReleaseParam = {
  owner: string;
  repo: string;
  tagName: string;
  releaseName: string;
  body: string;
  isDraft?: boolean;
  isPreRelease?: boolean;
  generate_release_notes?: boolean;
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
  tagName,
  generate_release_notes
}: CreateGitHubReleaseParam) => Promise<void>;
//#endregion
export { CreateGitHubReleaseParam, createGitHubRelease };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLmQudHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdGh1Yi9jcmVhdGUtZ2l0aHViLXJlbGVhc2UuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnLi4vLi4vdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJztcbmV4cG9ydCB0eXBlIENyZWF0ZUdpdEh1YlJlbGVhc2VQYXJhbSA9IHtcbiAgICBvd25lcjogc3RyaW5nO1xuICAgIHJlcG86IHN0cmluZztcbiAgICB0YWdOYW1lOiBzdHJpbmc7XG4gICAgcmVsZWFzZU5hbWU6IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgaXNEcmFmdD86IGJvb2xlYW47XG4gICAgaXNQcmVSZWxlYXNlPzogYm9vbGVhbjtcbiAgICBnZW5lcmF0ZV9yZWxlYXNlX25vdGVzPzogYm9vbGVhbjtcbn07XG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0byBwdWJsaXNoIGEgbmV3IEdpdEh1YiByZWxlYXNlIHVzaW5nIHRoZSBwcm92aWRlZCBPY3Rva2l0IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSBvY3Rva2l0IC0gQW4gYXV0aGVudGljYXRlZCBPY3Rva2l0IGluc3RhbmNlIGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZSBHaXRIdWIgQVBJLlxuICogQHJldHVybnMgQSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBHaXRIdWIgcmVsZWFzZSB3aGVuIGNhbGxlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlcXVpcmVzIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAqIC0gYHRhZ05hbWVgOiBUaGUgdGFnIG5hbWUgZm9yIHRoZSByZWxlYXNlIChlLmcuLCBcInYxLjAuMFwiKS5cbiAqIC0gYHJlbGVhc2VOYW1lYDogVGhlIG5hbWUvdGl0bGUgb2YgdGhlIHJlbGVhc2UuXG4gKiAtIGBib2R5YDogVGhlIHJlbGVhc2Ugbm90ZXMgb3IgZGVzY3JpcHRpb24uXG4gKiAtIGBpc0RyYWZ0YDogT3B0aW9uYWwuIFdoZXRoZXIgdGhlIHJlbGVhc2UgaXMgYSBkcmFmdC4gRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAqIC0gYGlzUHJlUmVsZWFzZWA6IE9wdGlvbmFsLiBXaGV0aGVyIHRoZSByZWxlYXNlIGlzIGEgcHJlLXJlbGVhc2UuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gKlxuICogVGhlIGZ1bmN0aW9uIHJlYWRzIHRoZSByZXBvc2l0b3J5IG93bmVyIGFuZCBuYW1lIGZyb20gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICogYEdJVEhVQl9SRVBPU0lUT1JZX09XTkVSYCBhbmQgYEdJVEhVQl9SRVBPU0lUT1JZX05BTUVgLlxuICpcbiAqIEB0aHJvd3MgV2lsbCByZWplY3QgdGhlIHByb21pc2UgaWYgdGhlIEdpdEh1YiByZWxlYXNlIGNyZWF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBjcmVhdGVHaXRIdWJSZWxlYXNlKG9jdG9raXQ6IE9jdG9raXQpOiAoeyBib2R5LCBpc0RyYWZ0LCBpc1ByZVJlbGVhc2UsIG93bmVyLCByZWxlYXNlTmFtZSwgcmVwbywgdGFnTmFtZSwgZ2VuZXJhdGVfcmVsZWFzZV9ub3RlcyB9OiBDcmVhdGVHaXRIdWJSZWxlYXNlUGFyYW0pID0+IFByb21pc2U8dm9pZD47XG4iXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQVcsMkJBQTJCLENBQUMsQ0FBQTtBQUN2QyxJQUFXLHNCQUFNO0NBQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtDQUFBLE1BQUE7Q0FBQSxNQUFBO0NBQUEsTUFBQTtBQUFBIn0=