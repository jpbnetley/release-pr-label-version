import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";

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
	return function release({ body, isDraft = false, isPreRelease = false, owner, releaseName, repo, tagName, generate_release_notes = true }) {
		return new Promise(async (resolve, reject) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXRodWIvY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9yLCBpbmZvIH0gZnJvbSAnQGFjdGlvbnMvY29yZSdcbmltcG9ydCB7IE9jdG9raXQgfSBmcm9tICcuLi8uLi90eXBlcy9tb2RlbHMvZ2l0aHViL29jdG9raXQuanMnXG5cbmV4cG9ydCB0eXBlIENyZWF0ZUdpdEh1YlJlbGVhc2VQYXJhbSA9IHtcbiAgb3duZXI6IHN0cmluZ1xuICByZXBvOiBzdHJpbmdcbiAgdGFnTmFtZTogc3RyaW5nXG4gIHJlbGVhc2VOYW1lOiBzdHJpbmdcbiAgYm9keTogc3RyaW5nXG4gIGlzRHJhZnQ/OiBib29sZWFuXG4gIGlzUHJlUmVsZWFzZT86IGJvb2xlYW5cbiAgZ2VuZXJhdGVfcmVsZWFzZV9ub3Rlcz86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdG8gcHVibGlzaCBhIG5ldyBHaXRIdWIgcmVsZWFzZSB1c2luZyB0aGUgcHJvdmlkZWQgT2N0b2tpdCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgR2l0SHViIEFQSS5cbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgR2l0SHViIHJlbGVhc2Ugd2hlbiBjYWxsZWQuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZXF1aXJlcyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKiAtIGB0YWdOYW1lYDogVGhlIHRhZyBuYW1lIGZvciB0aGUgcmVsZWFzZSAoZS5nLiwgXCJ2MS4wLjBcIikuXG4gKiAtIGByZWxlYXNlTmFtZWA6IFRoZSBuYW1lL3RpdGxlIG9mIHRoZSByZWxlYXNlLlxuICogLSBgYm9keWA6IFRoZSByZWxlYXNlIG5vdGVzIG9yIGRlc2NyaXB0aW9uLlxuICogLSBgaXNEcmFmdGA6IE9wdGlvbmFsLiBXaGV0aGVyIHRoZSByZWxlYXNlIGlzIGEgZHJhZnQuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gKiAtIGBpc1ByZVJlbGVhc2VgOiBPcHRpb25hbC4gV2hldGhlciB0aGUgcmVsZWFzZSBpcyBhIHByZS1yZWxlYXNlLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZWFkcyB0aGUgcmVwb3NpdG9yeSBvd25lciBhbmQgbmFtZSBmcm9tIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAqIGBHSVRIVUJfUkVQT1NJVE9SWV9PV05FUmAgYW5kIGBHSVRIVUJfUkVQT1NJVE9SWV9OQU1FYC5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIGlmIHRoZSBHaXRIdWIgcmVsZWFzZSBjcmVhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdpdEh1YlJlbGVhc2Uob2N0b2tpdDogT2N0b2tpdCkge1xuICByZXR1cm4gZnVuY3Rpb24gcmVsZWFzZSh7XG4gICAgYm9keSxcbiAgICBpc0RyYWZ0ID0gZmFsc2UsXG4gICAgaXNQcmVSZWxlYXNlID0gZmFsc2UsXG4gICAgb3duZXIsXG4gICAgcmVsZWFzZU5hbWUsXG4gICAgcmVwbyxcbiAgICB0YWdOYW1lLFxuICAgIGdlbmVyYXRlX3JlbGVhc2Vfbm90ZXMgPSB0cnVlXG4gIH06IENyZWF0ZUdpdEh1YlJlbGVhc2VQYXJhbSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBvY3Rva2l0LnJlc3QucmVwb3MuY3JlYXRlUmVsZWFzZSh7XG4gICAgICAgICAgb3duZXIsXG4gICAgICAgICAgcmVwbyxcbiAgICAgICAgICB0YWdfbmFtZTogdGFnTmFtZSxcbiAgICAgICAgICBuYW1lOiByZWxlYXNlTmFtZSxcbiAgICAgICAgICBib2R5LFxuICAgICAgICAgIGRyYWZ0OiBpc0RyYWZ0LFxuICAgICAgICAgIHByZXJlbGVhc2U6IGlzUHJlUmVsZWFzZSxcbiAgICAgICAgICBnZW5lcmF0ZV9yZWxlYXNlX25vdGVzLFxuICAgICAgICB9KVxuXG4gICAgICAgIGluZm8oYENyZWF0ZWQgR2l0SHViIHJlbGVhc2U6ICR7cmVsZWFzZU5hbWV9ICgke3RhZ05hbWV9KWApXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGVycm9yKFxuICAgICAgICAgIGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyIDogYEVycm9yIGNyZWF0aW5nIEdpdEh1YiByZWxlYXNlOiAke2Vycn1gXG4gICAgICAgIClcbiAgICAgICAgcmVqZWN0KGVycilcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLFNBQWdCLG9CQUFvQixTQUFrQjtBQUNwRCxRQUFPLFNBQVMsUUFBUSxFQUN0QixNQUNBLFVBQVUsT0FDVixlQUFlLE9BQ2YsT0FDQSxhQUNBLE1BQ0EsU0FDQSx5QkFBeUIsTUFDQSxFQUFpQjtBQUMxQyxTQUFPLElBQUksUUFBUSxPQUFPLFNBQVMsV0FBVztBQUM1QyxPQUFJO0FBQ0YsVUFBTSxRQUFRLEtBQUssTUFBTSxjQUFjO0tBQ3JDO0tBQ0E7S0FDQSxVQUFVO0tBQ1YsTUFBTTtLQUNOO0tBQ0EsT0FBTztLQUNQLFlBQVk7S0FDWjtLQUNEO0FBRUQsMEJBQUssMkJBQTJCLFlBQVksSUFBSSxRQUFRO0FBQ3hEO0dBQ0QsU0FBUSxLQUFLO0FBQ1osMkJBQ0UsZUFBZSxRQUFRLE1BQU0sa0NBQWtDO0FBRWpFLFdBQU87R0FDUjtFQUNGO0NBQ0Y7QUFDRiJ9