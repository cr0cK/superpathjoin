import * as path from 'path'

type Args = string | number | boolean | null | void

/**
 * Return a path joined by slashed.
 *
 * If the last args is a boolean equal to `true`,
 *   append a slash before to have an absolute path
 * If the last args is a boolean equal to `false`,
 *   remove the first slash(es)
 */
export function superpathjoin(...args: Args[]): string {
  const lastArgs = args[args.length - 1]
  const hasAbsoluteArg = typeof lastArgs === 'boolean'

  if (hasAbsoluteArg) {
    args.pop()
  }

  if (!args.length) {
    return ''
  }

  let filteredArgs = args
    .filter(arg => typeof arg === 'string' || typeof arg === 'number')
    .map(arg => String(arg).trim())

  if (hasAbsoluteArg && lastArgs) {
    filteredArgs.unshift('/')
  }

  // protect
  filteredArgs = filteredArgs.map(arg => arg.replace('://', ':||'))

  let joinedPath = path.join(...filteredArgs)

  if (hasAbsoluteArg && !lastArgs) {
    joinedPath = joinedPath.replace(/^\/+/, '')
  }

  // replace protected strings
  joinedPath = joinedPath.replace(':||', '://')

  return joinedPath
}
