import { exec } from "node:child_process";
//#region src/utils/git/set-git-identity.ts
/**
* Sets the Git user identity (name and email) for the current repository.
*
* This function executes `git config user.name` and `git config user.email`
* commands to configure the Git user identity. It returns a Promise that resolves
* when both commands complete successfully, or rejects with an error message if
* either command fails.
*
* @param name - The Git user name to set.
* @param email - The Git user email to set.
* @returns A Promise that resolves when the Git identity is set, or rejects with an error message.
*/
function setGitIdentity({ name = "GitHub Action", email = "action@github.com" } = {}) {
	return new Promise((resolve, reject) => {
		exec(`git config user.name "${name}"`, (error) => {
			if (error) {
				reject(`Error setting Git user name: ${error}`);
				return;
			}
			exec(`git config user.email "${email}"`, (error) => {
				if (error) {
					reject(`Error setting Git user email: ${error}`);
					return;
				}
				resolve();
			});
		});
	});
}
//#endregion
export { setGitIdentity };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWdpdC1pZGVudGl0eS5tanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9zZXQtZ2l0LWlkZW50aXR5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG5leHBvcnQgdHlwZSBTZXRHaXRJZGVudGl0eVBhcmFtcyA9IHtcbiAgbmFtZT86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIEdpdCB1c2VyIGlkZW50aXR5IChuYW1lIGFuZCBlbWFpbCkgZm9yIHRoZSBjdXJyZW50IHJlcG9zaXRvcnkuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBleGVjdXRlcyBgZ2l0IGNvbmZpZyB1c2VyLm5hbWVgIGFuZCBgZ2l0IGNvbmZpZyB1c2VyLmVtYWlsYFxuICogY29tbWFuZHMgdG8gY29uZmlndXJlIHRoZSBHaXQgdXNlciBpZGVudGl0eS4gSXQgcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlc1xuICogd2hlbiBib3RoIGNvbW1hbmRzIGNvbXBsZXRlIHN1Y2Nlc3NmdWxseSwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaWZcbiAqIGVpdGhlciBjb21tYW5kIGZhaWxzLlxuICpcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIEdpdCB1c2VyIG5hbWUgdG8gc2V0LlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIEdpdCB1c2VyIGVtYWlsIHRvIHNldC5cbiAqIEByZXR1cm5zIEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIEdpdCBpZGVudGl0eSBpcyBzZXQsIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvciBtZXNzYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0R2l0SWRlbnRpdHkoe1xuICBuYW1lID0gJ0dpdEh1YiBBY3Rpb24nLFxuICBlbWFpbCA9ICdhY3Rpb25AZ2l0aHViLmNvbScsXG59OiBTZXRHaXRJZGVudGl0eVBhcmFtcyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYyhgZ2l0IGNvbmZpZyB1c2VyLm5hbWUgXCIke25hbWV9XCJgLCBlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGBFcnJvciBzZXR0aW5nIEdpdCB1c2VyIG5hbWU6ICR7ZXJyb3J9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXhlYyhgZ2l0IGNvbmZpZyB1c2VyLmVtYWlsIFwiJHtlbWFpbH1cImAsIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGBFcnJvciBzZXR0aW5nIEdpdCB1c2VyIGVtYWlsOiAke2Vycm9yfWApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsU0FBZ0IsZUFBZSxFQUM3QixPQUFPLGlCQUNQLFFBQVEsd0JBQ2dCLEVBQUUsRUFBaUI7QUFDM0MsUUFBTyxJQUFJLFNBQVMsU0FBUyxXQUFXO0FBQ3RDLE9BQUsseUJBQXlCLEtBQUssS0FBSSxVQUFTO0FBQzlDLE9BQUksT0FBTztBQUNULFdBQU8sZ0NBQWdDLFFBQVE7QUFDL0M7O0FBR0YsUUFBSywwQkFBMEIsTUFBTSxLQUFJLFVBQVM7QUFDaEQsUUFBSSxPQUFPO0FBQ1QsWUFBTyxpQ0FBaUMsUUFBUTtBQUNoRDs7QUFHRixhQUFTO0tBQ1Q7SUFDRjtHQUNGIn0=