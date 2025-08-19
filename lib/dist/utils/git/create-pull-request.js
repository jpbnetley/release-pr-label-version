import { __toESM, require_core } from "../../core-CQ1wL5Ef.js";

//#region src/utils/git/create-pull-request.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
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
function createPullRequest(octokit) {
	return async function createPullRequest$1({ owner, repo, title, head, base = "main", body }) {
		try {
			const { data: pullRequest } = await octokit.rest.pulls.create({
				owner,
				repo,
				title,
				head,
				base,
				body
			});
			return pullRequest;
		} catch (error) {
			if (error instanceof Error) (0, import_core.setFailed)(`Failed to create pull request: ${error.message}`);
			else (0, import_core.setFailed)("Failed to create pull request: Unknown error");
		}
	};
}

//#endregion
export { createPullRequest };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1bGwtcmVxdWVzdC5qcyIsIm5hbWVzIjpbImNyZWF0ZVB1bGxSZXF1ZXN0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9jcmVhdGUtcHVsbC1yZXF1ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldEZhaWxlZCB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnXG5pbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSAnLi4vLi4vdHlwZXMvbW9kZWxzL2dpdGh1Yi9vY3Rva2l0LmpzJ1xuXG5leHBvcnQgdHlwZSBDcmVhdGVQdWxsUmVxdWVzdFBhcmFtcyA9IHtcbiAgb3duZXI6IHN0cmluZ1xuICByZXBvOiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBoZWFkOiBzdHJpbmdcbiAgYmFzZTogc3RyaW5nXG4gIGJvZHk/OiBzdHJpbmdcbn1cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRvIG9wZW4gYSBuZXcgcHVsbCByZXF1ZXN0IG9uIGEgR2l0SHViIHJlcG9zaXRvcnkgdXNpbmcgdGhlIHByb3ZpZGVkIE9jdG9raXQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEdpdEh1YiBBUEkuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBwdWxsIHJlcXVlc3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGNyZWF0ZVBSID0gY3JlYXRlUHVsbFJlcXVlc3Qob2N0b2tpdCk7XG4gKiBhd2FpdCBjcmVhdGVQUignb3duZXInLCAncmVwbycsICdNeSBQUiBUaXRsZScsICdmZWF0dXJlLWJyYW5jaCcsICdtYWluJywgJ1BSIGRlc2NyaXB0aW9uJyk7XG4gKlxuICogQHRocm93cyBXaWxsIGNhbGwgYHNldEZhaWxlZGAgaWYgdGhlIHB1bGwgcmVxdWVzdCBjcmVhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVB1bGxSZXF1ZXN0KG9jdG9raXQ6IE9jdG9raXQpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVB1bGxSZXF1ZXN0KHtcbiAgICBvd25lcixcbiAgICByZXBvLFxuICAgIHRpdGxlLFxuICAgIGhlYWQsXG4gICAgYmFzZSA9ICdtYWluJyxcbiAgICBib2R5LFxuICB9OiBDcmVhdGVQdWxsUmVxdWVzdFBhcmFtcykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGE6IHB1bGxSZXF1ZXN0IH0gPSBhd2FpdCBvY3Rva2l0LnJlc3QucHVsbHMuY3JlYXRlKHtcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBoZWFkLFxuICAgICAgICBiYXNlLFxuICAgICAgICBib2R5LFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHB1bGxSZXF1ZXN0XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHNldEZhaWxlZChgRmFpbGVkIHRvIGNyZWF0ZSBwdWxsIHJlcXVlc3Q6ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RmFpbGVkKCdGYWlsZWQgdG8gY3JlYXRlIHB1bGwgcmVxdWVzdDogVW5rbm93biBlcnJvcicpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsU0FBZ0Isa0JBQWtCLFNBQWtCO0FBQ2xELFFBQU8sZUFBZUEsb0JBQWtCLEVBQ3RDLE9BQ0EsTUFDQSxPQUNBLE1BQ0EsT0FBTyxRQUNQLE1BQ3dCLEVBQUU7QUFDMUIsTUFBSTtHQUNGLE1BQU0sRUFBRSxNQUFNLGFBQWEsR0FBRyxNQUFNLFFBQVEsS0FBSyxNQUFNLE9BQU87SUFDNUQ7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0Q7QUFFRCxVQUFPO0VBQ1IsU0FBUSxPQUFPO0FBQ2QsT0FBSSxpQkFBaUIsTUFDbkIsNEJBQVUsa0NBQWtDLE1BQU07T0FFbEQsNEJBQVU7RUFFYjtDQUNGO0FBQ0YifQ==