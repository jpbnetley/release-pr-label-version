import { ReleaseLabelColors } from "../enums/release-label-colors.mjs";
import { ReleaseLabelDescription } from "../enums/release-label-description.mjs";
import { ReleaseLabelName } from "../enums/release-label-name.mjs";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsZWFzZS1sYWJlbC5kLm10cyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHlwZXMvbW9kZWxzL3JlbGVhc2UtbGFiZWwudHMiXSwibWFwcGluZ3MiOiI7Ozs7O2NBSWEsWUFBQTtFQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQ0QsWUFBQSxXQUF1QixZQUFBLGVBQTJCLFlBQUE7QUFBQSxLQUVsRCxlQUFBLGdCQUErQixZQUFBIn0=