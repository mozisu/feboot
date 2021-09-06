import { RegisterCommandOptions } from './../../types/index.d';
import { program } from 'commander';
import path from 'path';
import isPathExist from '../utils/isPathExist';
import findFirstLevelFiles from '../utils/findFirstLevelFiles';
// import { logWarning } from '../utils/log';

const CWD = process.cwd();

export default function registerCommands({
  pkg,
}: RegisterCommandOptions): void {
  let featerConfig = {};
  const configFilePath = path.join(CWD, './feater.config.js');

  const commandFiles = findFirstLevelFiles(path.join(__dirname, '../cli'), [
    '.js',
  ]);

  if (isPathExist(configFilePath)) {
    featerConfig = require(configFilePath);
  } else {
    featerConfig = {};
  }

  program.name(pkg.name).version(pkg.version).usage('<command> [options]');

  commandFiles.forEach((file) => {
    // console.log(path.join(__dirname, '../cli', file));
    const commandFn = require(path.join(__dirname, '../cli', file));
    commandFn.default({ program, featerConfig });
  });

  if (process.argv.length > 2) {
    program.parse(process.argv);
  } else {
    program.help();
  }
}
