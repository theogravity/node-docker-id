import { readFile, readFileSync } from 'fs'
import { promisify } from 'util'
import getId from './get-container-id'
import { setCachedId, getCachedId } from './cache'

const debug = require('debug')('docker-id-fns')
const readFileAsync = promisify(readFile)
const CGROUP_FILE = '/proc/self/cgroup'

// Reads /proc/self/cgroup for the id
// https://tuhrig.de/how-to-know-you-are-inside-a-docker-container/
export async function getContainerId () {
  let containerId = getCachedId()

  if (containerId === undefined) {
    try {
      const data = await readFileAsync(CGROUP_FILE, 'utf8')
      debug(data)
      containerId = getId(data)
    } catch (e) {
      debug(e)
      containerId = null
    }

    setCachedId(containerId)
  }

  return containerId
}

export function getContainerIdSync () {
  let containerId = getCachedId()

  if (containerId === undefined) {
    try {
      const data = readFileSync(CGROUP_FILE, 'utf8')
      debug(data)
      containerId = getId(data)
    } catch (e) {
      debug(e)
      containerId = null
    }

    setCachedId(containerId)
  }

  return containerId
}
