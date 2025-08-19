import { getOctokit } from "@actions/github";

//#region src/types/models/github/octokit.d.ts
type Octokit = ReturnType<typeof getOctokit>;
//#endregion
export { Octokit };