import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getLastMergedPullRequest } from './get-last-merged-pull-request.js'

const mockList = vi.fn()

const mockOctokit = {
  rest: {
    pulls: {
      list: mockList,
    },
  },
} as any

const owner = 'test-owner'
const repo = 'test-repo'
const branchName = 'main'

describe('getLastMergedPullRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns the last merged pull request for the given branch', async () => {
    const mergedPR = {
      number: 42,
      base: { ref: `refs/heads/${branchName}` },
      merged_at: '2023-01-01T00:00:00Z',
    }
    const otherPR = {
      number: 41,
      base: { ref: `refs/heads/other-branch` },
      merged_at: '2023-01-01T00:00:00Z',
    }
    mockList.mockResolvedValueOnce({
      data: [mergedPR, otherPR],
    })

    const fn = getLastMergedPullRequest(mockOctokit)
    const result = await fn(owner, repo, branchName)
    expect(result).toBe(mergedPR)
    expect(mockList).toHaveBeenCalledWith({
      owner,
      repo,
      state: 'closed',
      sort: 'updated',
      direction: 'desc',
    })
  })

  it('returns undefined if no merged pull request is found for the branch', async () => {
    mockList.mockResolvedValueOnce({
      data: [
        {
          number: 43,
          base: { ref: `refs/heads/other-branch` },
          merged_at: '2023-01-01T00:00:00Z',
        },
        {
          number: 44,
          base: { ref: `refs/heads/${branchName}` },
          merged_at: null,
        },
      ],
    })

    const fn = getLastMergedPullRequest(mockOctokit)
    const result = await fn(owner, repo, branchName)
    expect(result).toBeUndefined()
  })

  it('throws an error if the API call fails', async () => {
    mockList.mockRejectedValueOnce(new Error('API error'))

    const fn = getLastMergedPullRequest(mockOctokit)
    await expect(fn(owner, repo, branchName)).rejects.toThrow(
      /Failed to get last merged pull request number: API error/
    )
  })

  it('handles non-Error thrown values gracefully', async () => {
    mockList.mockRejectedValueOnce('some string error')

    const fn = getLastMergedPullRequest(mockOctokit)
    await expect(fn(owner, repo, branchName)).rejects.toThrow(
      /Failed to get last merged pull request number: some string error/
    )
  })
})
