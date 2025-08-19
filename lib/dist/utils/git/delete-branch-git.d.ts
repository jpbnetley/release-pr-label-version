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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWJyYW5jaC1naXQuZC50cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2RlbGV0ZS1icmFuY2gtZ2l0LmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEZWxldGVzIGEgbG9jYWwgR2l0IGJyYW5jaCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS5cbiAqXG4gKiBFeGVjdXRlcyB0aGUgYGdpdCBicmFuY2ggLWQgPGJyYW5jaE5hbWU+YCBjb21tYW5kIHRvIGRlbGV0ZSB0aGUgYnJhbmNoLlxuICogSWYgdGhlIGJyYW5jaCBjYW5ub3QgYmUgZGVsZXRlZCAoZS5nLiwgaXQgaXMgbm90IGZ1bGx5IG1lcmdlZCksIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggYW4gZXJyb3IgbWVzc2FnZS5cbiAqXG4gKiBAcGFyYW0gYnJhbmNoTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBsb2NhbCBHaXQgYnJhbmNoIHRvIGRlbGV0ZS5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGJyYW5jaCBpcyBzdWNjZXNzZnVsbHkgZGVsZXRlZCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIGRlbGV0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBkZWxldGVHaXRCcmFuY2goYnJhbmNoTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUUsa0JBQUEsQ0FBQSxVQUFBLFFBQUEifQ==