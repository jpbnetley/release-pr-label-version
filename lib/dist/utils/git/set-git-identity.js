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
			exec(`git config user.email "${email}"`, (error$1) => {
				if (error$1) {
					reject(`Error setting Git user email: ${error$1}`);
					return;
				}
				resolve();
			});
		});
	});
}

//#endregion
export { setGitIdentity };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWdpdC1pZGVudGl0eS5qcyIsIm5hbWVzIjpbImVycm9yIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dpdC9zZXQtZ2l0LWlkZW50aXR5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5cbmV4cG9ydCB0eXBlIFNldEdpdElkZW50aXR5UGFyYW1zID0ge1xuICBuYW1lPzogc3RyaW5nXG4gIGVtYWlsPzogc3RyaW5nXG59XG5cbi8qKlxuICogU2V0cyB0aGUgR2l0IHVzZXIgaWRlbnRpdHkgKG5hbWUgYW5kIGVtYWlsKSBmb3IgdGhlIGN1cnJlbnQgcmVwb3NpdG9yeS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGBnaXQgY29uZmlnIHVzZXIubmFtZWAgYW5kIGBnaXQgY29uZmlnIHVzZXIuZW1haWxgXG4gKiBjb21tYW5kcyB0byBjb25maWd1cmUgdGhlIEdpdCB1c2VyIGlkZW50aXR5LiBJdCByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzXG4gKiB3aGVuIGJvdGggY29tbWFuZHMgY29tcGxldGUgc3VjY2Vzc2Z1bGx5LCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZlxuICogZWl0aGVyIGNvbW1hbmQgZmFpbHMuXG4gKlxuICogQHBhcmFtIG5hbWUgLSBUaGUgR2l0IHVzZXIgbmFtZSB0byBzZXQuXG4gKiBAcGFyYW0gZW1haWwgLSBUaGUgR2l0IHVzZXIgZW1haWwgdG8gc2V0LlxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgR2l0IGlkZW50aXR5IGlzIHNldCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRHaXRJZGVudGl0eSh7XG4gIG5hbWUgPSAnR2l0SHViIEFjdGlvbicsXG4gIGVtYWlsID0gJ2FjdGlvbkBnaXRodWIuY29tJyxcbn06IFNldEdpdElkZW50aXR5UGFyYW1zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKGBnaXQgY29uZmlnIHVzZXIubmFtZSBcIiR7bmFtZX1cImAsIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChgRXJyb3Igc2V0dGluZyBHaXQgdXNlciBuYW1lOiAke2Vycm9yfWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBleGVjKGBnaXQgY29uZmlnIHVzZXIuZW1haWwgXCIke2VtYWlsfVwiYCwgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChgRXJyb3Igc2V0dGluZyBHaXQgdXNlciBlbWFpbDogJHtlcnJvcn1gKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxTQUFnQixlQUFlLEVBQzdCLE9BQU8saUJBQ1AsUUFBUSxxQkFDYSxHQUFHLEVBQUUsRUFBaUI7QUFDM0MsUUFBTyxJQUFJLFNBQVMsU0FBUyxXQUFXO0FBQ3RDLE9BQUsseUJBQXlCLEtBQUssS0FBSyxVQUFVO0FBQ2hELE9BQUksT0FBTztBQUNULFdBQU8sZ0NBQWdDO0FBQ3ZDO0dBQ0Q7QUFFRCxRQUFLLDBCQUEwQixNQUFNLEtBQUssWUFBVTtBQUNsRCxRQUFJQSxTQUFPO0FBQ1QsWUFBTyxpQ0FBaUNBO0FBQ3hDO0lBQ0Q7QUFFRDtHQUNEO0VBQ0Y7Q0FDRjtBQUNGIn0=