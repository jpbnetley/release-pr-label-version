//#region src/utils/git/git-status.d.ts
/**
 * Executes the `git status --porcelain` command and returns its output as a trimmed string.
 *
 * @returns A promise that resolves with the output of `git status --porcelain`.
 * @throws If the git command fails, the promise is rejected with an error message.
 */
declare function gitStatus(): Promise<string>;
//#endregion
export { gitStatus };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LXN0YXR1cy5kLnRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvZ2l0LXN0YXR1cy5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXhlY3V0ZXMgdGhlIGBnaXQgc3RhdHVzIC0tcG9yY2VsYWluYCBjb21tYW5kIGFuZCByZXR1cm5zIGl0cyBvdXRwdXQgYXMgYSB0cmltbWVkIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBvdXRwdXQgb2YgYGdpdCBzdGF0dXMgLS1wb3JjZWxhaW5gLlxuICogQHRocm93cyBJZiB0aGUgZ2l0IGNvbW1hbmQgZmFpbHMsIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggYW4gZXJyb3IgbWVzc2FnZS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZ2l0U3RhdHVzKCk6IFByb21pc2U8c3RyaW5nPjtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUUsWUFBQSxDQUFBLFVBQUEsUUFBQSJ9