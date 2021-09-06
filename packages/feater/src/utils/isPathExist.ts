import fs from 'fs';
import { trueCasePathSync } from 'true-case-path';

export default function isPathExist(path: string): boolean {
  try {
    fs.accessSync(path, fs.constants.F_OK);
    trueCasePathSync(path);
  } catch (e) {
    return false;
  }
  return true;
}
