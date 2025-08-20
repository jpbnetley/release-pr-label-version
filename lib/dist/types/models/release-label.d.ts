import { ReleaseLabelColors } from "../../release-label-colors-BPbNLS_Y.js";
import { ReleaseLabelDescription } from "../../release-label-description-7oOsOrzD.js";
import { ReleaseLabelName } from "../../release-label-name-D2doBU5r.js";

//#region src/types/models/release-label.d.ts
declare const ReleaseLabel: {
  readonly VersionRequired: {
    readonly name: ReleaseLabelName.VersionRequired;
    readonly description: ReleaseLabelDescription.VersionRequired;
    readonly color: ReleaseLabelColors.VersionRequired;
  };
  readonly VersionPatch: {
    readonly name: ReleaseLabelName.VersionPatch;
    readonly description: ReleaseLabelDescription.VersionPatch;
    readonly color: ReleaseLabelColors.VersionPatch;
  };
  readonly VersionMinor: {
    readonly name: ReleaseLabelName.VersionMinor;
    readonly description: ReleaseLabelDescription.VersionMinor;
    readonly color: ReleaseLabelColors.VersionMinor;
  };
  readonly VersionMajor: {
    readonly name: ReleaseLabelName.VersionMajor;
    readonly description: ReleaseLabelDescription.VersionMajor;
    readonly color: ReleaseLabelColors.VersionMajor;
  };
  readonly VersionSkip: {
    readonly name: ReleaseLabelName.VersionSkip;
    readonly description: ReleaseLabelDescription.VersionSkip;
    readonly color: ReleaseLabelColors.VersionSkip;
  };
  readonly VersionBump: {
    readonly name: ReleaseLabelName.VersionBump;
    readonly description: ReleaseLabelDescription.VersionBump;
    readonly color: ReleaseLabelColors.VersionBump;
  };
  readonly VersionPreRelease: {
    readonly name: ReleaseLabelName.VersionPreRelease;
    readonly describe: ReleaseLabelDescription.VersionPreRelease;
    readonly color: ReleaseLabelColors.VersionPreRelease;
  };
};
type ReleaseLabel = (typeof ReleaseLabel)[keyof typeof ReleaseLabel];
type ReleaseLabelKey = keyof typeof ReleaseLabel;
//#endregion
export { ReleaseLabel, ReleaseLabelKey };