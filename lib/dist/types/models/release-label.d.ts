import { ReleaseLabelColors } from "../../release-label-colors-BQM2AEr0.js";
import { ReleaseLabelDescription } from "../../release-label-description-B3418Kgo.js";
import { ReleaseLabelName } from "../../release-label-name-BuKbZC2X.js";

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
};
type ReleaseLabel = (typeof ReleaseLabel)[keyof typeof ReleaseLabel];
//#endregion
export { ReleaseLabel };