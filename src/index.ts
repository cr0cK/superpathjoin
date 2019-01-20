import * as path from 'path'
import last = require('lodash/last')
import isBoolean = require('lodash/isBoolean')
import isString = require('lodash/isString')
import isInteger = require('lodash/isInteger')

type Args = string | number | boolean | null | void

/**
 * Return a path joined by slashed.
 *
 * If the last args is a boolean equal to `true`,
 *   append a slash before to have an absolute path
 * If the last args is a boolean equal to `false`,
 *   remove the first slash(es)
 */
function superpathjoin(...args: Args[]): string {
  const lastArgs = last(args)
  const hasAbsoluteArg = isBoolean(lastArgs)

  if (hasAbsoluteArg) {
    args.pop()
  }

  let filteredArgs = args
    .filter(arg => isString(arg) || isInteger(arg))
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

export { superpathjoin }
export default superpathjoin
