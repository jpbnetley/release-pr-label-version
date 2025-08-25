//#region src/types/enums/release-label-description.ts
let ReleaseLabelDescription = /* @__PURE__ */ function(ReleaseLabelDescription$1) {
	ReleaseLabelDescription$1["VersionRequired"] = "This PR requires a version bump label";
	ReleaseLabelDescription$1["VersionPatch"] = "Patch version release";
	ReleaseLabelDescription$1["VersionMinor"] = "Minor version release";
	ReleaseLabelDescription$1["VersionMajor"] = "Major version release";
	ReleaseLabelDescription$1["VersionSkip"] = "Skip version release";
	ReleaseLabelDescription$1["VersionBump"] = "Bump version: Used when a pr contains the new version to be merged into the release branch";
	ReleaseLabelDescription$1["VersionPreRelease"] = "Pre-release version release";
	return ReleaseLabelDescription$1;
}({});

//#endregion
export { ReleaseLabelDescription };