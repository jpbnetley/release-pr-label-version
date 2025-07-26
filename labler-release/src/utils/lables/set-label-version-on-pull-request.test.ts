import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setLabelVersionOnPullRequest } from './set-label-version-on-pull-request.js'
import {
  ReleaseLabel,
  ReleaseLabelKey,
} from 'lib/types/models/release-label.js'
import { setFailed } from '@actions/core'

// Mock @actions/core
vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
}))

// Helper to create a mock Octokit
function createMockOctokit() {
  return {
    rest: {
      issues: {
        addLabels: vi.fn(),
      },
    },
  }
}

describe('setLabelVersionOnPullRequest', () => {
  const owner = 'test-owner'
  const repo = 'test-repo'
  const pullNumber = 123
  const versionType: ReleaseLabelKey = 'VersionMajor'

  let octokit: any

  beforeEach(() => {
    octokit = createMockOctokit()
    vi.clearAllMocks()
  })

  it('should call addLabels with correct parameters', async () => {
    const label = ReleaseLabel[versionType]
    const fn = setLabelVersionOnPullRequest(octokit)
    await fn(owner, repo, pullNumber, versionType)
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner,
      repo,
      issue_number: pullNumber,
      labels: [label.name],
    })
  })

  it('should log success message', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const label = ReleaseLabel[versionType]
    const fn = setLabelVersionOnPullRequest(octokit)
    await fn(owner, repo, pullNumber, versionType)
    expect(consoleSpy).toHaveBeenCalledWith(
      `Label ${label.name} added to pull request #${pullNumber}`
    )
    consoleSpy.mockRestore()
  })

  it('should call setFailed with error message if addLabels throws Error', async () => {
    const error = new Error('API error')
    octokit.rest.issues.addLabels.mockRejectedValueOnce(error)
    const fn = setLabelVersionOnPullRequest(octokit)
    await fn(owner, repo, pullNumber, versionType)
    expect(setFailed).toHaveBeenCalledWith(
      `Failed to set label on pull request: ${error.message}`
    )
  })

  it('should call setFailed with unknown error if addLabels throws non-Error', async () => {
    octokit.rest.issues.addLabels.mockRejectedValueOnce('some error')
    const fn = setLabelVersionOnPullRequest(octokit)
    await fn(owner, repo, pullNumber, versionType)
    expect(setFailed).toHaveBeenCalledWith(
      'Failed to set label on pull request: Unknown error'
    )
  })
})
