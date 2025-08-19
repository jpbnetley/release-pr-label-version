import { ReleaseLabelColors } from "../../release-label-colors-DVKBoOEo.js";
import { ReleaseLabelDescription } from "../../release-label-description-BdwNfaWk.js";
import { ReleaseLabelName } from "../../release-label-name-BCtlmcDc.js";

//#region src/types/models/release-label.ts
const ReleaseLabel = {
	VersionRequired: {
		name: ReleaseLabelName.VersionRequired,
		description: ReleaseLabelDescription.VersionRequired,
		color: ReleaseLabelColors.VersionRequired
	},
	VersionPatch: {
		name: ReleaseLabelName.VersionPatch,
		description: ReleaseLabelDescription.VersionPatch,
		color: ReleaseLabelColors.VersionPatch
	},
	VersionMinor: {
		name: ReleaseLabelName.VersionMinor,
		description: ReleaseLabelDescription.VersionMinor,
		color: ReleaseLabelColors.VersionMinor
	},
	VersionMajor: {
		name: ReleaseLabelName.VersionMajor,
		description: ReleaseLabelDescription.VersionMajor,
		color: ReleaseLabelColors.VersionMajor
	},
	VersionSkip: {
		name: ReleaseLabelName.VersionSkip,
		description: ReleaseLabelDescription.VersionSkip,
		color: ReleaseLabelColors.VersionSkip
	},
	VersionBump: {
		name: ReleaseLabelName.VersionBump,
		description: ReleaseLabelDescription.VersionBump,
		color: ReleaseLabelColors.VersionBump
	},
	VersionPreRelease: {
		name: ReleaseLabelName.VersionPreRelease,
		describe: ReleaseLabelDescription.VersionPreRelease,
		color: ReleaseLabelColors.VersionPreRelease
	}
};

//#endregion
export { ReleaseLabel };