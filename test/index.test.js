/* eslint-env jest */

import fsMock from 'mock-fs'
import { getContainerId, getContainerIdSync } from '../src'
import { setCachedId } from '../src/cache'

const TEST_ID = '3601745b3bd54d9780436faa5f0e4f72bb46231663bb99a6bb892764917832c2'
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
  afterEach(() => {
    // reset the cache for each run
    setCachedId(undefined)
  })

  describe('getContainerId', () => {
    it('should return id if it is found', async () => {
      fsMock({
       [CGROUP_FILE]: TEST_DATA2
      })

      const id = await getContainerId()

      expect(id).toBe(TEST_ID)
      fsMock.restore()
    })

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
    it('should return id if it is found', () => {
      fsMock({
        [CGROUP_FILE]: TEST_DATA2
      })

      const id = getContainerIdSync()

      expect(id).toBe(TEST_ID)
      fsMock.restore()
    })

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

describe('cached index', () => {
  it('should return the cache id - async', async () => {
    // Get back a result with the id
    fsMock({
      [CGROUP_FILE]: TEST_DATA2
    })

    let id = await getContainerId()

    expect(id).toBe(TEST_ID)
    fsMock.restore()

    // This should still return the id
    fsMock({
      [CGROUP_FILE]: 'abcd'
    })

    id = await getContainerId()

    expect(id).toBe(TEST_ID)
    fsMock.restore()

    setCachedId(undefined)
  })

  it('should return the cache id - sync', () => {
    // Get back a result with the id
    fsMock({
      [CGROUP_FILE]: TEST_DATA2
    })

    let id = getContainerIdSync()

    expect(id).toBe(TEST_ID)
    fsMock.restore()

    // This should still return the id
    fsMock({
      [CGROUP_FILE]: 'abcd'
    })

    id = getContainerIdSync()

    expect(id).toBe(TEST_ID)
    fsMock.restore()
    setCachedId(undefined)
  })

  it('should return a cached null - async', async () => {
    // This should return null
    fsMock({
      [CGROUP_FILE]: 'abcd'
    })

    let id = await getContainerId()

    expect(id).toBe(null)
    fsMock.restore()

    // This should still return null
    fsMock({
      [CGROUP_FILE]: TEST_DATA2
    })

    id = await getContainerId()

    expect(id).toBe(null)
    fsMock.restore()
    setCachedId(undefined)
  })

  it('should return a cached null - sync', () => {
    // This should return null
    fsMock({
      [CGROUP_FILE]: 'abcd'
    })

    let id = getContainerIdSync()

    expect(id).toBe(null)
    fsMock.restore()

    // This should still return null
    fsMock({
      [CGROUP_FILE]: TEST_DATA2
    })

    id = getContainerIdSync()

    expect(id).toBe(null)
    fsMock.restore()
    setCachedId(undefined)
  })
})
