import { ReleaseLabelColors } from "../../release-label-colors-CKkBz3bC.js";
import { ReleaseLabelDescription } from "../../release-label-description-DVeO77ht.js";
import { ReleaseLabelName } from "../../release-label-name-TvFhOOYG.js";

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
	}
};

//#endregion
export { ReleaseLabel };