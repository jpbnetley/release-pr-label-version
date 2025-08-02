import { ReleaseLabelColors } from '../enums/release-label-colors.js'
import { ReleaseLabelDescription } from '../enums/release-label-description.js'
import { ReleaseLabelName } from '../enums/release-label-name.js'

export const ReleaseLabel = {
  VersionRequired: {
    name: ReleaseLabelName.VersionRequired,
    description: ReleaseLabelDescription.VersionRequired,
    color: ReleaseLabelColors.VersionRequired,
  },
  VersionPatch: {
    name: ReleaseLabelName.VersionPatch,
    description: ReleaseLabelDescription.VersionPatch,
    color: ReleaseLabelColors.VersionPatch,
  },
  VersionMinor: {
    name: ReleaseLabelName.VersionMinor,
    description: ReleaseLabelDescription.VersionMinor,
    color: ReleaseLabelColors.VersionMinor,
  },
  VersionMajor: {
    name: ReleaseLabelName.VersionMajor,
    description: ReleaseLabelDescription.VersionMajor,
    color: ReleaseLabelColors.VersionMajor,
  },
  VersionSkip: {
    name: ReleaseLabelName.VersionSkip,
    description: ReleaseLabelDescription.VersionSkip,
    color: ReleaseLabelColors.VersionSkip,
  },
  VersionBump: {
    name: ReleaseLabelName.VersionBump,
    description: ReleaseLabelDescription.VersionBump,
    color: ReleaseLabelColors.VersionBump,
  },
} as const

export type ReleaseLabel = (typeof ReleaseLabel)[keyof typeof ReleaseLabel]

export type ReleaseLabelKey = keyof typeof ReleaseLabel
