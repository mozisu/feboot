import { FeaterPlugin, AnyObj } from './../../types/index.d';
import { isObject } from './checkType';
import { logError } from './log';
import { resolveModulePath } from './pathResolver';
export function isStringPlugin(plugin: FeaterPlugin): boolean {
  return typeof plugin === 'string';
}

export function isArrayPlugin(plugin: FeaterPlugin): boolean {
  return (
    Array.isArray(plugin) &&
    plugin.length === 2 &&
    typeof plugin[0] === 'string' &&
    isObject(plugin[1])
  );
}

export function resolvePlugin(plugin: FeaterPlugin): {
  name: string;
  path: string;
  config: AnyObj;
} {
  if (typeof plugin === 'string') {
    return { name: plugin, path: resolveModulePath(plugin), config: {} };
  } else if (
    Array.isArray(plugin) &&
    plugin.length === 2 &&
    typeof plugin[0] === 'string' &&
    isObject(plugin[1])
  ) {
    return {
      name: plugin[0],
      path: resolveModulePath(plugin[0]),
      config: plugin[1],
    };
  } else {
    logError('Invalid plugin config');
    process.exit(1);
  }
}
