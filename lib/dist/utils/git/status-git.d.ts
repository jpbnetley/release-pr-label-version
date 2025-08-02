//#region src/utils/git/status-git.d.ts
/**
 * Retrieves the current Git working directory status using the `git status --porcelain` command.
 *
 * @returns A promise that resolves with the trimmed output of the Git status command,
 *          or rejects with an error message if the command fails.
 */
declare function getGitStatus(): Promise<string>;
//#endregion
export { getGitStatus };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWdpdC5kLnRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvc3RhdHVzLWdpdC5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IEdpdCB3b3JraW5nIGRpcmVjdG9yeSBzdGF0dXMgdXNpbmcgdGhlIGBnaXQgc3RhdHVzIC0tcG9yY2VsYWluYCBjb21tYW5kLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHRyaW1tZWQgb3V0cHV0IG9mIHRoZSBHaXQgc3RhdHVzIGNvbW1hbmQsXG4gKiAgICAgICAgICBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgY29tbWFuZCBmYWlscy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZ2V0R2l0U3RhdHVzKCk6IFByb21pc2U8c3RyaW5nPjtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUUsZUFBQSxDQUFBLElBQUEsTUFBQSxPQUFBIn0=