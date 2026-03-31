import { n as info, t as error } from "../../core-lJ5mRC0h.mjs";
//#region src/utils/github/create-github-release.ts
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
export { createGitHubRelease };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdpdGh1Yi1yZWxlYXNlLm1qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0aHViL2NyZWF0ZS1naXRodWItcmVsZWFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvciwgaW5mbyB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnO1xuaW1wb3J0IHsgT2N0b2tpdCB9IGZyb20gJy4uLy4uL3R5cGVzL21vZGVscy9naXRodWIvb2N0b2tpdC5qcyc7XG5cbmV4cG9ydCB0eXBlIENyZWF0ZUdpdEh1YlJlbGVhc2VQYXJhbSA9IHtcbiAgb3duZXI6IHN0cmluZztcbiAgcmVwbzogc3RyaW5nO1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIHJlbGVhc2VOYW1lOiBzdHJpbmc7XG4gIGJvZHk6IHN0cmluZztcbiAgaXNEcmFmdD86IGJvb2xlYW47XG4gIGlzUHJlUmVsZWFzZT86IGJvb2xlYW47XG4gIGdlbmVyYXRlX3JlbGVhc2Vfbm90ZXM/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdG8gcHVibGlzaCBhIG5ldyBHaXRIdWIgcmVsZWFzZSB1c2luZyB0aGUgcHJvdmlkZWQgT2N0b2tpdCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gb2N0b2tpdCAtIEFuIGF1dGhlbnRpY2F0ZWQgT2N0b2tpdCBpbnN0YW5jZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgR2l0SHViIEFQSS5cbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgR2l0SHViIHJlbGVhc2Ugd2hlbiBjYWxsZWQuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZXF1aXJlcyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKiAtIGB0YWdOYW1lYDogVGhlIHRhZyBuYW1lIGZvciB0aGUgcmVsZWFzZSAoZS5nLiwgXCJ2MS4wLjBcIikuXG4gKiAtIGByZWxlYXNlTmFtZWA6IFRoZSBuYW1lL3RpdGxlIG9mIHRoZSByZWxlYXNlLlxuICogLSBgYm9keWA6IFRoZSByZWxlYXNlIG5vdGVzIG9yIGRlc2NyaXB0aW9uLlxuICogLSBgaXNEcmFmdGA6IE9wdGlvbmFsLiBXaGV0aGVyIHRoZSByZWxlYXNlIGlzIGEgZHJhZnQuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gKiAtIGBpc1ByZVJlbGVhc2VgOiBPcHRpb25hbC4gV2hldGhlciB0aGUgcmVsZWFzZSBpcyBhIHByZS1yZWxlYXNlLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZWFkcyB0aGUgcmVwb3NpdG9yeSBvd25lciBhbmQgbmFtZSBmcm9tIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAqIGBHSVRIVUJfUkVQT1NJVE9SWV9PV05FUmAgYW5kIGBHSVRIVUJfUkVQT1NJVE9SWV9OQU1FYC5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIGlmIHRoZSBHaXRIdWIgcmVsZWFzZSBjcmVhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdpdEh1YlJlbGVhc2Uob2N0b2tpdDogT2N0b2tpdCkge1xuICByZXR1cm4gZnVuY3Rpb24gcmVsZWFzZSh7XG4gICAgYm9keSxcbiAgICBpc0RyYWZ0ID0gZmFsc2UsXG4gICAgaXNQcmVSZWxlYXNlID0gZmFsc2UsXG4gICAgb3duZXIsXG4gICAgcmVsZWFzZU5hbWUsXG4gICAgcmVwbyxcbiAgICB0YWdOYW1lLFxuICAgIGdlbmVyYXRlX3JlbGVhc2Vfbm90ZXMgPSB0cnVlLFxuICB9OiBDcmVhdGVHaXRIdWJSZWxlYXNlUGFyYW0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBvY3Rva2l0LnJlc3QucmVwb3MuY3JlYXRlUmVsZWFzZSh7XG4gICAgICAgICAgICBvd25lcixcbiAgICAgICAgICAgIHJlcG8sXG4gICAgICAgICAgICB0YWdfbmFtZTogdGFnTmFtZSxcbiAgICAgICAgICAgIG5hbWU6IHJlbGVhc2VOYW1lLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGRyYWZ0OiBpc0RyYWZ0LFxuICAgICAgICAgICAgcHJlcmVsZWFzZTogaXNQcmVSZWxlYXNlLFxuICAgICAgICAgICAgZ2VuZXJhdGVfcmVsZWFzZV9ub3RlcyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGluZm8oYENyZWF0ZWQgR2l0SHViIHJlbGVhc2U6ICR7cmVsZWFzZU5hbWV9ICgke3RhZ05hbWV9KWApO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgZXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIgOiBgRXJyb3IgY3JlYXRpbmcgR2l0SHViIHJlbGVhc2U6ICR7ZXJyfWApO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH0pO1xuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQ0EsU0FBZ0Isb0JBQW9CLFNBQWtCO0FBQ3BELFFBQU8sU0FBUyxRQUFRLEVBQ3RCLE1BQ0EsVUFBVSxPQUNWLGVBQWUsT0FDZixPQUNBLGFBQ0EsTUFDQSxTQUNBLHlCQUF5QixRQUNpQjtBQUMxQyxTQUFPLElBQUksU0FBUyxTQUFTLFdBQVc7QUFDdEMsSUFBQyxZQUFZO0FBQ1gsUUFBSTtBQUNGLFdBQU0sUUFBUSxLQUFLLE1BQU0sY0FBYztNQUNyQztNQUNBO01BQ0EsVUFBVTtNQUNWLE1BQU07TUFDTjtNQUNBLE9BQU87TUFDUCxZQUFZO01BQ1o7TUFDRCxDQUFDO0FBRUYsVUFBSywyQkFBMkIsWUFBWSxJQUFJLFFBQVEsR0FBRztBQUMzRCxjQUFTO2FBQ0YsS0FBSztBQUNaLFdBQU0sZUFBZSxRQUFRLE1BQU0sa0NBQWtDLE1BQU07QUFDM0UsWUFBTyxJQUFJOztPQUVYO0lBQ0oifQ==