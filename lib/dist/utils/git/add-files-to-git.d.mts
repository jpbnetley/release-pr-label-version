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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWZpbGVzLXRvLWdpdC5kLm10cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2FkZC1maWxlcy10by1naXQuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFkZHMgdGhlIHNwZWNpZmllZCBmaWxlcyB0byB0aGUgY3VycmVudCBHaXQgc3RhZ2luZyBhcmVhIHVzaW5nIHRoZSBgZ2l0IGFkZGAgY29tbWFuZC5cbiAqXG4gKiBAcGFyYW0gZmlsZXMgLSBBbiBhcnJheSBvZiBmaWxlIHBhdGhzIHRvIGFkZCB0byBHaXQuXG4gKiBAcmVtYXJrc1xuICogLSBJZiB0aGUgYGZpbGVzYCBhcnJheSBpcyBlbXB0eSwgdGhlIGZ1bmN0aW9uIGxvZ3MgYSBtZXNzYWdlIGFuZCByZXR1cm5zIHdpdGhvdXQgcGVyZm9ybWluZyBhbnkgYWN0aW9uLlxuICogLSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBleGVjdXRpb24gb2YgdGhlIGBnaXQgYWRkYCBjb21tYW5kLCB0aGUgZXJyb3IgaXMgbG9nZ2VkIGFuZCB0aGUgcHJvY2VzcyBleGl0cyB3aXRoIGNvZGUgMS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gYWRkRmlsZXNUb0dpdChmaWxlcz86IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPjtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUUsZ0JBQUE7Q0FBQTtPQUFBLENBQUEsUUFBQTtDQUFBLENBQUEsSUFBQSxHQUFBO0NBQUEifQ==