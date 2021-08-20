import semver from 'semver';
import { logError } from './log';

export default function checkNodeVersion(): void {
  if (!semver.satisfies(process.version, '>8.x')) {
    logError(`当前 Node 版本为 ${process.version}，请升级到 8.x 以上`);
  }
}
