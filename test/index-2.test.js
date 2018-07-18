/* eslint-env jest */

import fsMock from 'mock-fs'
import { getContainerId, getContainerIdSync } from '../src'

const TEST_ID = '3601745b3bd54d9780436faa5f0e4f72bb46231663bb99a6bb892764917832c2'
const CGROUP_FILE = '/proc/self/cgroup'

const TEST_DATA2 = `11:name=systemd:/
10:hugetlb:/
9:perf_event:/
8:blkio:/
7:freezer:/
6:devices:/docker/${TEST_ID}
5:memory:/
4:cpuacct:/
3:cpu:/
2:cpuset:/`

// unsure why, but the below tests
// do not work when combined in index.test.js
// it's some bug with mock-fs not restoring properly
describe('index-2', () => {
  describe('getContainerId', () => {
    it('should return id if it is found', async () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA2
      })

      const id = await getContainerId()

      expect(id).toBe(TEST_ID)
      fsMock.restore()
    })
  })

  describe('getContainerIdSync', async () => {
    it('should return id if it is found', () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA2
      })

      const id = getContainerIdSync()

      expect(id).toBe(TEST_ID)
      fsMock.restore()
    })
  })
})
