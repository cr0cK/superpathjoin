import path from 'path';
import _ from 'lodash';

/**
 * Return a path joined by slashed.
 *
 * If the last args is a boolean equal to `true`,
 *   append a slash before to have an absolute path
 * If the last args is a boolean equal to `false`,
 *   remove the first slash(es)
 */
function superpathjoin(...args) {
  const lastArgs = _.last(args);
  const hasAbsoluteArg = _.isBoolean(lastArgs);

  if (hasAbsoluteArg) {
    args.pop();
  }

  let filteredArgs = args
    .filter(arg => _.isString(arg) || _.isInteger(arg))
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
