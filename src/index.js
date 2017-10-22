import path from 'path';
import last from 'lodash/last';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';


/**
 * Return a path joined by slashed.
 *
 * If the last args is a boolean equal to `true`,
 *   append a slash before to have an absolute path
 * If the last args is a boolean equal to `false`,
 *   remove the first slash(es)
 */
function superpathjoin(...args) {
  const lastArgs = last(args);
  const hasAbsoluteArg = isBoolean(lastArgs);

  if (hasAbsoluteArg) {
    args.pop();
  }

  let filteredArgs = args
    .filter(arg => isString(arg) || isInteger(arg))
    .map(arg => String(arg).trim());

  if (hasAbsoluteArg && lastArgs) {
    filteredArgs.unshift('/');
  }

  // protect
  filteredArgs = filteredArgs.map(arg => arg.replace('://', ':||'));

  let joinedPath = path.join(...filteredArgs);

  if (hasAbsoluteArg && !lastArgs) {
    joinedPath = joinedPath.replace(/^\/+/, '');
  }

  // replace protected strings
  joinedPath = joinedPath.replace(':||', '://');

  return joinedPath;
}

export default superpathjoin;
export { superpathjoin };
