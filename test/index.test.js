/* eslint-env mocha */

import { expect } from 'chai'
import fsMock from 'mock-fs'
import { getContainerId, getContainerIdSync } from '../src'

const CGROUP_FILE = 'proc/self/cgroup'
const TEST_ID = '3601745b3bd54d9780436faa5f0e4f72bb46231663bb99a6bb892764917832c2'

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

describe('index', () => {
  describe('getContainerId', () => {
    it('should return id if it is found', async () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA2
      })

      const id = await getContainerId()

      expect(id).to.equal(TEST_ID)
      fsMock.restore()
    })

    it('should return null if the id is not found', async () => {
      fsMock({
        [CGROUP_FILE]: `abcd`
      })

      const id = await getContainerId()

      expect(id).to.equal(null)
      fsMock.restore()
    })

    it('should return null if the id is not found 2', async () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA
      })

      const id = await getContainerId()

      expect(id).to.equal(null)
      fsMock.restore()
    })

    it('should return null if the cgroup file is not found', async () => {
      fsMock({})

      const id = await getContainerId()

      expect(id).to.equal(null)
      fsMock.restore()
    })
  })

  describe('getContainerIdSync', async () => {
    it('should return id if it is found', async () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA2
      })

      const id = getContainerIdSync()

      expect(id).to.equal(TEST_ID)
      fsMock.restore()
    })

    it('should return null if the cgroup file is not found', async () => {
      fsMock({})

      const id = getContainerIdSync()

      expect(id).to.equal(null)
      fsMock.restore()
    })

    it('should return null if the id is not found', async () => {
      fsMock({
        [CGROUP_FILE]: `abcd`
      })

      const id = getContainerIdSync()

      expect(id).to.equal(null)
      fsMock.restore()
    })

    it('should return null if the id is not found 2', async () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA
      })

      const id = getContainerIdSync()

      expect(id).to.equal(null)
      fsMock.restore()
    })
  })
})
