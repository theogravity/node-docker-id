#!/usr/bin/env node

import { getContainerIdSync } from '../index'

const id = getContainerIdSync()

if (id) {
  console.log(id)
  process.exit(0)
}

console.error('No id found, or not running in docker.')
process.exit(-1)
