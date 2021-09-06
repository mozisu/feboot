import { trueCasePathSync } from 'true-case-path';
import { DEFAULT_ENTRY_FILES } from './constants';
import path from 'path';
import isPathExist from './isPathExist';
import { logError } from './log';

export const appRootPath = process.cwd();

export function isAbsPath(filePath: string): boolean {
  return path.isAbsolute(filePath);
}

export function isNotNodeModule(name: string): boolean {
  name = name || '';
  return name.startsWith('.') || name.startsWith('/');
}

export function resolveEntry(entry?: string): string {
  if (!entry) {
    DEFAULT_ENTRY_FILES.forEach((item) => {
      const _entry = path.join(appRootPath, item);
      if (isPathExist(_entry)) {
        const trueCasePath = trueCasePathSync(_entry);
        entry = trueCasePath === _entry ? _entry : trueCasePath;
      }
    });
  } else {
    entry = path.isAbsolute(entry) ? entry : path.join(appRootPath, entry);
  }

  if (!entry) {
    logError('entry not exist');
    process.exit(1);
  }

  if (!isPathExist(entry)) {
    logError('entry path can not resolved');
    process.exit(1);
  }

  return entry;
}

export function resolveOutputPath(outputPath?: string): string {
  outputPath = outputPath || 'dist';

  return path.isAbsolute(outputPath)
    ? outputPath
    : path.join(appRootPath, outputPath);
}

export function resolvePublicPath(publicPath?: string): string {
  return publicPath || '/';
}

export function resolveModulePath(p: string): string {
  if (isNotNodeModule(p)) {
    return isAbsPath(p) ? p : path.join(appRootPath, p);
  }

  return path.join(appRootPath, 'node_modules', p);
}
