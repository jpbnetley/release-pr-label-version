import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setLabelForPullRequest } from './set-label-for-pull-request.js'
import { ReleaseLabelName } from 'lib/types/enums/release-label-name.js'
import { setFailed, info } from '@actions/core'
import { context } from '@actions/github'

// Mocks
vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
  info: vi.fn(),
}))
vi.mock('@actions/github', () => ({
  context: {
    payload: { pull_request: { number: 123 } },
    repo: { owner: 'test-owner', repo: 'test-repo' },
  },
}))

function getOctokitMock(labels: string[] = []): any {
  return {
    rest: {
      issues: {
        listLabelsOnIssue: vi.fn().mockResolvedValue({
          data: labels.map((name) => ({ name })),
        }),
        addLabels: vi.fn().mockResolvedValue({}),
        removeLabel: vi.fn().mockResolvedValue({}),
      },
    },
  }
}

describe('setLabelForPullRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset context for each test
    context.payload.pull_request = { number: 123 }
    context.repo.owner = 'test-owner'
    context.repo.repo = 'test-repo'
  })

  it('calls setFailed if no pull request number is found', async () => {
    context.payload.pull_request = undefined
    const octokit = getOctokitMock()
    await setLabelForPullRequest(octokit)()
    expect(setFailed).toHaveBeenCalledWith(
      'No pull request number found in context'
    )
  })

  it('adds version-required label and fails if no version label is present', async () => {
    const octokit = getOctokitMock(['other-label'])
    await setLabelForPullRequest(octokit)()
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      issue_number: 123,
      labels: ['release:version-required'],
    })
    expect(info).toHaveBeenCalledWith(
      "Added 'release:version-required' label to PR #123"
    )
    expect(setFailed).toHaveBeenCalledWith('PR #123 is missing a version label')
  })

  it('removes version-required label if a version label is present', async () => {
    const octokit = getOctokitMock([
      ReleaseLabelName.VersionPatch,
      ReleaseLabelName.VersionRequired,
    ])
    await setLabelForPullRequest(octokit)()
    expect(info).toHaveBeenCalledWith(
      'Version label already present in PR #123'
    )
    expect(info).toHaveBeenCalledWith(
      `Removing ${ReleaseLabelName.VersionRequired} label for PR #123`
    )
    expect(octokit.rest.issues.removeLabel).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      issue_number: 123,
      name: ReleaseLabelName.VersionRequired,
    })
    expect(info).toHaveBeenCalledWith(
      `Removed ${ReleaseLabelName.VersionRequired} label from PR #123`
    )
    expect(setFailed).not.toHaveBeenCalled()
  })

  it('does nothing if a version label is present and version-required is not present', async () => {
    const octokit = getOctokitMock([ReleaseLabelName.VersionMinor])
    await setLabelForPullRequest(octokit)()
    expect(info).toHaveBeenCalledWith(
      'Version label already present in PR #123'
    )
    expect(octokit.rest.issues.removeLabel).not.toHaveBeenCalled()
    expect(setFailed).not.toHaveBeenCalled()
  })

  it('handles errors thrown during label operations', async () => {
    const octokit = getOctokitMock([ReleaseLabelName.VersionPatch])
    octokit.rest.issues.listLabelsOnIssue = vi
      .fn()
      .mockRejectedValue(new Error('API error'))
    await setLabelForPullRequest(octokit)()
    expect(setFailed).toHaveBeenCalledWith(
      'Failed to set label for pull request: API error'
    )
  })

  it('handles unknown errors', async () => {
    const octokit = getOctokitMock([ReleaseLabelName.VersionPatch])
    octokit.rest.issues.listLabelsOnIssue = vi
      .fn()
      .mockRejectedValue('some string error')
    await setLabelForPullRequest(octokit)()
    expect(setFailed).toHaveBeenCalledWith(
      'Failed to set label for pull request: Unknown error'
    )
  })
})
