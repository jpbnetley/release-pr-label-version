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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWdpdC1pZGVudGl0eS5kLm10cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZ2l0L3NldC1naXQtaWRlbnRpdHkudHMiXSwibWFwcGluZ3MiOiI7S0FFWSxvQkFBQTtFQUNWLElBQUE7RUFDQSxLQUFBO0FBQUE7OztBQWVGOzs7Ozs7Ozs7O2lCQUFnQixjQUFBLENBQUE7RUFDZCxJQUFBO0VBQ0E7QUFBQSxJQUNDLG9CQUFBLEdBQTRCLE9BQUEifQ==