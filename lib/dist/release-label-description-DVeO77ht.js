//#region src/types/enums/release-label-description.ts
let ReleaseLabelDescription = /* @__PURE__ */ function(ReleaseLabelDescription$1) {
	ReleaseLabelDescription$1["VersionRequired"] = "This PR requires a version bump label";
	ReleaseLabelDescription$1["VersionPatch"] = "Patch version release";
	ReleaseLabelDescription$1["VersionMinor"] = "Minor version release";
	ReleaseLabelDescription$1["VersionMajor"] = "Major version release";
	ReleaseLabelDescription$1["VersionSkip"] = "Skip version release";
	return ReleaseLabelDescription$1;
}({});

//#endregion
export { ReleaseLabelDescription };