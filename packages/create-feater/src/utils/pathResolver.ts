import path from 'path';

const appRootPath = process.cwd();

export function isAbsPath(p: string) {
  return path.isAbsolute(p);
}

export function resolvePath(p: string) {
  return path.resolve(appRootPath, p);
}
