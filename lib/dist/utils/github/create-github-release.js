import { __toESM, require_core } from "../../core-Bd4l5kNc.js";

//#region src/utils/github/create-github-release.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
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
	return function release({ body, isDraft = false, isPreRelease = false, owner, releaseName, repo, tagName }) {
		return new Promise(async (resolve, reject) => {
			try {
				await octokit.rest.repos.createRelease({
					owner,
					repo,
					tag_name: tagName,
					name: releaseName,
					body,
					draft: isDraft,
					prerelease: isPreRelease
				});
				(0, import_core.info)(`Created GitHub release: ${releaseName} (${tagName})`);
				resolve();
			} catch (err) {
				(0, import_core.error)(err instanceof Error ? err : `Error creating GitHub release: ${err}`);
				reject(err);
			}
		});
	};
}

//#endregion
export { createGitHubRelease };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLmpzIiwibmFtZXMiOlsib2N0b2tpdDogT2N0b2tpdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXRodWIvY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9yLCBpbmZvIH0gZnJvbSAnQGFjdGlvbnMvY29yZSdcbmltcG9ydCB7IE9jdG9raXQgfSBmcm9tICdsaWIvdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJ1xuXG5leHBvcnQgdHlwZSBDcmVhdGVHaXRIdWJSZWxlYXNlUGFyYW0gPSB7XG4gIG93bmVyOiBzdHJpbmdcbiAgcmVwbzogc3RyaW5nXG4gIHRhZ05hbWU6IHN0cmluZ1xuICByZWxlYXNlTmFtZTogc3RyaW5nXG4gIGJvZHk6IHN0cmluZ1xuICBpc0RyYWZ0PzogYm9vbGVhblxuICBpc1ByZVJlbGVhc2U/OiBib29sZWFuXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRvIHB1Ymxpc2ggYSBuZXcgR2l0SHViIHJlbGVhc2UgdXNpbmcgdGhlIHByb3ZpZGVkIE9jdG9raXQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEdpdEh1YiBBUEkuXG4gKiBAcmV0dXJucyBBIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIEdpdEh1YiByZWxlYXNlIHdoZW4gY2FsbGVkLlxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVxdWlyZXMgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICogLSBgdGFnTmFtZWA6IFRoZSB0YWcgbmFtZSBmb3IgdGhlIHJlbGVhc2UgKGUuZy4sIFwidjEuMC4wXCIpLlxuICogLSBgcmVsZWFzZU5hbWVgOiBUaGUgbmFtZS90aXRsZSBvZiB0aGUgcmVsZWFzZS5cbiAqIC0gYGJvZHlgOiBUaGUgcmVsZWFzZSBub3RlcyBvciBkZXNjcmlwdGlvbi5cbiAqIC0gYGlzRHJhZnRgOiBPcHRpb25hbC4gV2hldGhlciB0aGUgcmVsZWFzZSBpcyBhIGRyYWZ0LiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICogLSBgaXNQcmVSZWxlYXNlYDogT3B0aW9uYWwuIFdoZXRoZXIgdGhlIHJlbGVhc2UgaXMgYSBwcmUtcmVsZWFzZS4gRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gcmVhZHMgdGhlIHJlcG9zaXRvcnkgb3duZXIgYW5kIG5hbWUgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gKiBgR0lUSFVCX1JFUE9TSVRPUllfT1dORVJgIGFuZCBgR0lUSFVCX1JFUE9TSVRPUllfTkFNRWAuXG4gKlxuICogQHRocm93cyBXaWxsIHJlamVjdCB0aGUgcHJvbWlzZSBpZiB0aGUgR2l0SHViIHJlbGVhc2UgY3JlYXRpb24gZmFpbHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHaXRIdWJSZWxlYXNlKG9jdG9raXQ6IE9jdG9raXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbGVhc2Uoe1xuICAgIGJvZHksXG4gICAgaXNEcmFmdCA9IGZhbHNlLFxuICAgIGlzUHJlUmVsZWFzZSA9IGZhbHNlLFxuICAgIG93bmVyLFxuICAgIHJlbGVhc2VOYW1lLFxuICAgIHJlcG8sXG4gICAgdGFnTmFtZSxcbiAgfTogQ3JlYXRlR2l0SHViUmVsZWFzZVBhcmFtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG9jdG9raXQucmVzdC5yZXBvcy5jcmVhdGVSZWxlYXNlKHtcbiAgICAgICAgICBvd25lcixcbiAgICAgICAgICByZXBvLFxuICAgICAgICAgIHRhZ19uYW1lOiB0YWdOYW1lLFxuICAgICAgICAgIG5hbWU6IHJlbGVhc2VOYW1lLFxuICAgICAgICAgIGJvZHksXG4gICAgICAgICAgZHJhZnQ6IGlzRHJhZnQsXG4gICAgICAgICAgcHJlcmVsZWFzZTogaXNQcmVSZWxlYXNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgaW5mbyhgQ3JlYXRlZCBHaXRIdWIgcmVsZWFzZTogJHtyZWxlYXNlTmFtZX0gKCR7dGFnTmFtZX0pYClcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZXJyb3IoXG4gICAgICAgICAgZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIgOiBgRXJyb3IgY3JlYXRpbmcgR2l0SHViIHJlbGVhc2U6ICR7ZXJyfWBcbiAgICAgICAgKVxuICAgICAgICByZWplY3QoZXJyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsU0FBZ0Isb0JBQW9CQSxTQUFrQjtBQUNwRCxRQUFPLFNBQVMsUUFBUSxFQUN0QixNQUNBLFVBQVUsT0FDVixlQUFlLE9BQ2YsT0FDQSxhQUNBLE1BQ0EsU0FDeUIsRUFBaUI7QUFDMUMsU0FBTyxJQUFJLFFBQVEsT0FBTyxTQUFTLFdBQVc7QUFDNUMsT0FBSTtJQUNGLE1BQU0sUUFBUSxLQUFLLE1BQU0sY0FBYztLQUNyQztLQUNBO0tBQ0EsVUFBVTtLQUNWLE1BQU07S0FDTjtLQUNBLE9BQU87S0FDUCxZQUFZO0lBQ2IsRUFBQzswQkFFRyxDQUFDLHdCQUF3QixFQUFFLFlBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDM0QsU0FBUztHQUNWLFNBQVEsS0FBSzsyQkFFVixlQUFlLFFBQVEsTUFBTSxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FDckU7SUFDRCxPQUFPLElBQUk7R0FDWjtFQUNGO0NBQ0Y7QUFDRiJ9