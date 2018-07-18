# node-docker-id

[![npm version](https://badge.fury.io/js/docker-id.svg)](https://badge.fury.io/js/docker-id) [![CircleCI](https://circleci.com/gh/theogravity/node-docker-id.svg?style=svg)](https://circleci.com/gh/theogravity/node-docker-id)

Gets the docker container id / checks if the app is running in a docker container via CLI or API.

## Install

`yarn add docker-id`

## API Usage

Two methods are available:

- `getContainerId` (async version - uses `fs.readFile`; does not throw anything at all in fail cases, just returns `null`)
- `getContainerIdSync` (sync version - uses `fs.readFileSync`)

The result is cached; subsequent calls will not result in additional file reads.

You can wrap the result with `Boolean()` to turn it into a `true` / `false` value. Useful if you want to just check
that the app is in a container or not.

- `Boolean(getContainerIdSync())`
- `Boolean(await getContainerId())`

Returns:

- `null` if the id cannot be found or the app is not running in docker
- container id if it is found

```js
import {
  getContainerId,
  getContainerIdSync
} from 'docker-id'

// promisified / async version
getContainerId.then((id) => {
  console.log(id)
})

// ------

// sync version
const containerId = getContainerIdSync()

// If you want to check if it is in docker or not
const isDocker = Boolean(containerId)
```

## CLI usage

`$ get-container-id`

- Outputs the id if found with an exit code of 0
- If not found, outputs an error message with an exit code of -1
