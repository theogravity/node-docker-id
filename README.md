# node-docker-id

[![npm version](https://badge.fury.io/js/docker-id.svg)](https://badge.fury.io/js/docker-id) [![CircleCI](https://circleci.com/gh/theogravity/node-docker-id.svg?style=svg)](https://circleci.com/gh/theogravity/node-docker-id)

Gets the docker container id / checks if the app is running in a docker container.

## Install

`yarn add docker-id`

## API Usage

Two methods are available

- `getContainerId` (async version)
- `getContainerIdSync` (sync version)

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

// sync version
const containerId = getContainerIdSync()
```

## CLI usage

`$ get-container-id`

- Outputs the id if found with an exit code of 0
- If not found, outputs an error message with an exit code of -1
