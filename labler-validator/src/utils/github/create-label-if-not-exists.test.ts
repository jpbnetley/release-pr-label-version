import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createLabelIfNotExists } from './create-label-if-not-exists.js'
import { setFailed, info, error as logError } from '@actions/core'

// Mocks for @actions/core
vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
  info: vi.fn(),
  error: vi.fn(),
}))

describe('createLabelIfNotExists', () => {
  let octokit: any
  let ensureLabel: ReturnType<typeof createLabelIfNotExists>
  const owner = 'test-owner'
  const repo = 'test-repo'
  const label = { name: 'bug', color: 'f29513' }

  beforeEach(() => {
    vi.clearAllMocks()
    octokit = {
      rest: {
        issues: {
          listLabelsForRepo: vi.fn(),
          createLabel: vi.fn(),
        },
      },
    }
    ensureLabel = createLabelIfNotExists(octokit)
  })

  it('creates the label if it does not exist', async () => {
    octokit.rest.issues.listLabelsForRepo.mockResolvedValue({
      data: [{ name: 'feature' }],
    })
    octokit.rest.issues.createLabel.mockResolvedValue({})

    await ensureLabel(owner, repo, label)

    expect(octokit.rest.issues.listLabelsForRepo).toHaveBeenCalledWith({
      owner,
      repo,
    })
  })

  it('does not create the label if it already exists', async () => {
    octokit.rest.issues.listLabelsForRepo.mockResolvedValue({
      data: [{ name: 'bug' }],
    })

    await ensureLabel(owner, repo, label)

    expect(octokit.rest.issues.listLabelsForRepo).toHaveBeenCalledWith({
      owner,
      repo,
    })
    expect(octokit.rest.issues.createLabel).not.toHaveBeenCalled()
    expect(info).toHaveBeenCalledWith(`Label already exists: ${label.name}`)
  })

  it('handles errors and calls setFailed with error message', async () => {
    const errorObj = new Error('API error')
    octokit.rest.issues.listLabelsForRepo.mockRejectedValue(errorObj)

    await ensureLabel(owner, repo, label)

    expect(logError).toHaveBeenCalledWith(`Failed to create label: ${errorObj}`)
    expect(setFailed).toHaveBeenCalledWith(
      `Failed to create label: ${errorObj.message}`
    )
  })

  it('handles unknown errors and calls setFailed with generic message', async () => {
    const errorObj = 'some string error'
    octokit.rest.issues.listLabelsForRepo.mockRejectedValue(errorObj)

    await ensureLabel(owner, repo, label)

    expect(logError).toHaveBeenCalledWith(`Failed to create label: ${errorObj}`)
    expect(setFailed).toHaveBeenCalledWith(
      'Failed to create label: Unknown error'
    )
  })
})
