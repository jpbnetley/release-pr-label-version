//#region src/utils/git/push-git.d.ts
type GitPushParams = {
  owner: string;
  repo: string;
  branchName: string;
  commitMessage?: string;
};
/**
 * Returns an async function to push changes to a specified branch in a GitHub repository using Octokit.
 *
 * @param octokit - An authenticated Octokit instance for GitHub API requests.
 * @returns An async function that pushes changes to a branch.
 *
 * The returned function parameters:
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param branchName - The name of the branch to push changes to.
 * @param commitMessage - (Optional) The commit SHA to update the branch reference to. Defaults to 'Update branch'.
 * @returns The response data from the GitHub API after updating the reference, or undefined if an error occurs.
 *
 * @remarks
 * The `commitMessage` parameter is used as the SHA for the updateRef call, which should be the commit SHA you want the branch to point to.
 * If an error occurs during the push, the function will call `setFailed` with an appropriate error message.
 */
declare function gitPush(branchName: string): Promise<void>;
//#endregion
export { GitPushParams, gitPush };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1naXQuZC50cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L3B1c2gtZ2l0LmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgR2l0UHVzaFBhcmFtcyA9IHtcbiAgICBvd25lcjogc3RyaW5nO1xuICAgIHJlcG86IHN0cmluZztcbiAgICBicmFuY2hOYW1lOiBzdHJpbmc7XG4gICAgY29tbWl0TWVzc2FnZT86IHN0cmluZztcbn07XG4vKipcbiAqIFJldHVybnMgYW4gYXN5bmMgZnVuY3Rpb24gdG8gcHVzaCBjaGFuZ2VzIHRvIGEgc3BlY2lmaWVkIGJyYW5jaCBpbiBhIEdpdEh1YiByZXBvc2l0b3J5IHVzaW5nIE9jdG9raXQuXG4gKlxuICogQHBhcmFtIG9jdG9raXQgLSBBbiBhdXRoZW50aWNhdGVkIE9jdG9raXQgaW5zdGFuY2UgZm9yIEdpdEh1YiBBUEkgcmVxdWVzdHMuXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IHB1c2hlcyBjaGFuZ2VzIHRvIGEgYnJhbmNoLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBwYXJhbWV0ZXJzOlxuICogQHBhcmFtIG93bmVyIC0gVGhlIG93bmVyIG9mIHRoZSByZXBvc2l0b3J5LlxuICogQHBhcmFtIHJlcG8gLSBUaGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAqIEBwYXJhbSBicmFuY2hOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGJyYW5jaCB0byBwdXNoIGNoYW5nZXMgdG8uXG4gKiBAcGFyYW0gY29tbWl0TWVzc2FnZSAtIChPcHRpb25hbCkgVGhlIGNvbW1pdCBTSEEgdG8gdXBkYXRlIHRoZSBicmFuY2ggcmVmZXJlbmNlIHRvLiBEZWZhdWx0cyB0byAnVXBkYXRlIGJyYW5jaCcuXG4gKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgZGF0YSBmcm9tIHRoZSBHaXRIdWIgQVBJIGFmdGVyIHVwZGF0aW5nIHRoZSByZWZlcmVuY2UsIG9yIHVuZGVmaW5lZCBpZiBhbiBlcnJvciBvY2N1cnMuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoZSBgY29tbWl0TWVzc2FnZWAgcGFyYW1ldGVyIGlzIHVzZWQgYXMgdGhlIFNIQSBmb3IgdGhlIHVwZGF0ZVJlZiBjYWxsLCB3aGljaCBzaG91bGQgYmUgdGhlIGNvbW1pdCBTSEEgeW91IHdhbnQgdGhlIGJyYW5jaCB0byBwb2ludCB0by5cbiAqIElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHB1c2gsIHRoZSBmdW5jdGlvbiB3aWxsIGNhbGwgYHNldEZhaWxlZGAgd2l0aCBhbiBhcHByb3ByaWF0ZSBlcnJvciBtZXNzYWdlLlxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBnaXRQdXNoKGJyYW5jaE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4iXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFXLGdCQUFnQixDQUFDLEdBQUE7QUFDNUIsSUFBVyxVQUFNLENBQUEsVUFBQSxRQUFBIn0=