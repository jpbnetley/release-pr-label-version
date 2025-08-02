//#region src/types/enums/release-label-name.d.ts
declare enum ReleaseLabelName {
  VersionRequired = "release:version-required",
  VersionPatch = "release:version-patch",
  VersionMinor = "release:version-minor",
  VersionMajor = "release:version-major",
  VersionSkip = "release:version-skip",
  VersionBump = "release:version-bump",
  VersionPreRelease = "release:version-pre",
}
//#endregion
export { ReleaseLabelName };