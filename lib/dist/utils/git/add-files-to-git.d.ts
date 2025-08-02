//#region src/utils/git/add-files-to-git.d.ts
/**
 * Adds the specified files to the current Git staging area using the `git add` command.
 *
 * @param files - An array of file paths to add to Git.
 * @remarks
 * - If the `files` array is empty, the function logs a message and returns without performing any action.
 * - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
 */
declare function addFilesToGit(files?: string[]): Promise<void>;
//#endregion
export { addFilesToGit };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWZpbGVzLXRvLWdpdC5kLnRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvYWRkLWZpbGVzLXRvLWdpdC5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQWRkcyB0aGUgc3BlY2lmaWVkIGZpbGVzIHRvIHRoZSBjdXJyZW50IEdpdCBzdGFnaW5nIGFyZWEgdXNpbmcgdGhlIGBnaXQgYWRkYCBjb21tYW5kLlxuICpcbiAqIEBwYXJhbSBmaWxlcyAtIEFuIGFycmF5IG9mIGZpbGUgcGF0aHMgdG8gYWRkIHRvIEdpdC5cbiAqIEByZW1hcmtzXG4gKiAtIElmIHRoZSBgZmlsZXNgIGFycmF5IGlzIGVtcHR5LCB0aGUgZnVuY3Rpb24gbG9ncyBhIG1lc3NhZ2UgYW5kIHJldHVybnMgd2l0aG91dCBwZXJmb3JtaW5nIGFueSBhY3Rpb24uXG4gKiAtIElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYGdpdCBhZGRgIGNvbW1hbmQsIHRoZSBlcnJvciBpcyBsb2dnZWQgYW5kIHRoZSBwcm9jZXNzIGV4aXRzIHdpdGggY29kZSAxLlxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBhZGRGaWxlc1RvR2l0KGZpbGVzPzogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+O1xuIl0sIm1hcHBpbmdzIjoiO0FBQUEsSUFBRSxnQkFBQSxDQUFBLElBQUEsTUFBQSxPQUFBIn0=