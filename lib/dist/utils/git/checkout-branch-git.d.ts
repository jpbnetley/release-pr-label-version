//#region src/utils/git/checkout-branch-git.d.ts
/**
 * Creates and checks out a new Git branch from the specified base branch.
 *
 * @param baseBranch - The name of the base branch to branch off from. Defaults to 'main'.
 * @returns A promise that resolves when the branch has been successfully checked out, or rejects with an error message if the operation fails.
 */
declare function checkoutBranch(baseBranch: string): Promise<void>;
//#endregion
export { checkoutBranch };