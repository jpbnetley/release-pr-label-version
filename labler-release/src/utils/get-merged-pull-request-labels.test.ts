import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getMergedPullRequestLabels } from './get-merged-pull-request-labels.js'
import { setFailed } from '@actions/core'

vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
}))

describe('getMergedPullRequestLabels', () => {
  const owner = 'test-owner'
  const repo = 'test-repo'
  const pullNumber = 123

  let octokit: any

  beforeEach(() => {
    vi.clearAllMocks()
    octokit = {
      rest: {
        pulls: {
          get: vi.fn(),
        },
      },
    }
  })

  it('returns label names when pull request has labels', async () => {
    const labels = [
      { name: 'bug' },
      { name: 'feature' },
      { name: 'enhancement' },
    ]
    octokit.rest.pulls.get.mockResolvedValue({
      data: { labels },
    })

    const fn = getMergedPullRequestLabels(octokit)
    const result = await fn(owner, repo, pullNumber)
    expect(result).toEqual(['bug', 'feature', 'enhancement'])
    expect(octokit.rest.pulls.get).toHaveBeenCalledWith({
      owner,
      repo,
      pull_number: pullNumber,
    })
  })

  it('returns an empty array when pull request has no labels', async () => {
    octokit.rest.pulls.get.mockResolvedValue({
      data: { labels: [] },
    })

    const fn = getMergedPullRequestLabels(octokit)
    const result = await fn(owner, repo, pullNumber)
    expect(result).toEqual([])
  })

  it('calls setFailed with error message if octokit throws Error', async () => {
    const error = new Error('API failure')
    octokit.rest.pulls.get.mockRejectedValue(error)

    const fn = getMergedPullRequestLabels(octokit)
    const result = await fn(owner, repo, pullNumber)
    expect(setFailed).toHaveBeenCalledWith(
      'Failed to get merged pull request labels: API failure'
    )
    expect(result).toBeUndefined()
  })

  it('calls setFailed with unknown error if octokit throws non-Error', async () => {
    octokit.rest.pulls.get.mockRejectedValue('some string error')

    const fn = getMergedPullRequestLabels(octokit)
    const result = await fn(owner, repo, pullNumber)
    expect(setFailed).toHaveBeenCalledWith(
      'Failed to get merged pull request labels: Unknown error'
    )
    expect(result).toBeUndefined()
  })
})
