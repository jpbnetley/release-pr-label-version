import { info, setFailed } from '@actions/core'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.js'
import { executeBuildScript } from './execute-build-script.js'

export type ExecuteReleaseScriptParams = {
  labels: string[]
  preReleaseScript?: string
  patchReleaseScript?: string
  minorReleaseScript?: string
  majorReleaseScript?: string
}

/**
 * Executes the appropriate release script based on the provided release labels.
 *
 * The function checks the `labels` array for specific release label names
 * (pre-release, patch, minor, major) and executes the corresponding script if provided.
 * If a pre-release label is present but no pre-release script is provided, the function
 * will mark the operation as failed.
 *
 * @param params - An object containing:
 *   - `labels`: An array of release label names to determine which script to execute.
 *   - `majorReleaseScript`: The script to execute for a major release.
 *   - `minorReleaseScript`: The script to execute for a minor release.
 *   - `patchReleaseScript`: The script to execute for a patch release.
 *   - `preReleaseScript`: The script to execute for a pre-release.
 *
 * @remarks
 * The function executes only one script per invocation, prioritizing pre-release,
 * then patch, minor, and finally major, based on the order of checks.
 *
 * @returns A promise that resolves when the appropriate script has been executed.
 */
export async function executeReleaseScript({
  labels,
  majorReleaseScript,
  minorReleaseScript,
  patchReleaseScript,
  preReleaseScript,
}: ExecuteReleaseScriptParams) {
  if (labels.includes(ReleaseLabelName.VersionPreRelease)) {
    if (!preReleaseScript) {
      setFailed('Pre-release script is not provided')
      return
    }
    const response = await executeBuildScript(preReleaseScript)
    info(`Pre-release script executed with response: ${response}`)
  } else if (
    labels.includes(ReleaseLabelName.VersionPatch) &&
    patchReleaseScript
  ) {
    const response = await executeBuildScript(patchReleaseScript)
    info(`Patch release script executed with response: ${response}`)
  } else if (
    labels.includes(ReleaseLabelName.VersionMinor) &&
    minorReleaseScript
  ) {
    const response = await executeBuildScript(minorReleaseScript)
    info(`Minor release script executed with response: ${response}`)
  } else if (
    labels.includes(ReleaseLabelName.VersionMajor) &&
    majorReleaseScript
  ) {
    const response = await executeBuildScript(majorReleaseScript)
    info(`Major release script executed with response: ${response}`)
  }
}
