import { readFile, readFileSync } from 'fs'
import { promisify } from 'util'
import getId from './get-container-id'

const debug = require('debug')('docker-id-fns')
const readFileAsync = promisify(readFile)

let containerId

const CGROUP_FILE = '/proc/self/cgroup'

// Reads /proc/self/cgroup for the id
// https://tuhrig.de/how-to-know-you-are-inside-a-docker-container/
export async function getContainerId () {
  if (containerId === undefined) {
    try {
      const data = await readFileAsync(CGROUP_FILE, 'utf8')
      debug(data)
      containerId = getId(data)
    } catch (e) {
      debug(e)
      containerId = null
    }
  }

  return containerId
}

export function getContainerIdSync () {
  if (containerId === undefined) {
    try {
      const data = readFileSync(CGROUP_FILE, 'utf8')
      debug(data)
      containerId = getId(data)
    } catch (e) {
      debug(e)
      containerId = null
    }
  }

  return containerId
}
