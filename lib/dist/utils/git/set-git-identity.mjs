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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWdpdC1pZGVudGl0eS5tanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9zZXQtZ2l0LWlkZW50aXR5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG5leHBvcnQgdHlwZSBTZXRHaXRJZGVudGl0eVBhcmFtcyA9IHtcbiAgbmFtZT86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIEdpdCB1c2VyIGlkZW50aXR5IChuYW1lIGFuZCBlbWFpbCkgZm9yIHRoZSBjdXJyZW50IHJlcG9zaXRvcnkuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBleGVjdXRlcyBgZ2l0IGNvbmZpZyB1c2VyLm5hbWVgIGFuZCBgZ2l0IGNvbmZpZyB1c2VyLmVtYWlsYFxuICogY29tbWFuZHMgdG8gY29uZmlndXJlIHRoZSBHaXQgdXNlciBpZGVudGl0eS4gSXQgcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlc1xuICogd2hlbiBib3RoIGNvbW1hbmRzIGNvbXBsZXRlIHN1Y2Nlc3NmdWxseSwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaWZcbiAqIGVpdGhlciBjb21tYW5kIGZhaWxzLlxuICpcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIEdpdCB1c2VyIG5hbWUgdG8gc2V0LlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIEdpdCB1c2VyIGVtYWlsIHRvIHNldC5cbiAqIEByZXR1cm5zIEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIEdpdCBpZGVudGl0eSBpcyBzZXQsIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvciBtZXNzYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0R2l0SWRlbnRpdHkoe1xuICBuYW1lID0gJ0dpdEh1YiBBY3Rpb24nLFxuICBlbWFpbCA9ICdhY3Rpb25AZ2l0aHViLmNvbSdcbn06IFNldEdpdElkZW50aXR5UGFyYW1zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKGBnaXQgY29uZmlnIHVzZXIubmFtZSBcIiR7bmFtZX1cImAsIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZWplY3QoYEVycm9yIHNldHRpbmcgR2l0IHVzZXIgbmFtZTogJHtlcnJvcn1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBleGVjKGBnaXQgY29uZmlnIHVzZXIuZW1haWwgXCIke2VtYWlsfVwiYCwgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoYEVycm9yIHNldHRpbmcgR2l0IHVzZXIgZW1haWw6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQW1CQSxTQUFnQixlQUFlLEVBQzdCLE9BQU8saUJBQ1AsUUFBUSx3QkFDZ0IsRUFBRSxFQUFpQjtBQUMzQyxRQUFPLElBQUksU0FBUyxTQUFTLFdBQVc7QUFDdEMsT0FBSyx5QkFBeUIsS0FBSyxLQUFJLFVBQVM7QUFDOUMsT0FBSSxPQUFPO0FBQ1QsV0FBTyxnQ0FBZ0MsUUFBUTtBQUMvQzs7QUFHRixRQUFLLDBCQUEwQixNQUFNLEtBQUksVUFBUztBQUNoRCxRQUFJLE9BQU87QUFDVCxZQUFPLGlDQUFpQyxRQUFRO0FBQ2hEOztBQUdGLGFBQVM7S0FDVDtJQUNGO0dBQ0YifQ==