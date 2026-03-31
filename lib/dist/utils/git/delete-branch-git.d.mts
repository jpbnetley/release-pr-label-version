//#region src/utils/git/delete-branch-git.d.ts
/**
 * Deletes a local Git branch with the specified name.
 *
 * Executes the `git branch -d <branchName>` command to delete the branch.
 * If the branch cannot be deleted (e.g., it is not fully merged), the promise is rejected with an error message.
 *
 * @param branchName - The name of the local Git branch to delete.
 * @returns A promise that resolves when the branch is successfully deleted, or rejects with an error message if the deletion fails.
 */
declare function deleteGitBranch(branchName: string): Promise<void>;
//#endregion
export { deleteGitBranch };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWJyYW5jaC1naXQuZC5tdHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9kZWxldGUtYnJhbmNoLWdpdC5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVsZXRlcyBhIGxvY2FsIEdpdCBicmFuY2ggd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXG4gKlxuICogRXhlY3V0ZXMgdGhlIGBnaXQgYnJhbmNoIC1kIDxicmFuY2hOYW1lPmAgY29tbWFuZCB0byBkZWxldGUgdGhlIGJyYW5jaC5cbiAqIElmIHRoZSBicmFuY2ggY2Fubm90IGJlIGRlbGV0ZWQgKGUuZy4sIGl0IGlzIG5vdCBmdWxseSBtZXJnZWQpLCB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIGJyYW5jaE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbG9jYWwgR2l0IGJyYW5jaCB0byBkZWxldGUuXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBicmFuY2ggaXMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQsIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZSBkZWxldGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZGVsZXRlR2l0QnJhbmNoKGJyYW5jaE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4iXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFFLGtCQUFBO0NBQUE7T0FBQSxDQUFBLFFBQUE7Q0FBQSxDQUFBLElBQUEsR0FBQTtDQUFBIn0=