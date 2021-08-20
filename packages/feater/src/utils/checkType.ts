/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
type JsType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Array'
  | 'Object'
  | 'Function'
  | 'RegExp';

export function checkType(target: any, type: JsType): boolean {
  return Object.prototype.toString.call(target) === `[object ${type}]`;
}

export function isFunction(target: any): boolean {
  return checkType(target, 'Function');
}

export function isObject(target: any): boolean {
  return checkType(target, 'Object');
}

export function isArray(target: any): boolean {
  return checkType(target, 'Array');
}
