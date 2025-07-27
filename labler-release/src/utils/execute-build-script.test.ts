import { describe, it, expect, beforeEach, vi } from 'vitest'
import { executeBuildScript } from './execute-build-script.js'
import { exec } from 'node:child_process'

vi.mock('node:child_process', () => ({
  exec: vi.fn(),
}))

describe('executeBuildScript', () => {
  const mockedExec = exec as unknown as ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('resolves with stdout when script executes successfully', async () => {
    mockedExec.mockImplementation((_cmd, cb) => {
      cb(null, 'build success', '')
    })

    await expect(executeBuildScript('echo "hello"')).resolves.toBe(
      'build success'
    )
    expect(mockedExec).toHaveBeenCalledWith(
      'echo "hello"',
      expect.any(Function)
    )
  })

  it('rejects with error message when script execution fails', async () => {
    mockedExec.mockImplementation((_cmd, cb) => {
      cb(new Error('fail'), '', 'error output')
    })

    await expect(executeBuildScript('badcommand')).rejects.toMatch(
      /Error executing script: fail[\s\S]*error output/
    )
    expect(mockedExec).toHaveBeenCalledWith('badcommand', expect.any(Function))
  })
})
