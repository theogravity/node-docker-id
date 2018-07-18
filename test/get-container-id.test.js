/* eslint-env jest */

import getId from '../src/get-container-id'

const TEST_ID = '3601745b3bd54d9780436faa5f0e4f72bb46231663bb99a6bb892764917832c2'

describe('get-container-id', () => {
  it('should return false on empty data', () => {
    expect(getId()).toBe(null)
  })

  it('should return false if the data does not contain the docker id', () => {
    const data = `11:name=systemd:/
10:hugetlb:/
9:perf_event:/
8:blkio:/
7:freezer:/
6:devices:/
5:memory:/
4:cpuacct:/
3:cpu:/
2:cpuset:/`

    expect(getId(data)).toBe(null)
  })

  it('should return false if the data cannot be properly parsed', () => {
    const data = `abcd`

    expect(getId(data)).toBe(null)
  })

  it('should return false if the data cannot be properly parsed 2', () => {
    const data = `abcd
efgh`

    expect(getId(data)).toBe(null)
  })

  it('should return the id if it is present in the data', () => {
    const data = `11:name=systemd:/
10:hugetlb:/
9:perf_event:/
8:blkio:/
7:freezer:/
6:devices:/docker/${TEST_ID}
5:memory:/
4:cpuacct:/
3:cpu:/
2:cpuset:/`

    expect(getId(data)).toBe(TEST_ID)
  })

  it('should return the id if it is present in the data 2', () => {
    const data = `11:name=systemd:/
10:hugetlb:/docker/${TEST_ID}
9:perf_event:/docker/${TEST_ID}
8:blkio:/docker/${TEST_ID}
7:freezer:/docker/${TEST_ID}
6:devices:/docker/${TEST_ID}
5:memory:/docker/${TEST_ID}
4:cpuacct:/docker/${TEST_ID}
3:cpu:/docker/${TEST_ID}
2:cpuset:/docker/${TEST_ID}`

    expect(getId(data)).toBe(TEST_ID)
  })
})
