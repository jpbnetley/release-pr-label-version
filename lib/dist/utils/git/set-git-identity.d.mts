//#region src/utils/git/set-git-identity.d.ts
type SetGitIdentityParams = {
  name?: string;
  email?: string;
};
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
declare function setGitIdentity({
  name,
  email
}?: SetGitIdentityParams): Promise<void>;
//#endregion
export { SetGitIdentityParams, setGitIdentity };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWdpdC1pZGVudGl0eS5kLm10cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L3NldC1naXQtaWRlbnRpdHkuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBTZXRHaXRJZGVudGl0eVBhcmFtcyA9IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGVtYWlsPzogc3RyaW5nO1xufTtcbi8qKlxuICogU2V0cyB0aGUgR2l0IHVzZXIgaWRlbnRpdHkgKG5hbWUgYW5kIGVtYWlsKSBmb3IgdGhlIGN1cnJlbnQgcmVwb3NpdG9yeS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGBnaXQgY29uZmlnIHVzZXIubmFtZWAgYW5kIGBnaXQgY29uZmlnIHVzZXIuZW1haWxgXG4gKiBjb21tYW5kcyB0byBjb25maWd1cmUgdGhlIEdpdCB1c2VyIGlkZW50aXR5LiBJdCByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzXG4gKiB3aGVuIGJvdGggY29tbWFuZHMgY29tcGxldGUgc3VjY2Vzc2Z1bGx5LCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpZlxuICogZWl0aGVyIGNvbW1hbmQgZmFpbHMuXG4gKlxuICogQHBhcmFtIG5hbWUgLSBUaGUgR2l0IHVzZXIgbmFtZSB0byBzZXQuXG4gKiBAcGFyYW0gZW1haWwgLSBUaGUgR2l0IHVzZXIgZW1haWwgdG8gc2V0LlxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgR2l0IGlkZW50aXR5IGlzIHNldCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHNldEdpdElkZW50aXR5KHsgbmFtZSwgZW1haWwsIH0/OiBTZXRHaXRJZGVudGl0eVBhcmFtcyk6IFByb21pc2U8dm9pZD47XG4iXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFXLHVCQUF1QjtDQUFDO09BQUEsRUFBQTtDQUFBLENBQUEsSUFBQSxHQUFBO0NBQUE7QUFDbkMsSUFBVyxpQkFBTTtDQUFBO09BQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0NBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFBQTtDQUFBIn0=