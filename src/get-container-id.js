// format looks like
// 1:name=systemd:/docker/abd3dr...
export default function getId (data) {
  if (!data) {
    return null
  }

  let id = null

  // Break each line up
  const lines = data.split('\n')

  // look for the id
  lines.some((line) => {
    if (!line.includes('docker')) {
      return false
    }

    const path = line.split('/')

    if (path.length === 3) {
      id = path[2]
      return true
    }

    return false
  })

  return id
}
