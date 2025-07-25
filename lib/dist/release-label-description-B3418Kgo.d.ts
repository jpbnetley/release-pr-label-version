//#region src/types/enums/release-label-description.d.ts
declare enum ReleaseLabelDescription {
  VersionRequired = "This PR requires a version bump label",
  VersionPatch = "Patch version release",
  VersionMinor = "Minor version release",
  VersionMajor = "Major version release",
  VersionSkip = "Skip version release",
}
//#endregion
export { ReleaseLabelDescription };