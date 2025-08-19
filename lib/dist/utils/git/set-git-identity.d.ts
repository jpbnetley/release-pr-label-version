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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWdpdC1pZGVudGl0eS5kLnRzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvc2V0LWdpdC1pZGVudGl0eS5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIFNldEdpdElkZW50aXR5UGFyYW1zID0ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZW1haWw/OiBzdHJpbmc7XG59O1xuLyoqXG4gKiBTZXRzIHRoZSBHaXQgdXNlciBpZGVudGl0eSAobmFtZSBhbmQgZW1haWwpIGZvciB0aGUgY3VycmVudCByZXBvc2l0b3J5LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgYGdpdCBjb25maWcgdXNlci5uYW1lYCBhbmQgYGdpdCBjb25maWcgdXNlci5lbWFpbGBcbiAqIGNvbW1hbmRzIHRvIGNvbmZpZ3VyZSB0aGUgR2l0IHVzZXIgaWRlbnRpdHkuIEl0IHJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXNcbiAqIHdoZW4gYm90aCBjb21tYW5kcyBjb21wbGV0ZSBzdWNjZXNzZnVsbHksIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGlmXG4gKiBlaXRoZXIgY29tbWFuZCBmYWlscy5cbiAqXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBHaXQgdXNlciBuYW1lIHRvIHNldC5cbiAqIEBwYXJhbSBlbWFpbCAtIFRoZSBHaXQgdXNlciBlbWFpbCB0byBzZXQuXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBHaXQgaWRlbnRpdHkgaXMgc2V0LCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IgbWVzc2FnZS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gc2V0R2l0SWRlbnRpdHkoeyBuYW1lLCBlbWFpbCwgfT86IFNldEdpdElkZW50aXR5UGFyYW1zKTogUHJvbWlzZTx2b2lkPjtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVcsdUJBQXVCLENBQUMsR0FBQTtBQUNuQyxJQUFXLGlCQUFNO0NBQUE7T0FBQTtPQUFBO09BQUE7T0FBQTtDQUFBIn0=