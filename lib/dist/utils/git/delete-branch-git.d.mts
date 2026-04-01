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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWJyYW5jaC1naXQuZC5tdHMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9kZWxldGUtYnJhbmNoLWdpdC50cyJdLCJtYXBwaW5ncyI6Ijs7QUFXQTs7Ozs7Ozs7aUJBQWdCLGVBQUEsQ0FBZ0IsVUFBQSxXQUFxQixPQUFBIn0=