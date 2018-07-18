/* eslint-env jest */

import fsMock from 'mock-fs'
import { getContainerId, getContainerIdSync } from '../src'

const CGROUP_FILE = '/proc/self/cgroup'

const TEST_DATA = `11:name=systemd:/
10:hugetlb:/
9:perf_event:/
8:blkio:/
7:freezer:/
6:devices:/
5:memory:/
4:cpuacct:/
3:cpu:/
2:cpuset:/`

describe('index', () => {
  describe('getContainerId', () => {
    it('should return null if the id is not found', async () => {
      fsMock({
        [CGROUP_FILE]: `abcd`
      })

      const id = await getContainerId()

      expect(id).toBe(null)
      fsMock.restore()
    })

    it('should return null if the id is not found 2', async () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA
      })

      const id = await getContainerId()

      expect(id).toBe(null)
      fsMock.restore()
    })

    it('should return null if the cgroup file is not found', async () => {
      fsMock({})

      const id = await getContainerId()

      expect(id).toBe(null)
      fsMock.restore()
    })
  })

  describe('getContainerIdSync', async () => {
    it('should return null if the cgroup file is not found', () => {
      fsMock({})

      const id = getContainerIdSync()

      expect(id).toBe(null)
      fsMock.restore()
    })

    it('should return null if the id is not found', () => {
      fsMock({
        [CGROUP_FILE]: `abcd`
      })

      const id = getContainerIdSync()

      expect(id).toBe(null)
      fsMock.restore()
    })

    it('should return null if the id is not found 2', () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA
      })

      const id = getContainerIdSync()

      expect(id).toBe(null)
      fsMock.restore()
    })
  })
})
