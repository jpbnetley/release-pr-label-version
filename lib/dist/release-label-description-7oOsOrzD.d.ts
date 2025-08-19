//#region src/types/enums/release-label-description.d.ts
declare enum ReleaseLabelDescription {
  VersionRequired = "This PR requires a version bump label",
  VersionPatch = "Patch version release",
  VersionMinor = "Minor version release",
  VersionMajor = "Major version release",
  VersionSkip = "Skip version release",
  VersionBump = "Bump version: Used when a pr contains the new version to be merged into the release branch",
  VersionPreRelease = "Pre-release version release",
}
//#endregion
export { ReleaseLabelDescription };