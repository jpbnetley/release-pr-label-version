import { exec } from "node:child_process";

//#region src/utils/git/checkout-branch-git.ts
/**
* Creates and checks out a new Git branch from the specified base branch.
*
* @param baseBranch - The name of the base branch to branch off from. Defaults to 'main'.
* @returns A promise that resolves when the branch has been successfully checked out, or rejects with an error message if the operation fails.
*/
function checkoutBranch(baseBranch) {
	return new Promise((resolve, reject) => {
		exec(`git checkout -b ${baseBranch}`, (error) => {
			if (error) return reject(`Error checking out branch: ${error.message}`);
			resolve();
		});
	});
}

//#endregion
export { checkoutBranch };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYnJhbmNoLWdpdC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L2NoZWNrb3V0LWJyYW5jaC1naXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBjaGVja3Mgb3V0IGEgbmV3IEdpdCBicmFuY2ggZnJvbSB0aGUgc3BlY2lmaWVkIGJhc2UgYnJhbmNoLlxuICpcbiAqIEBwYXJhbSBiYXNlQnJhbmNoIC0gVGhlIG5hbWUgb2YgdGhlIGJhc2UgYnJhbmNoIHRvIGJyYW5jaCBvZmYgZnJvbS4gRGVmYXVsdHMgdG8gJ21haW4nLlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYnJhbmNoIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjaGVja2VkIG91dCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIG9wZXJhdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrb3V0QnJhbmNoKGJhc2VCcmFuY2g6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGV4ZWMoYGdpdCBjaGVja291dCAtYiAke2Jhc2VCcmFuY2h9YCwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChgRXJyb3IgY2hlY2tpbmcgb3V0IGJyYW5jaDogJHtlcnJvci5tZXNzYWdlfWApXG4gICAgICB9XG4gICAgICByZXNvbHZlKClcbiAgICB9KVxuICB9KVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFRQSxTQUFnQixlQUFlLFlBQW1DO0FBQ2hFLFFBQU8sSUFBSSxTQUFlLFNBQVMsV0FBVztBQUM1QyxPQUFLLG1CQUFtQixlQUFlLFVBQVU7QUFDL0MsT0FBSSxNQUNGLFFBQU8sT0FBTyw4QkFBOEIsTUFBTTtBQUVwRDtFQUNEO0NBQ0Y7QUFDRiJ9